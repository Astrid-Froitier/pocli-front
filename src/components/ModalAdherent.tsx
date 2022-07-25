import React, { useContext, useEffect } from 'react';
import { getAllDataWithCredential } from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';

import IEvent from '../interfaces/IEvent';
import Icon from './Icon';

interface BannerProps {
  setModalOnOff: React.Dispatch<React.SetStateAction<string>>;
}

const ModalAdherent = ({ setModalOnOff }: BannerProps) => {

  const {
    user,
    family,
    setFamily,
    cities,
    setCities,
    // recipients,
    setRecipients,
    familyMembers,
    setFamilyMembers,
    paymentRecordsByFamily,
    setPaymentRecordsByFamily,
    // paymentMethods,
    setPaymentMethods,
    communicationMembersByFamily,
    setCommunicationMembersByFamily,
    // communications,
    setCommunications,
    // linkedDocumentsByFamily,
    setLinkedDocumentsByFamily,
    familyMemberEvents,
    setFamilyMemberEvents,
    logout,
    cardSelected
  } = useContext(CurrentUserContext);

  const { events, setEvents, setDocuments } = useContext(CurrentDataContext);

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
console.log(family);

  return (
    <div className="modalAdherent">
      <div
        className="modalAdherent__overlay"
        onClick={() => setModalOnOff('')}
        onKeyDown={() => setModalOnOff('')}
        role="button"
        tabIndex={0}></div>
      <div className="modalAdherent__box">
        <div className="modalAdherent__box__header">
          <div
            className="modalAdherent__box__header__x-mark"
            role="button"
            onClick={() => setModalOnOff('')}
            onKeyDown={() => setModalOnOff('')}
            tabIndex={0}>
            <Icon name={'xmark'} width={'25px'} color={'white'} />
          </div>
        </div>
        <div className="modalAdherent__box__my-informations">
          <span>A propos de la famille :</span>
          <div className="modalAdherent__box__my-informations__family">
            <ul>
              <li>{`Famille : ${family.name}`}</li>
              <li>{`Adress : ${family.streetNumber} ${family.address}, ${cities.filter((city)=> city.id === family.idCity)[0].zipCode} ${cities.filter((city)=> city.id === family.idCity)[0].name}`}</li>
              <li>{`Téléphone : ${family.phoneNumber}`}</li>
              <li>{`Email : ${family.email}`}</li>
              <li>{`Date d'adhésion : ${paymentRecordsByFamily.filter((paymentRecordByFamily)=> paymentRecordByFamily.idFamily === family.id && paymentRecordByFamily.idActivity === null).sort((a,b)=> b.id - a.id)[0].dateStart}`}</li>
            </ul>
          </div>
          <div className="modalAdherent__box__my-informations__members">
            <div className="modalAdherent__box__my-informations__members__card">
              <div className="modalAdherent__box__my-informations__members__card__account">

              </div>
              <div className="modalAdherent__box__my-informations__members__card__payment-records">

              </div>
            </div>

          </div>
        </div>
        <div className="modalAdherent__box__test"></div>
      </div>
    </div>
  );
};

export default ModalAdherent;
