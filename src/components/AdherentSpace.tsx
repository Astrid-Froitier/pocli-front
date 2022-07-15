import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllDataWithoutCredential } from '../../helpers/axios';
import CurrentUserContext from '../contexts/CurrentUser';

import Banner from './Banner';

const AdherentSpace = () => {
  const {
    user,
    // family,
    setFamily,
    // city,
    setCity,
    // recipient,
    setRecipient,
    // familyMembers,
    setFamilyMembers,
    // paymentRecordsByFamily,
    setPaymentRecordsByFamily,
    // paymentMethods,
    setPaymentMethods,
    // communicationMembersByFamily,
    setCommunicationMembersByFamily,
    // communications,
    setCommunications,
    // linkedDocumentsByFamily,
    setLinkedDocumentsByFamily,
    // familyMemberEvents,
    setFamilyMemberEvents
  } = useContext(CurrentUserContext);

  useEffect(() => {
    let urls = [
      `https://wild-pocli.herokuapp.com/api/families/${user.id}`,
      `https://wild-pocli.herokuapp.com/api/cities/`,
      `https://wild-pocli.herokuapp.com/api/recipients/`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/familyMembers`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/paymentRecords`,
      `https://wild-pocli.herokuapp.com/api/paymentMethods`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/communicationMembers`,
      `https://wild-pocli.herokuapp.com/api/communications`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/linkedDocuments`,
      `https://wild-pocli.herokuapp.com/api/familyMemberEvents`,
      // `https://wild-pocli.herokuapp.com/api/familyMemberActivities/${idFamlyMember}`,
    ];

    getAllDataWithoutCredential(urls)
      .then((res) => {
        setFamily(res[0].data);
        setCity(res[1].data);
        setRecipient(res[2].data);
        setFamilyMembers(res[3].data);
        setPaymentRecordsByFamily(res[4].data);
        setPaymentMethods(res[5].data);
        setCommunicationMembersByFamily(res[6].data);
        setCommunications(res[7].data);
        setLinkedDocumentsByFamily(res[8].data);
        setFamilyMemberEvents(res[9].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  
  return (
    <div>
      <Banner
        nameBannerActivity=""
        title="Mon espace adhérent"
        nameIcon=""
        memberFilter={true}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={true}
      />
      <div className="adherentSpaceContainer">
        <div className="adherentSpaceContainer__left">
          <h1>Tableau de bord</h1>
          <p>
            Mes évènements - <span>2</span> à venir
          </p>
          <NavLink to="/messaging">
            <p>
              Mes messages - <span>3</span> non lu(s)
            </p>
          </NavLink>
          <NavLink to="/documents">
            <p>
              Mes documents - <span>0</span> non lu(s)
            </p>
          </NavLink>
        </div>
        <div className="adherentSpaceContainer__right">
          <h1>Mon compte</h1>
          <p>Mes informations</p>
          <p>Changer mon mot de passe</p>
          <NavLink to="/contact">
            <p>Nous contacter</p>
          </NavLink>
          <p className="adherentSpaceContainer__right__disconnection">Me déconnecter</p>
        </div>
      </div>
    </div>
  );
};

export default AdherentSpace;
