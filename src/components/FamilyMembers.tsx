import React, { useContext, useEffect, useState } from 'react';

import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IFamilyMember from '../interfaces/IFamilyMember';
import Icon from './Icon';

interface FamilyMembersProps {
  filter?: boolean;
}

const FamilyMembers = ({ filter = true }: FamilyMembersProps) => {
  const { familyMembers, cardSelected, setCardSelected, setSelectedMembers } =
    useContext(CurrentUserContext);
  const { documents } = useContext(CurrentDataContext);

  // function to select only one member of the family with a map. If the key is egal to the index don't select the card else select it.
  function selectMember(index: number) {
    setCardSelected(cardSelected.map((card, key) => (key === index ? !card : card)));
  }

  useEffect(() => {
    const membersSelected: IFamilyMember[] = [];
    cardSelected && localStorage.length > 0
      ? localStorage.setItem('cardSelected', JSON.stringify(cardSelected))
      : cardSelected &&
        sessionStorage.length > 0 &&
        sessionStorage.setItem('cardSelected', JSON.stringify(cardSelected));
    cardSelected.map((card, index) => card && membersSelected.push(familyMembers[index]));
    setSelectedMembers(membersSelected);
  }, [cardSelected, familyMembers]);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectNobody, setSelectNobody] = useState<boolean>(false);

  const handleSelectAll = () => {
    setSelectNobody(false);
    setSelectAll(true);
    setCardSelected(familyMembers.map((member) => member && true));
  };
  const handleSelectNobody = () => {
    setSelectAll(false);
    setSelectNobody(true);
    setCardSelected(familyMembers.map((member) => member && false));
  };

  useEffect(() => {
    cardSelected &&
      cardSelected[0] !== undefined &&
      (cardSelected.includes(false) && setSelectAll(false),
      cardSelected.includes(true) && setSelectNobody(false));
  }, [cardSelected]);

  return (
    <div className="familyMembers">
      {/* map to show all members in the family */}
      <div className="familyMembers__list">
      {familyMembers &&
        familyMembers.map((familyMember, index) => (
          <div className="familyMembers__list__card" key={index}>
            <img
              src={
                familyMember.avatar
                  ? `${familyMember.avatar}`
                  : !familyMember.avatar && documents && documents.length > 1
                  ? `${documents[index].url}`
                  : 'assets/nopicture.png'
              }
              alt="avatar"
            />
            <div className="familyMembers__list__card__name">
              <p>{familyMember.firstname}</p>
              {/* button to select one member in family */}

              <div
                className="familyMembers__list__card__name__square"
                onClick={() => selectMember(index)}
                aria-hidden="true">
                {cardSelected[index]
                  ? filter && (
                      <Icon
                        name="square-check"
                        width="20px"
                        height="20px"
                        color="white"
                      />
                    )
                  : filter && (
                      <Icon
                        name="square-nocheck"
                        width="20px"
                        height="20px"
                        color="white"
                      />
                    )}
              </div>
            </div>
          </div>
        ))}
        </div>
      <div className="familyMembers__select">
        <div className="familyMembers__select__all">
          <label htmlFor="checkbox">Tout sélectionner : </label>
          <input type="checkbox" onChange={() => handleSelectAll()} checked={selectAll} />
        </div>
        <div className="familyMembers__select__nobody">
          <label htmlFor="checkbox">Tout désélectionner : </label>
          <input
            type="checkbox"
            onChange={() => handleSelectNobody()}
            checked={selectNobody}
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyMembers;
