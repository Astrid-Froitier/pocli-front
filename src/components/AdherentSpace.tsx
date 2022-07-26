import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, NavLink, useNavigate } from 'react-router-dom';

import { getAllDataWithCredential } from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import Banner from './Banner';
import ModalAdherent from './ModalAdherent';
import { todaysDateLower } from '../../helpers/transformDate';
import IEvent from '../interfaces/IEvent';

const AdherentSpace = () => {
  const {
    user,
    // family,
    setFamily,
    // cities,
    setCities,
    // recipients,
    setRecipients,
    familyMembers,
    setFamilyMembers,
    // paymentRecordsByFamily,
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

  const { events, setEvents, setDocuments, setActivities } = useContext(CurrentDataContext);

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
      `https://wild-pocli.herokuapp.com/api/documents`,
      `https://wild-pocli.herokuapp.com/api/events`,
      `https://wild-pocli.herokuapp.com/api/activities`,
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
        setFamilyMemberEvents(res[9].data);
        setDocuments(res[10].data);
        setEvents(res[11].data);
        setActivities(res[12].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [modalOnOff, setModalOnOff] = useState<string>('');
  const [modalAdherentInfo, setModalAdherentInfo] = useState<boolean>(false);
  const [modalAdherentPwd, setModalAdherentPwd] = useState<boolean>(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [newEvents, setNewEvents] = useState<IEvent[]>([]);

  const navigate: NavigateFunction = useNavigate();

  // handleClick permettant d'afficher l'évènement cliqué sous forme de modale
  const handleClickInfo = () => {
    setModalAdherentInfo(true);
    setModalOnOff('modal');
  };
  const handleClickPwd = () => {
    setModalAdherentPwd(true);
    setModalOnOff('modal');
  };

  function redirectHome() {
    navigate('/');
  }

  const handleLogout = () => {
    redirectHome();
    logout();
  };

  // useEffect permettant de remonter la page en top au montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const allFamilyMembersEvents = familyMembers.flatMap((familyMember)=> familyMemberEvents.filter((familyMemberEvent)=> familyMemberEvent.idFamilyMember === familyMember.id))

    const allUpcomingEvents = events.filter((event)=>todaysDateLower(event.date))
    
    const allFamilyMembersUpcomingEvents = allFamilyMembersEvents.flatMap((allFamilyMembersEvent)=>allUpcomingEvents.filter((allUpcomingEvent)=> allUpcomingEvent.id === allFamilyMembersEvent.idEvent))
  
    setNewEvents([...new Set(allFamilyMembersUpcomingEvents)])

  }, [events]);

  useEffect(() => {
    communicationMembersByFamily
      .filter((com) => !com.isOpened)
      .map((com, index) => com && setUnreadMessages(index + 1));
  }, [communicationMembersByFamily]);

  // useEffect permettant d'empêcher le scroll sur Y suivant l'état de modalOnOff
  useEffect(() => {
    {
      modalOnOff && document.documentElement.style.setProperty('overflow-y', 'hidden');
    }
  }, [modalOnOff]);

  console.log(modalAdherentInfo);
  console.log(modalAdherentPwd);
  
  

  return (
    <>
      <div className={`adherentSpaceContainer ${modalOnOff}`}>
        <Banner
          nameBannerActivity=""
          title="Mon espace adhérent"
          nameIcon=""
          memberFilter={false}
          bannerAbout={false}
          bannerEvent={false}
          bannerMember={true}
        />
        <div className="adherentSpaceContainer__box">
          <div className="adherentSpaceContainer__box__left">
            <h1>Tableau de bord</h1>
            <NavLink to="/my-events">
              <p>
                Mes évènements - <span>{newEvents.length}</span> à venir
              </p>
            </NavLink>
            <NavLink to="/my-messaging">
              <p>
                Mes messages - <span>{unreadMessages}</span> non lu(s)
              </p>
            </NavLink>
            <NavLink to="/my-documents">
              <p>
                Mes documents - <span>0</span> non lu(s)
              </p>
            </NavLink>
          </div>
          <div className="adherentSpaceContainer__box__right">
            <h1>Mon compte</h1>
            <span
              onKeyDown={handleClickInfo}
              tabIndex={0}
              onClick={handleClickInfo}
              role="button">
              Mes informations
            </span>

            <span
              onKeyDown={handleClickPwd}
              tabIndex={0}
              onClick={handleClickPwd}
              role="button">
              Changer mon mot de passe
            </span>

            <NavLink to="/contact">
              <p>J'ai une question</p>
            </NavLink>
            <span
              onKeyDown={handleLogout}
              tabIndex={0}
              onClick={handleLogout}
              role="button">
              Me déconnecter
            </span>
          </div>
        </div>
      </div>
      {modalOnOff && (
        <ModalAdherent
          setModalOnOff={setModalOnOff}
          modalAdherentInfo={modalAdherentInfo}
          modalAdherentPwd={modalAdherentPwd}
          setModalAdherentInfo={setModalAdherentInfo}
          setModalAdherentPwd={setModalAdherentPwd}
        />
      )}
    </>
  );
};

export default AdherentSpace;
