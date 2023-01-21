import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import { transformDate } from '../../helpers/transformDate';
import CurrentUserContext from '../contexts/CurrentUser';
import ICommunication from '../interfaces/ICommunication';
import ICommunicationMember from '../interfaces/ICommunicationMember';
import Icon from './Icon';

interface MessageMenuProps {
  selectedMessage: ICommunicationMember;
  setSelectedMessage: React.Dispatch<React.SetStateAction<ICommunicationMember>>;
  selectedMenu: number;
  setSelectedMenu: React.Dispatch<React.SetStateAction<number>>;
  currentCommunication: ICommunication;
  setCurrentCommunication: React.Dispatch<React.SetStateAction<ICommunication>>;
  setCurrentMenu: React.Dispatch<React.SetStateAction<ICommunicationMember[]>>;
}

const MessagingMenu = ({
  selectedMessage,
  setSelectedMessage,
  selectedMenu,
  setSelectedMenu,
  currentCommunication,
  setCurrentCommunication,
  setCurrentMenu,
}: MessageMenuProps) => {
  const {
    communicationMembersByFamily,
    setCommunicationMembersByFamily,
    communications,
    setCommunications,
    user,
    selectedMembers,
  } = useContext(CurrentUserContext);

  const [unreadMessages, setUnreadMessages] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [allCommunicationsFamily, setAllCommunicationsFamily] = useState<
    ICommunicationMember[]
  >([]);
  const [communicationsFamilyUnread, setCommunicationsFamilyUnread] = useState<
    ICommunicationMember[]
  >([]);
  const [trashCommunications, setTrashCommunications] = useState<ICommunicationMember[]>(
    [],
  );

  const handleSelectedMenu = (number: number) => {
    setSelectedMenu(number);
    setSelectedMessage({
      id: 0,
      idFamilyMember: 0,
      idFamily: 0,
      idActivity: 0,
      idCommunication: 0,
      isOpened: 0,
      isTrashed: 0,
      isBanner: 0,
    });
    setCurrentCommunication({
      id: 0,
      object: '',
      content: '',
      date: '',
      idAdmin: 1,
    });
  };

  useEffect(() => {
    selectedMenu === 1
      ? setCurrentMenu(communicationsFamilyUnread)
      : selectedMenu === 2
      ? setCurrentMenu(allCommunicationsFamily)
      : selectedMenu === 3 && setCurrentMenu(trashCommunications);
  }, [
    selectedMenu,
    communicationsFamilyUnread,
    allCommunicationsFamily,
    trashCommunications,
  ]);

  useEffect(() => {
    communications &&
      setCurrentCommunication(
        communications.filter(
          (communication) => communication.id === selectedMessage.idCommunication,
        )[0],
      );
  }, [selectedMessage, currentCommunication]);

  useEffect(() => {
    let urls = [
      `https://pocli-bd.herokuapp.com/api/families/${user.id}/communicationMembers`,
      `https://pocli-bd.herokuapp.com/api/communications`,
    ];
    communications &&
      getAllDataWithCredential(urls)
        .then((res) => {
          setCommunicationMembersByFamily(res[0].data);
          setCommunications(res[1].data);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [currentCommunication]);

  useEffect(() => {
    selectedMembers.length === 0
      ? (setAllCommunicationsFamily(
          communicationMembersByFamily.filter(
            (com) => com.idFamilyMember === null && !com.isTrashed,
          ),
        ),
        setCommunicationsFamilyUnread(
          communicationMembersByFamily.filter(
            (com) => com.idFamilyMember === null && !com.isOpened,
          ),
        ),
        setTrashCommunications(
          communicationMembersByFamily.filter(
            (com) => com.isTrashed && com.idFamilyMember === null,
          ),
        ))
      : selectedMembers[0] !== undefined &&
        (setAllCommunicationsFamily([
          ...new Set(
            selectedMembers.flatMap((member) =>
              communicationMembersByFamily.filter(
                (com) =>
                  (member.id === com.idFamilyMember && !com.isTrashed) ||
                  (com.idFamilyMember === null && !com.isTrashed),
              ),
            ),
          ),
        ]),
        setCommunicationsFamilyUnread([
          ...new Set(
            selectedMembers.flatMap((member) =>
              communicationMembersByFamily.filter(
                (com) =>
                  (member.id === com.idFamilyMember && !com.isOpened) ||
                  (com.idFamilyMember === null && !com.isOpened),
              ),
            ),
          ),
        ]),
        setTrashCommunications([
          ...new Set(
            selectedMembers.flatMap((member) =>
              communicationMembersByFamily.filter(
                (com) =>
                  (member.id === com.idFamilyMember && com.isTrashed) ||
                  (com.idFamilyMember === null && com.isTrashed),
              ),
            ),
          ),
        ]));
  }, [communicationMembersByFamily, selectedMembers]);

  const dataOpened = JSON.stringify({ isOpened: '1' });

  const putOpened = async (idCommunication: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      await axios.put<ICommunicationMember>(
        `https://pocli-bd.herokuapp.com/api/communicationMembers/${idCommunication}`,
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
        if (err.response?.status === 401) {
          setErrorMessage('Error 401');
        }
      } else {
        // pour gérer les erreurs non axios
        if (err instanceof Error) setErrorMessage(err.message);
      }
    }
  };

  const handleSelectedMessage = (communicationMember: ICommunicationMember) => {
    setSelectedMessage(communicationMember);
  };

  useEffect(() => {
    setUnreadMessages(
      allCommunicationsFamily.filter((communication) => communication.isOpened === 0)
        .length,
    );
  }, [allCommunicationsFamily]);

  useEffect(() => {
    selectedMessage.id && putOpened(selectedMessage.id);
  }, [selectedMessage]);
  return (
    <div className="messagingMenuContainer">
      {selectedMenu === 1 && unreadMessages > 0 ? (
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
            {communicationsFamilyUnread.map((comFamily, index) => (
              <div
                onClick={() => handleSelectedMessage(comFamily)}
                role="button"
                onKeyDown={() => handleSelectedMessage(comFamily)}
                tabIndex={0}
                key={index}
                className={
                  selectedMessage.id === comFamily.id
                    ? 'messagingMenuContainer__unreadMessagesDevelopped__messagesBox__messageSelected'
                    : 'messagingMenuContainer__unreadMessagesDevelopped__messagesBox__messages'
                }>
                {communications
                  .filter(
                    (communication) => communication.id === comFamily.idCommunication,
                  )
                  .map((com, index) => (
                    <div key={index}>
                      {comFamily.idFamilyMember !== null ? (
                        <p>{`${transformDate(com.date)} ${com.object}`}</p>
                      ) : (
                        <p style={{ color: '#519642' }}>{`${transformDate(com.date)} ${
                          com.object
                        }`}</p>
                      )}
                      <p>Non lu</p>
                    </div>
                  ))}
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
                onKeyDown={() => handleSelectedMessage(com)}
                tabIndex={0}
                onClick={() => handleSelectedMessage(com)}
                className={
                  selectedMessage.id === com.id
                    ? 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messageSelected'
                    : 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messages'
                }>
                {com.isOpened === 0 ? (
                  <div
                    className={
                      selectedMessage.id === com.id
                        ? 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messageSelected__unreadMessage'
                        : 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messages__unreadMessage'
                    }>
                    {communications
                      .filter((communication) => communication.id === com.idCommunication)
                      .map((comu, index) => (
                        <div key={index}>
                          {com.idFamilyMember !== null ? (
                            <p>{`${transformDate(comu.date)} ${comu.object}`}</p>
                          ) : (
                            <p style={{ color: '#519642' }}>{`${transformDate(
                              comu.date,
                            )} ${comu.object}`}</p>
                          )}
                          <p>Non lu</p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div
                    className={
                      selectedMessage.id === com.id
                        ? 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messageSelected__readedMessage'
                        : 'messagingMenuContainer__allMessagesDevelopped__messagesBox__messages__readedMessage'
                    }>
                    {communications
                      .filter((communication) => communication.id === com.idCommunication)
                      .map((comu, index) => (
                        <div key={index}>
                          {com.idFamilyMember !== null ? (
                            <p>{`${transformDate(comu.date)} ${comu.object}`}</p>
                          ) : (
                            <p style={{ color: '#519642' }}>{`${transformDate(
                              comu.date,
                            )} ${comu.object}`}</p>
                          )}
                          <p>Lu</p>
                        </div>
                      ))}
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
                onKeyDown={() => handleSelectedMessage(commu)}
                tabIndex={0}
                onClick={() => handleSelectedMessage(commu)}
                className={
                  selectedMessage.id === commu.id
                    ? 'messagingMenuContainer__trashDevelopped__messagesBox__messageSelected'
                    : 'messagingMenuContainer__trashDevelopped__messagesBox__messages'
                }>
                {communications
                  .filter((communication) => communication.id === commu.idCommunication)
                  .map((com, index) => (
                    <div key={index}>
                      {commu.idFamilyMember !== null ? (
                        <p>{`${transformDate(com.date)} ${com.object}`}</p>
                      ) : (
                        <p style={{ color: '#519642' }}>{`${transformDate(com.date)} ${
                          com.object
                        }`}</p>
                      )}
                      <p>Lu</p>
                    </div>
                  ))}
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
