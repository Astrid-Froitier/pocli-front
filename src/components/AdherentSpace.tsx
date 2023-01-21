import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, NavLink, useNavigate } from 'react-router-dom';

import { getAllDataWithCredential } from '../../helpers/axios';
import { todaysDateLower } from '../../helpers/transformDate';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IEvent from '../interfaces/IEvent';
import Banner from './Banner';
import ModalAdherent from './ModalAdherent';

const AdherentSpace = () => {
  const {
    user,
    setFamily,
    setCities,
    setRecipients,
    setFamilyMembers,
    setPaymentRecordsByFamily,
    setPaymentMethods,
    communicationMembersByFamily,
    setCommunicationMembersByFamily,
    setCommunications,
    linkedDocumentsByFamily,
    setLinkedDocumentsByFamily,
    familyMemberEvents,
    setFamilyMemberEvents,
    logout,
    selectedMembers,
  } = useContext(CurrentUserContext);

  const { events, setEvents, setDocuments, setActivities } =
    useContext(CurrentDataContext);

  useEffect(() => {
    let urls = [
      `https://pocli-bd.herokuapp.com/api/families/${user.id}`,
      `https://pocli-bd.herokuapp.com/api/cities/`,
      `https://pocli-bd.herokuapp.com/api/recipients/`,
      `https://pocli-bd.herokuapp.com/api/families/${user.id}/familyMembers`,
      `https://pocli-bd.herokuapp.com/api/families/${user.id}/paymentRecords`,
      `https://pocli-bd.herokuapp.com/api/paymentMethods`,
      `https://pocli-bd.herokuapp.com/api/families/${user.id}/communicationMembers`,
      `https://pocli-bd.herokuapp.com/api/communications`,
      `https://pocli-bd.herokuapp.com/api/families/${user.id}/linkedDocuments`,
      `https://pocli-bd.herokuapp.com/api/familyMemberEvents`,
      `https://pocli-bd.herokuapp.com/api/documents`,
      `https://pocli-bd.herokuapp.com/api/events`,
      `https://pocli-bd.herokuapp.com/api/activities`,
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
  const [unreadDocuments, setUnreadDocuments] = useState<number>(0);

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
    const familySelectedMembers = selectedMembers.flatMap((member) =>
      familyMemberEvents.filter((event) => member.id === event.idFamilyMember),
    );

    const upComingEventsSelectedMembers = familySelectedMembers.flatMap((eventMember) =>
      events
        .filter((event) => event.id === eventMember.idEvent)
        .filter((event) => todaysDateLower(event.date)),
    );
    setNewEvents([...new Set(upComingEventsSelectedMembers)]);
  }, [selectedMembers, events]);

  useEffect(() => {
    setUnreadMessages(
      selectedMembers.flatMap((member) =>
        communicationMembersByFamily.filter(
          (com) => member.id === com.idFamilyMember && !com.isOpened,
        ),
      ).length,
    );
  }, [communicationMembersByFamily, selectedMembers]);

  useEffect(() => {
    setUnreadDocuments(
      selectedMembers.flatMap((member) =>
        linkedDocumentsByFamily.filter(
          (doc) => doc.idFamilyMember === member.id && !doc.isOpened,
        ),
      ).length,
    );
  }, [linkedDocumentsByFamily, selectedMembers]);

  // useEffect permettant d'empêcher le scroll sur Y suivant l'état de modalOnOff
  useEffect(() => {
    {
      modalOnOff && document.documentElement.style.setProperty('overflow-y', 'hidden');
    }
  }, [modalOnOff]);

  return (
    <>
      <div className="adherentSpanceBanner">
        <h1>Mon espace adhérent</h1>
      </div>

      <div className={`adherentSpaceContainer ${modalOnOff}`}>
        <Banner
          nameBannerActivity=""
          title="Mon espace adhérent"
          nameIcon=""
          memberFilter={true}
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
                Mes documents - <span>{unreadDocuments}</span> non lu(s)
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
              <p>J&apos;ai une question</p>
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
