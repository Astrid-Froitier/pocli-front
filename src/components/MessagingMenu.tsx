import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import transformDate from '../../helpers/transformDate';
import CurrentUserContext from '../contexts/CurrentUser';
import ICommunication from '../interfaces/ICommunication';
import ICommunicationMember from '../interfaces/ICommunicationMember';
import Icon from './Icon';
import { MessageMenuProps } from './Messaging';

const MessagingMenu = ({
  setOpenedMessage,
  selectedMessage,
  setSelectedMessage,
  currentMenu,
  setCurrentMenu,
  selectedMenu,
  setSelectedMenu,
  trashCom,
}: MessageMenuProps) => {
  const {
    communicationMembersByFamily,
    setCommunicationMembersByFamily,
    communications,
    setCommunications,
    user,
  } = useContext(CurrentUserContext);

  console.log(currentMenu, selectedMessage);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [allCommunicationsFamily, setAllCommunicationsFamily] = useState<
    ICommunication[]
  >([]);
  const [communicationsFamilyUnread, setCommunicationsFamilyUnread] = useState<
    ICommunication[]
  >([]);
  const [trashCommunications, setTrashCommunications] = useState<ICommunication[]>([]);

  const handleSelectedMenu = (number: number) => {
    setSelectedMenu(number);
    setSelectedMessage(-1);
    number === 1
      ? setCurrentMenu(communicationsFamilyUnread)
      : number === 2
      ? setCurrentMenu(allCommunicationsFamily)
      : number === 3 && setCurrentMenu(trashCommunications);
  };

  useEffect(() => {
    let urls = [
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/communicationMembers`,
      `https://wild-pocli.herokuapp.com/api/communications`,
    ];
    communications &&
      getAllDataWithCredential(urls)
        .then((res) => {
          setCommunicationMembersByFamily(res[0].data);
          setCommunications(res[1].data);
        })
        .catch((err) => {
          console.error(err);
          console.log(errorMessage);
        });
  }, [selectedMessage, trashCom]);

  console.log(`${trashCom} trashCom`);

  useEffect(() => {
    setAllCommunicationsFamily(
      communicationMembersByFamily
        .filter((com) => !com.isTrashed)
        .map((com) => communications.filter((commu) => com.idCommunication === commu.id))
        .map((commun) => commun[0]),
    );

    setCommunicationsFamilyUnread(
      communicationMembersByFamily
        .filter((com) => com.isOpened === 0)
        .map((com) => communications.filter((commu) => com.idCommunication === commu.id))
        .map((commun) => commun[0]),
    );

    setTrashCommunications(
      communicationMembersByFamily
        .filter((com) => com.isTrashed)
        .map((com) => communications.filter((commu) => com.idCommunication === commu.id))
        .map((commun) => commun[0]),
    );
  }, [communicationMembersByFamily]);
  const dataOpened = JSON.stringify({ isOpened: '1' });

  const putOpened = async (idCommunication: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    console.log('putOpened', idCommunication);
    try {
      await axios.put<ICommunicationMember>(
        `http://localhost:3001/api/communicationMembers/${idCommunication}`,
        dataOpened,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      // err est renvoyé potentiellement par axios ou par le code, il peut avoir différents types
      if (axios.isAxiosError(err)) {
        // pour gérer les erreurs de type axios
        console.log('err');
        if (err.response?.status === 401) {
          setErrorMessage('Error 401');
        }
      } else {
        // pour gérer les erreurs non axios
        if (err instanceof Error) setErrorMessage(err.message);
      }
    }
  };

  const handleSelectedMessage = (number: number, idCommunication: number) => {
    setSelectedMessage(number);
    setOpenedMessage(idCommunication);
  };

  useEffect(() => {
    setUnreadMessages(
      communicationMembersByFamily.filter((communication) => communication.isOpened === 0)
        .length,
    );
  }, [communicationMembersByFamily]);

  useEffect(() => {
    selectedMessage !== -1 &&
      currentMenu.length !== -1 &&
      communicationMembersByFamily.find(
        (com) => com.idCommunication === currentMenu[selectedMessage].id,
      )?.isOpened === 0 &&
      putOpened(
        communicationMembersByFamily.find(
          (com) => com.idCommunication === currentMenu[selectedMessage].id,
        )?.id!,
      );
  }, [selectedMessage]);

  return (
    <div className="messagingMenuContainer">
      {selectedMenu === 1 && unreadMessages !== 0 ? (
        <div className="messagingMenuContainer__unreadMessagesDevelopped">
          <div
            role="button"
            onKeyDown={() => handleSelectedMenu(0)}
            tabIndex={0}
            className="messagingMenuContainer__unreadMessagesDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="envelope-notification" width="40px" color="white" />
            <p>
              {unreadMessages > 1 ? 'Messages non lus' : 'Message non lu'} -
              <span> {unreadMessages}</span>
            </p>
          </div>
          <div className="messagingMenuContainer__unreadMessagesDevelopped__messagesBox">
            {communicationsFamilyUnread.map((com, index) => (
              <div
                onClick={() => handleSelectedMessage(index, com.id)}
                role="button"
                onKeyDown={() => handleSelectedMessage(index, com.id)}
                tabIndex={0}
                key={index}
                className={
                  selectedMessage === index
                    ? 'messagingMenuContainer__unreadMessagesDevelopped__messagesBox__messageSelected'
                    : 'messagingMenuContainer__unreadMessagesDevelopped__messagesBox__messages'
                }>
                <p>{`${transformDate(com.date)} - ${com.object}`}</p>
                <p>Non lu</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          role="button"
          onKeyDown={() => handleSelectedMenu(1)}
          tabIndex={0}
          onClick={() => handleSelectedMenu(1)}
          className="messagingMenuContainer__unreadMessages">
          <Icon name="envelope-notification" width="40px" color="#3D79AF" />
          <p>
            {unreadMessages > 1 ? 'Messages non lus' : 'Message non lu'} -
            <span> {unreadMessages}</span>
          </p>
        </div>
      )}
      {selectedMenu === 2 ? (
        <div className="messagingMenuContainer__allMessagesDevelopped">
          <div
            role="button"
            onKeyDown={() => handleSelectedMenu(0)}
            tabIndex={0}
            className="messagingMenuContainer__allMessagesDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="envelopes" width="40px" color="white" />
            <p>Tous les messages</p>
          </div>
          <div className="messagingMenuContainer__allMessagesDevelopped__messagesBox">
            {allCommunicationsFamily.map((com, index) => (
              <div
                key={index}
                role="button"
                onKeyDown={() => handleSelectedMessage(index, com.id)}
                tabIndex={0}
                onClick={() => handleSelectedMessage(index, com.id)}
                className={
                  selectedMessage === index
                    ? 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messageSelected'
                    : 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messages'
                }>
                {communicationMembersByFamily.find(
                  (comu) => comu.idCommunication === com.id,
                )?.isOpened === 0 ? (
                  <div
                    className={
                      selectedMessage === index
                        ? 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messageSelected__unreadMessage'
                        : 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messages__unreadMessage'
                    }>
                    <p>{`${transformDate(com.date)} - ${com.object}`}</p>
                    <p>Non lu</p>
                  </div>
                ) : (
                  <div
                    className={
                      selectedMessage === index
                        ? 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messageSelected__readedMessage'
                        : 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messages__readedMessage'
                    }>
                    <p>{`${transformDate(com.date)} - ${com.object}`}</p>
                    <p>Lu</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          role="button"
          onKeyDown={() => handleSelectedMenu(2)}
          tabIndex={0}
          onClick={() => handleSelectedMenu(2)}
          className="messagingMenuContainer__allMessages">
          <Icon name="envelopes" width="40px" color="#3D79AF" />
          <p>Tous les messages</p>
        </div>
      )}
      {selectedMenu === 3 ? (
        <div className="messagingMenuContainer__trashDevelopped">
          <div
            role="button"
            onKeyDown={() => handleSelectedMenu(0)}
            tabIndex={0}
            className="messagingMenuContainer__trashDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="trash-can" width="40px" color="white" />
            <p>Corbeille</p>
          </div>
          <div className="messagingMenuContainer__trashDevelopped__messagesBox">
            {trashCommunications.map((commu, index) => (
              <div
                key={index}
                role="button"
                onKeyDown={() => handleSelectedMessage(index, commu.id)}
                tabIndex={0}
                onClick={() => handleSelectedMessage(index, commu.id)}
                className={
                  selectedMessage === index
                    ? 'messagingMenuContainer__trashDevelopped__messagesBox__messageSelected'
                    : 'messagingMenuContainer__trashDevelopped__messagesBox__messages'
                }>
                <p>{`${transformDate(commu.date)} - ${commu.object}`}</p>
                <p>Lu</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          role="button"
          onKeyDown={() => handleSelectedMenu(3)}
          tabIndex={0}
          onClick={() => handleSelectedMenu(3)}
          className="messagingMenuContainer__trash">
          <Icon name="trash-can" width="40px" color="#3D79AF" />
          <p>Corbeille</p>
        </div>
      )}
    </div>
  );
};

export default MessagingMenu;
