import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import transformDate from '../../helpers/transformDate';
import CurrentUserContext from '../contexts/CurrentUser';
import ICommunication from '../interfaces/ICommunication';
import ICommunicationMember from '../interfaces/ICommunicationMember';
import Icon from './Icon';

export interface MessageProps {
  openedMessage: number;
  setOpenedMessage: React.Dispatch<React.SetStateAction<number>>;
}

const MessagingMenu = ({ setOpenedMessage }: MessageProps) => {
  const {
    communicationMembersByFamily,
    setCommunicationMembersByFamily,
    communications,
    setCommunications,
    user,
  } = useContext(CurrentUserContext);

  const [selectedMessage, setSelectedMessage] = useState<number>(-1);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [currentMenu, setCurrentMenu] = useState<ICommunication[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSelectedMenu = (number: number) => {
    setSelectedMenu(number);
    setSelectedMessage(-1);
    number === 1
      ? setCurrentMenu(communicationsFamilyUnread)
      : number === 2
      ? setCurrentMenu(allCommunicationsFamily)
      : number === 3 && setCurrentMenu(trashCommunications);
  };

  // const handleTrash = (number: number) => {};

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
  }, []);

  const putOpened = async (idCommunication: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      await axios.put<ICommunicationMember>(
        `https://wild-pocli.herokuapp.com/api/communicationMembers/${idCommunication}`,
        { isOpened: 1 },
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
    } catch (err) {
      // err est renvoyé potentiellement par axios ou par le code, il peut avoir différents types
      if (axios.isAxiosError(err)) {
        // pour gérer les erreurs de type axios
        if (err.response?.status === 401) {
          setErrorMessage('Error 401');
        }
      } else {
        // pour gérer les erreurs non axios
        if (err instanceof Error) setErrorMessage(err.message);
      }
    }
  };

  const putTrash = async (idCommunication: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      await axios.put<ICommunicationMember>(
        `https://wild-pocli.herokuapp.com/api/communicationMembers/${idCommunication}`,
        { isTrashed: 1 },
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
    } catch (err) {
      // err est renvoyé potentiellement par axios ou par le code, il peut avoir différents types
      if (axios.isAxiosError(err)) {
        // pour gérer les erreurs de type axios
        if (err.response?.status === 401) {
          setErrorMessage('Error 401');
        }
      } else {
        // pour gérer les erreurs non axios
        if (err instanceof Error) setErrorMessage(err.message);
      }
    }
  };

  const deleteCom = async (idCommunication: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      await axios.delete<ICommunicationMember>(
        `https://wild-pocli.herokuapp.com/api/communicationMembers/${idCommunication}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
    } catch (err) {
      // err est renvoyé potentiellement par axios ou par le code, il peut avoir différents types
      if (axios.isAxiosError(err)) {
        // pour gérer les erreurs de type axios
        if (err.response?.status === 401) {
          setErrorMessage('Error 401');
        }
      } else {
        // pour gérer les erreurs non axios
        if (err instanceof Error) setErrorMessage(err.message);
      }
    }
  };

  const allCommunicationsFamily = communicationMembersByFamily
    .filter((com) => !com.isTrashed)
    .map((com) => communications.filter((commu) => com.idCommunication === commu.id))
    .map((commun) => commun[0]);

  const communicationsFamilyUnread = communicationMembersByFamily
    .filter((com) => com.isOpened === 0)
    .map((com) => communications.filter((commu) => com.idCommunication === commu.id))
    .map((commun) => commun[0]);

  const trashCommunications = communicationMembersByFamily
    .filter((com) => com.isTrashed)
    .map((com) => communications.filter((commu) => com.idCommunication === commu.id))
    .map((commun) => commun[0]);

  const handleSelectedMessage = (number: number, idCommunication: number) => {
    setSelectedMessage(number);
    setOpenedMessage(idCommunication);
  };

  useEffect(() => {
    communicationMembersByFamily.map(
      (communication) =>
        communication.isOpened === 0 && setUnreadMessages(unreadMessages + 1),
    );
  }, []);

  useEffect(() => {
    selectedMessage !== -1 &&
      communicationMembersByFamily.find(
        (com) => com.idCommunication === currentMenu[selectedMessage].id,
      )?.isOpened === 0 &&
      putOpened(
        communicationMembersByFamily.find(
          (com) => com.idCommunication === currentMenu[selectedMessage].id,
        )?.idCommunication!,
      );
  }, []);

  useEffect(() => {
    selectedMessage !== -1 &&
      communicationMembersByFamily.find(
        (com) => com.idCommunication === currentMenu[selectedMessage].id,
      )?.isTrashed === 0 &&
      putTrash(
        communicationMembersByFamily.find(
          (com) => com.idCommunication === currentMenu[selectedMessage].id,
        )?.idCommunication!,
      );
  }, []);

  useEffect(() => {
    selectedMessage !== -1 &&
      communicationMembersByFamily.find(
        (com) => com.idCommunication === currentMenu[selectedMessage].id,
      )?.isTrashed === 1 &&
      deleteCom(
        communicationMembersByFamily.find(
          (com) => com.idCommunication === currentMenu[selectedMessage].id,
        )?.idCommunication!,
      );
  }, []);

  return (
    <div className="messagingMenuContainer">
      {selectedMenu === 1 ? (
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
