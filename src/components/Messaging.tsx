import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import ICommunication from '../interfaces/ICommunication';
import ICommunicationMember from '../interfaces/ICommunicationMember';
import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import MessagingCard from './MessagingCard';
import MessagingMenu from './MessagingMenu';

const Messaging = () => {
  const [currentCommunication, setCurrentCommunication] = useState<ICommunication>({
    id: 0,
    object: '',
    content: '',
    date: '',
    idAdmin: 1,
  });
  const [selectedMessage, setSelectedMessage] = useState<ICommunicationMember>({
    id: 0,
    idFamilyMember: 0,
    idFamily: 0,
    idActivity: 0,
    idCommunication: 0,
    isOpened: 0,
    isTrashed: 0,
    isBanner: 0,
  });
  const [currentMenu, setCurrentMenu] = useState<ICommunicationMember[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<number>(0);

  const {
    user,
    setFamilyMembers,
    setCommunicationMembersByFamily,
    setCommunications,
    cardSelected,
    familyMembers,
  } = useContext(CurrentUserContext);

  const { setDocuments } = useContext(CurrentDataContext);

  useEffect(() => {
    let urls = [
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/familyMembers`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/communicationMembers`,
      `https://wild-pocli.herokuapp.com/api/communications`,
      `https://wild-pocli.herokuapp.com/api/documents`,
    ];

    getAllDataWithCredential(urls)
      .then((res) => {
        setFamilyMembers(res[0].data);
        setCommunicationMembersByFamily(res[1].data);
        setCommunications(res[2].data);
        setDocuments(res[3].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner
        nameBannerActivity=""
        title="Ma messagerie"
        nameIcon=""
        memberFilter={true}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={true}
      />
      <div className="messagingContainer">
        <div className="messagingContainer__header">
          <div className="messagingContainer__header__left">
            {cardSelected.includes(false) ? (
              <p>
                Filtre :
                {cardSelected.map((card, index) =>
                  index !== 0 && card ? (
                    <span key={index}>, {familyMembers[index].firstname}</span>
                  ) : (
                    card && <span key={index}> {familyMembers[index].firstname}</span>
                  ),
                )}
              </p>
            ) : (
              <p>Filtre : Toute la famille</p>
            )}
          </div>
          <div className="messagingContainer__header__right">
            <ComeBackHome link="/adherent-space" text="Revenir à l'espace adhérent" />
          </div>
        </div>
        <div className="messagingContainer__content">
          <div className="messagingContainer__content__left">
            <MessagingMenu
              selectedMessage={selectedMessage}
              setSelectedMessage={setSelectedMessage}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              currentCommunication={currentCommunication}
              setCurrentCommunication={setCurrentCommunication}
              setCurrentMenu={setCurrentMenu}
            />
          </div>
          <div className="messagingContainer__content__right">
            <MessagingCard
              setSelectedMessage={setSelectedMessage}
              selectedMessage={selectedMessage}
              currentCommunication={currentCommunication}
              setCurrentCommunication={setCurrentCommunication}
              currentMenu={currentMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
