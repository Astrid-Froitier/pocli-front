import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import {
  differenceWithTodaysDate,
  todaysDateLower,
  transformDate,
} from '../../helpers/transformDate';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IUserInfos from '../interfaces/IUserInfos';
import Icon from './Icon';
import LoginCard from './LoginCard';

interface ModalAdherentProps {
  setModalOnOff: React.Dispatch<React.SetStateAction<string>>;
  modalAdherentInfo: boolean;
  setModalAdherentInfo: React.Dispatch<React.SetStateAction<boolean>>;
  modalAdherentPwd: boolean;
  setModalAdherentPwd: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  [theme.breakpoints.down(500)]: {
    width: '250px',
    '& .MuiOutlinedInput-input': {
      fontSize: '18px',
    },
    '& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-outlined.MuiFormLabel-root.MuiFormLabel-colorPrimary.Mui-required.css-2z5swh-MuiFormLabel-root-MuiInputLabel-root':
      {
        fontSize: '18px',
      },
    '& .MuiInputLabel-asterisk': {
      fontSize: '18px',
    },
  },

  [theme.breakpoints.up(500)]: {
    width: '350px',
    '& .MuiOutlinedInput-input': {
      fontSize: '20px',
    },
    '& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-outlined.MuiFormLabel-root.MuiFormLabel-colorPrimary.Mui-required.css-2z5swh-MuiFormLabel-root-MuiInputLabel-root':
      {
        fontSize: '20px',
      },
    '& .MuiInputLabel-asterisk': {
      fontSize: '20px',
    },
  },

  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    '&.Mui-error': {
      color: '#d32f2f',
    },
  },
  '& .MuiInputLabel-asterisk': {
    color: 'white',
    '&.Mui-error': {
      color: '#d32f2f',
    },
  },
  '& label.Mui-focused': {
    color: 'white',
    '&.Mui-error': {
      color: '#d32f2f',
    },
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiOutlinedInput-root.Mui-error': {
    '& fieldset': {
      borderColor: '#d32f2f',
    },
    '&:hover fieldset': {
      borderColor: '#d32f2f',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#d32f2f',
    },
  },
}));

