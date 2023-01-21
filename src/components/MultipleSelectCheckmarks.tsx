import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import * as React from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import CurrentUserContext from '../contexts/CurrentUser';
import IEvent from '../interfaces/IEvent';
import IFamilyMember from '../interfaces/IFamilyMember';
import IFamilyMemberEvent from '../interfaces/IFamilyMemberEvent';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: '#e8f2fe',
    },
  },
};

interface MultipleSelectCheckmarksProp {
  familyMembersIsActive: IFamilyMember[];
  event: IEvent;
}

const MultipleSelectCheckmarks = ({
  familyMembersIsActive,
  event,
}: MultipleSelectCheckmarksProp) => {
  const { familyMemberEvents, setFamilyMemberEvents, familyMembers } =
    React.useContext(CurrentUserContext);

  const [registeredFamilyMembers, setRegisteredFamilyMembers] = React.useState<
    IFamilyMember[]
  >([]);

  const familyMemberEventsByFamily = familyMembersIsActive.flatMap(
    (familyMembersIsActive) =>
      familyMemberEvents.filter(
        (familyMemberEvent) =>
          familyMemberEvent.idEvent === event.id &&
          familyMemberEvent.idFamilyMember === familyMembersIsActive.id,
      ),
  );

  React.useEffect(() => {
    setRegisteredFamilyMembers(
      familyMemberEventsByFamily
        .filter(
          (familyMemberEventByFamily) => familyMemberEventByFamily.idEvent === event.id,
        )
        .map(
          (familyMemberByEvent) =>
            familyMembers.filter(
              (familyMembers) => familyMembers.id === familyMemberByEvent.idFamilyMember,
            )[0],
        ),
    );
  }, [familyMemberEvents]);

  const numberParticipantsMax = event.numberParticipantsMax;
  const idEvent = event.id;

  const handleChange = async (event: SelectChangeEvent<String[]>) => {
    const inputFirstnames = event.target.value as string[];

    const addFamilyMemberEvent = async () => {
      const addMember = inputFirstnames.filter(
        (inputFirstname) =>
          !registeredFamilyMembers
            .map((registeredFamilyMember) => registeredFamilyMember.firstname)
            .includes(inputFirstname),
      )[0];

      const idFamilyMember = familyMembersIsActive.filter(
        (familyMemberIsActive) => familyMemberIsActive.firstname === addMember,
      )[0].id;

      try {
        await axios.post<IFamilyMemberEvent>(
          'https://pocli-bd.herokuapp.com/api/familyMemberEvents',
          { idFamilyMember, idEvent },
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        let urls = [`https://pocli-bd.herokuapp.com/api/familyMemberEvents`];

        getAllDataWithCredential(urls)
          .then((res) => {
            setFamilyMemberEvents(res[0].data);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    };

    const deleteFamilyMemberEvent = async () => {
      const deleteMember = registeredFamilyMembers.filter(
        (registeredFamilyMember) =>
          !inputFirstnames.includes(registeredFamilyMember.firstname),
      )[0];

      const idFamilyMemberEvent = familyMemberEvents
        .filter((familyMemberEvent) => familyMemberEvent.idEvent === idEvent)
        .filter((event) => event.idFamilyMember === deleteMember.id)[0].id;

      try {
        await axios.delete<IFamilyMemberEvent>(
          `https://pocli-bd.herokuapp.com/api/familyMemberEvents/${idFamilyMemberEvent}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        let urls = [`https://pocli-bd.herokuapp.com/api/familyMemberEvents`];

        getAllDataWithCredential(urls)
          .then((res) => {
            setFamilyMemberEvents(res[0].data);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    };

    numberParticipantsMax
      ? inputFirstnames.length > registeredFamilyMembers.length &&
        familyMemberEvents.filter(
          (familyMemberEvent) => familyMemberEvent.idEvent === idEvent,
        ).length < numberParticipantsMax &&
        addFamilyMemberEvent()
      : inputFirstnames.length > registeredFamilyMembers.length && addFamilyMemberEvent();
    inputFirstnames.length < registeredFamilyMembers.length && deleteFamilyMemberEvent();
  };

  return (
    <div>
      <FormControl sx={{ width: 350 }}>
        <InputLabel
          id="demo-multiple-checkbox-label"
          sx={{
            fontFamily: 'Karla, sans-serif',
            fontSize: '18px',
            fontWeight: 800,
            color: '#3d79af',
          }}>
          Participation
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={registeredFamilyMembers.map(
            (registeredFamilyMember) => registeredFamilyMember.firstname,
          )}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{ fontFamily: 'Karla, sans-serif', fontSize: '18px', fontWeight: 800 }}
              label="Participation"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    backgroundColor: '#8bafcf',
                    color: 'white',
                    fontFamily: 'Karla, sans-serif',
                    fontSize: '16px',
                    fontWeight: 800,
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {familyMembersIsActive.map((familyMemberIsActive, index) => (
            <MenuItem key={index} value={familyMemberIsActive.firstname}>
              <Checkbox
                checked={
                  registeredFamilyMembers
                    .map((registeredFamilyMember) => registeredFamilyMember.firstname)
                    .indexOf(familyMemberIsActive.firstname) > -1
                }
                sx={{ color: '#3d79af' }}
              />
              <ListItemText
                primary={familyMemberIsActive.firstname}
                sx={{ fontFamily: 'Karla, sans-serif', color: '#3d79af' }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectCheckmarks;
