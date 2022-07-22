import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import ICommunication from '../interfaces/ICommunication';
import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import MessagingCard from './MessagingCard';
import MessagingMenu from './MessagingMenu';

export interface MessageMenuProps {
  setOpenedMessage: React.Dispatch<React.SetStateAction<number>>;
  selectedMessage: number;
  setSelectedMessage: React.Dispatch<React.SetStateAction<number>>;
  selectedMenu: number;
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>;
  currentMenu: ICommunication[];
  setCurrentMenu: React.Dispatch<React.SetStateAction<ICommunication[]>>;
  trashCom: number;
}

export interface MessageCardProps {
  selectedMessage: number;
  setSelectedMessage: React.Dispatch<React.SetStateAction<number>>;
  currentMenu: ICommunication[];
  trashCom: number;
  setTrashCom: React.Dispatch<React.SetStateAction<number>>;
}

const Messaging = () => {
  const [openedMessage, setOpenedMessage] = useState<number>(-1);
  const [selectedMessage, setSelectedMessage] = useState<number>(-1);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [currentMenu, setCurrentMenu] = useState<ICommunication[]>([]);
  const [trashCom, setTrashCom] = useState(0);

  const { user, setFamilyMembers, setCommunicationMembersByFamily, setCommunications } =
    useContext(CurrentUserContext);

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
            <p>Filtre :</p>
          </div>
          <div className="messagingContainer__header__right">
            <ComeBackHome link="/adherent-space" text="Revenir à l'espace adhérent" />
          </div>
        </div>
        <div className="messagingContainer__content">
          <div className="messagingContainer__content__left">
            <MessagingMenu
              setOpenedMessage={setOpenedMessage}
              selectedMessage={selectedMessage}
              setSelectedMessage={setSelectedMessage}
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              trashCom={trashCom}
            />
          </div>
          <div className="messagingContainer__content__right">
            <MessagingCard
              setSelectedMessage={setSelectedMessage}
              selectedMessage={selectedMessage}
              currentMenu={currentMenu}
              setTrashCom={setTrashCom}
              trashCom={trashCom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
