import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getAllDataWithCredential } from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import Banner from './Banner';
import ModalAdherent from './ModalAdherent';

const AdherentSpace = () => {
  const {
    user,
    // family,
    setFamily,
    // cities,
    setCities,
    // recipients,
    setRecipients,
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
    setFamilyMemberEvents,
  } = useContext(CurrentUserContext);

  const { setDocuments } = useContext(CurrentDataContext);

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
      `https://wild-pocli.herokuapp.com/api/documents`,
      `https://wild-pocli.herokuapp.com/api/familyMemberEvents`,
      // `https://wild-pocli.herokuapp.com/api/familyMemberActivities/${idFamlyMember}`,
    ];

    getAllDataWithCredential(urls)
      .then((res) => {
        setFamily(res[0].data);
        setCities(res[1].data);
        setRecipients(res[2].data);
        setFamilyMembers(res[3].data);
        setPaymentRecordsByFamily(res[4].data);
        setPaymentMethods(res[5].data);
        setCommunicationMembersByFamily(res[6].data);
        setCommunications(res[7].data);
        setLinkedDocumentsByFamily(res[8].data);
        setDocuments(res[9].data);
        setFamilyMemberEvents(res[10].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [modalOnOff, setModalOnOff] = useState<string>('');
  const [modalAdherentInfo, setModalAdherentInfo] = useState<boolean>(false);
  const [modalAdherentPwd, setModalAdherentPwd] = useState<boolean>(false);

  // handleClick permettant d'afficher l'évènement cliqué sous forme de modale
  const handleClickInfo = () => {
    setModalAdherentInfo(!modalAdherentInfo);
    setModalOnOff('modal');
  };
  const handleClickPwd = () => {
    setModalAdherentPwd(!modalAdherentPwd);
    setModalOnOff('modal');
  };

  // useEffect permettant de remonter la page en top au montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect permettant d'empêcher le scroll sur x suivant l'état de modalOnOff
  useEffect(() => {
    {
      modalOnOff && document.documentElement.style.setProperty('overflow-y', 'hidden');
    }
  }, [modalOnOff]);

  return (
    <>
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
        <div className={`adherentSpaceContainer ${modalOnOff}`}>
          <div className="adherentSpaceContainer__left">
            <h1>Tableau de bord</h1>
            <NavLink to="/my-events">
              <p>
                Mes évènements - <span>2</span> à venir
              </p>
            </NavLink>
            <NavLink to="/my-messaging">
              <p>
                Mes messages - <span>3</span> non lu(s)
              </p>
            </NavLink>
            <NavLink to="/my-documents">
              <p>
                Mes documents - <span>0</span> non lu(s)
              </p>
            </NavLink>
          </div>
          <div className="adherentSpaceContainer__right">
            <h1>Mon compte</h1>
            <ul>
              <li className="adherentSpaceContainer__right__info">
                <span
                  onKeyDown={handleClickInfo}
                  tabIndex={0}
                  onClick={handleClickInfo}
                  role="button">
                  Mes informations
                </span>
              </li>

              <li className="adherentSpaceContainer__right__pwd">
                <span
                  onKeyDown={handleClickPwd}
                  tabIndex={0}
                  onClick={handleClickPwd}
                  role="button">
                  Changer mon mot de passe
                </span>
              </li>

              <NavLink to="/contact">
                <li>Nous contacter</li>
              </NavLink>
              <li>Me déconnecter</li>
            </ul>
          </div>
        </div>
      </div>
      {modalOnOff && (
        <ModalAdherent
          setModalAdherentInfo={setModalAdherentInfo}
          setModalAdherentPwd={setModalAdherentPwd}
          modalAdherentInfo={modalAdherentInfo}
          modalAdherentPwd={modalAdherentPwd}
          setModalOnOff={setModalOnOff}
        />
      )}
    </>
  );
};

export default AdherentSpace;