const ModalAdherent = ({
  setModalOnOff,
  modalAdherentInfo,
  modalAdherentPwd,
  setModalAdherentInfo,
  setModalAdherentPwd,
}: ModalAdherentProps) => {
  const { user, family, cities, familyMembers, paymentRecordsByFamily } =
    useContext(CurrentUserContext);

  const { activities } = useContext(CurrentDataContext);

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);
  const [errorNewPassword, setErrorNewPassword] = useState<string>('');

  const handleClick = () => {
    setModalAdherentPwd(false);
    setModalAdherentInfo(false);
    setModalOnOff('');
  };

  // useEffect(() => {
  //   let urls = [
  //     `https://wild-pocli.herokuapp.com/api/families/${user.id}`,
  //     `https://wild-pocli.herokuapp.com/api/cities/`,
  //     `https://wild-pocli.herokuapp.com/api/recipients/`,
  //     `https://wild-pocli.herokuapp.com/api/families/${user.id}/familyMembers`,
  //     `https://wild-pocli.herokuapp.com/api/families/${user.id}/paymentRecords`,
  //     `https://wild-pocli.herokuapp.com/api/paymentMethods`,
  //     `https://wild-pocli.herokuapp.com/api/families/${user.id}/communicationMembers`,
  //     `https://wild-pocli.herokuapp.com/api/communications`,
  //     `https://wild-pocli.herokuapp.com/api/families/${user.id}/linkedDocuments`,
  //     `https://wild-pocli.herokuapp.com/api/familyMemberEvents`,
  //     `https://wild-pocli.herokuapp.com/api/documents`,
  //     `https://wild-pocli.herokuapp.com/api/events`,
  //   ];

  //   getAllDataWithCredential(urls)
  //     .then((res) => {
  //       setFamily(res[0].data);
  //       setCities(res[1].data);
  //       setRecipients(res[2].data);
  //       setFamilyMembers(res[3].data);
  //       setPaymentRecordsByFamily(res[4].data);
  //       setPaymentMethods(res[5].data);
  //       setCommunicationMembersByFamily(res[6].data);
  //       setCommunications(res[7].data);
  //       setLinkedDocumentsByFamily(res[8].data);
  //       setFamilyMemberEvents(res[9].data);
  //       setDocuments(res[10].data);
  //       setEvents(res[11].data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  // useEffect permettant de libérer le scroll sur Y lorsque le composant se démonte (en cas de changement de page avec la modale ouverte)
  useEffect(() => {
    return () => {
      document.documentElement.style.setProperty('overflow-y', 'scroll');
    };
  }, []);

  const lastPaymentRecordFamily = paymentRecordsByFamily
    .filter(
      (paymentRecordByFamily) =>
        paymentRecordByFamily.idFamily === family.id &&
        paymentRecordByFamily.idActivity === null,
    )
    .sort((a, b) => b.id - a.id)[0];

  const lastPaymentsRecordMembers = paymentRecordsByFamily
    .filter((paymentRecordByFamily) => paymentRecordByFamily.idActivity !== null)
    .filter((paymentRecordByFamily) => todaysDateLower(paymentRecordByFamily.dateEnd));

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    e.preventDefault();
    const password = newPassword;
    if (newPassword.length < 8) {
      setErrorNewPassword('Minimum de 8 caractères');
    } else if (newPassword.length > 15) {
      setErrorNewPassword('Maximum de 15 caractères');
    } else {
      try {
        await axios.put<IUserInfos>(
          `https://wild-pocli.herokuapp.com/api/families/${user.id}`,
          { password },
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        setPasswordChanged(true);
      } catch (err) {
        // err est renvoyé potentiellement par axios ou par le code, il peut avoir différents types
        console.error(err);
      }
    }
  };
  return (
    <div className="modalAdherent">
      <div
        className="modalAdherent__overlay"
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex={0}></div>
      <div className="modalAdherent__box">
        <div className="modalAdherent__box__header">
          <div
            className="modalAdherent__box__header__x-mark"
            role="button"
            onClick={handleClick}
            onKeyDown={handleClick}
            tabIndex={0}>
            <Icon name={'xmark'} width={'25px'} color={'white'} />
          </div>
        </div>
        {modalAdherentInfo && (
          <div className="modalAdherent__box__my-informations">
            <span>A propos de la famille</span>
            <div className="modalAdherent__box__my-informations__family">
              {family && lastPaymentRecordFamily && (
                <ul>
                  <li>
                    <span>Nom de famille : </span>
                    {family.name}
                  </li>
                  <li>
                    <span>Adresse : </span>
                    {`${family.streetNumber} ${family.address}, ${
                      cities.filter((city) => city.id === family.idCity)[0].zipCode
                    } ${cities.filter((city) => city.id === family.idCity)[0].name}`}
                  </li>
                  <li>
                    <span>Téléphone : </span>
                    {family.phoneNumber}
                  </li>
                  <li>
                    <span>Email : </span>
                    {family.email}
                  </li>
                  <li>
                    <span>Date d'adhésion : </span>
                    {transformDate(lastPaymentRecordFamily.dateStart)}
                  </li>
                  {differenceWithTodaysDate(lastPaymentRecordFamily.dateEnd) >= 0 ? (
                    <li>
                      <span>Fin d'adhésion : </span>
                      {transformDate(lastPaymentRecordFamily.dateEnd)}
                    </li>
                  ) : null}
                  {differenceWithTodaysDate(lastPaymentRecordFamily.dateEnd) >= 0 ? (
                    <li>
                      <span>Statut :</span>
                      <span className="active">Compte actif</span>
                      {`Il vous reste ${differenceWithTodaysDate(
                        lastPaymentRecordFamily.dateEnd,
                      )} ${
                        differenceWithTodaysDate(lastPaymentRecordFamily.dateEnd) > 1
                          ? ' jours'
                          : ' jour'
                      } avant la fin de votre adhésion`}
                    </li>
                  ) : (
                    <li>
                      <span>Statut :</span>
                      <span className="inactive">Compte inactif</span>Vous êtes arrivé au
                      terme de votre adhésion. Vos accès sont limités.
                    </li>
                  )}
                </ul>
              )}
            </div>
            <div className="modalAdherent__box__my-informations__members">
              <span>A propos des membres</span>
              {familyMembers &&
                familyMembers.map((familyMember, index) => (
                  <div
                    className="modalAdherent__box__my-informations__members__card"
                    key={index}>
                    <div className="modalAdherent__box__my-informations__members__card__account">
                      <ul>
                        <li>
                          <span>Prénom : </span>
                          {familyMember.firstname}
                        </li>
                        <li>
                          <span>Date d'anniversaire : </span>
                          {transformDate(familyMember.birthday)}
                        </li>
                      </ul>
                    </div>
                    {lastPaymentsRecordMembers && activities && activities[0].id !== 0 && (
                      <div className="modalAdherent__box__my-informations__members__card__payment-records">
                        {lastPaymentsRecordMembers
                          .filter(
                            (lastPaymentsRecordMember) =>
                              lastPaymentsRecordMember.idFamilyMember === familyMember.id,
                          )
                          .map((lastPaymentsRecordMember) => (
                            <ul
                              className={`${
                                activities
                                  .filter(
                                    (activity) =>
                                      activity.id === lastPaymentsRecordMember.idActivity,
                                  )
                                  .map((activity) => activity)[0].shortName
                              }`}>
                              <li>
                                <span>Activité : </span>
                                {
                                  activities
                                    .filter(
                                      (activity) =>
                                        activity.id ===
                                        lastPaymentsRecordMember.idActivity,
                                    )
                                    .map((activity) => activity)[0].name
                                }
                              </li>
                              <li>
                                <span>Date d'adhésion : </span>
                                {transformDate(lastPaymentsRecordMember.dateStart)}
                              </li>
                              <li>
                                <span>Fin d'adhésion : </span>
                                {transformDate(lastPaymentsRecordMember.dateEnd)}
                              </li>
                              <li>
                                <span>Nombre de jours restants : </span>
                                {`Votre adhésion à cette activité se terminera dans ${differenceWithTodaysDate(
                                  lastPaymentsRecordMember.dateEnd,
                                )} ${
                                  differenceWithTodaysDate(
                                    lastPaymentsRecordMember.dateEnd,
                                  ) > 1
                                    ? ' jours'
                                    : ' jour'
                                }`}
                              </li>
                            </ul>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
        {modalAdherentPwd && (
          <div className="modalAdherent__box__change-my-password">
            {!isAuth && (
              <div className="modalAdherent__box__change-my-password__login">
                <LoginCard modalAdherentPwd={modalAdherentPwd} setIsAuth={setIsAuth} />
              </div>
            )}
            {isAuth && !passwordChanged && (
              <form
                className="modalAdherent__box__change-my-password__change"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  changePassword(e);
                }}>
                <h1>Entrez votre nouveau mot de passe</h1>
                <StyledFormControl sx={{ width: '350px' }} variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    required
                    error={errorNewPassword ? true : false}
                    defaultValue="Error"
                    sx={{
                      fontFamily: 'Karla, sans-serif',
                      fontWeight: 800,
                    }}>
                    Mot de passe
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    required
                    error={errorNewPassword ? true : false}
                    sx={{
                      fontFamily: 'Karla, sans-serif',
                      fontWeight: 800,
                    }}
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPassword(event.target.value)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          style={{ color: 'white' }}
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                            event.preventDefault()
                          }
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Mot de passe"
                  />
                </StyledFormControl>
                <div className="modalAdherent__box__change-my-password__change__error">
                  {errorNewPassword && <p>{errorNewPassword}</p>}
                </div>
                <div className="modalAdherent__box__change-my-password__change__submit">
                  <button
                    type="submit"
                    className="modalAdherent__box__change-my-password__change__submit__button">
                    <Icon name="arrow-right" width="40px" height="40px" color="white" />
                  </button>
                </div>
              </form>
            )}
            {passwordChanged && (
              <div className="modalAdherent__box__change-my-password__pwd-changed">
                <h1>Votre mot de passe a bien été changé !</h1>
                <Icon name={'square-check'} width={'80px'} color={'#3d79af'} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalAdherent;
