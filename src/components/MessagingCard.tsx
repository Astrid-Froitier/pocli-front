import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import { transformDate } from '../../helpers/transformDate';
import CurrentUserContext from '../contexts/CurrentUser';
import IAdmin from '../interfaces/IAdmin';
import ICommunication from '../interfaces/ICommunication';
import ICommunicationMember from '../interfaces/ICommunicationMember';
import Icon from './Icon';

interface MessageCardProps {
  selectedMessage: ICommunicationMember;
  setSelectedMessage: React.Dispatch<React.SetStateAction<ICommunicationMember>>;
  currentCommunication: ICommunication;
  setCurrentCommunication: React.Dispatch<React.SetStateAction<ICommunication>>;
  currentMenu: ICommunicationMember[];
}

const MessagingCard = ({
  setSelectedMessage,
  selectedMessage,
  currentCommunication,
  setCurrentCommunication,
  currentMenu,
}: MessageCardProps) => {
  const { communications, selectedMembers } = useContext(CurrentUserContext);
  const [idAdmin, setIdAdmin] = useState<number>();
  const [admin, setAdmin] = useState<IAdmin>();
  const [message, setMessage] = useState<ICommunication>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dataTrash = JSON.stringify({ isTrashed: '1' });

  const putTrash = async (idCommunication: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      await axios.put<ICommunicationMember>(
        `https://wild-pocli.herokuapp.com/api/communicationMembers/${idCommunication}`,
        dataTrash,
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
        console.log(errorMessage);
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

  useEffect(() => {
    selectedMessage &&
      setMessage(
        communications.find((com) => com.id === selectedMessage.idCommunication),
      );
  }, [selectedMessage]);

  useEffect(() => {
    setIdAdmin(currentCommunication && currentCommunication.idAdmin);
  }, [currentCommunication]);

  useEffect(() => {
    let url = [`https://wild-pocli.herokuapp.com/api/admins/${idAdmin}`];
    idAdmin &&
      getAllDataWithCredential(url)
        .then((res) => {
          setAdmin(res[0].data);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [currentCommunication]);

  const handleSelectedMessage = (direction: string) => {
    currentMenu[0] !== undefined &&
    selectedMessage !== undefined &&
    direction === 'left' &&
    currentMenu[0].id !== selectedMessage.id
      ? currentMenu.map(
          (com, index) =>
            com.id === selectedMessage.id && setSelectedMessage(currentMenu[index - 1]),
        )
      : currentMenu[0] !== undefined &&
        selectedMessage !== undefined &&
        direction === 'right' &&
        currentMenu[currentMenu.length - 1].id !== selectedMessage.id &&
        currentMenu.map(
          (com, index) =>
            com.id === selectedMessage.id && setSelectedMessage(currentMenu[index + 1]),
        );
  };

  const handleTrash = () => {
    setCurrentCommunication({
      id: 0,
      object: '',
      content: '',
      date: '',
      idAdmin: 1,
    });
    setMessage({
      id: 0,
      object: '',
      content: '',
      date: '',
      idAdmin: 1,
    });
    selectedMessage && selectedMessage.isTrashed === 0
      ? putTrash(selectedMessage.id)
      : deleteCom(selectedMessage.id);
  };

  return (
    <div className="messagingCardContainer">
      <div className="messagingCardContainer__header">
        <div className="messagingCardContainer__header__left">
          {message?.content ? (
            <p>
              De :{' '}
              <span>
                {admin?.firstname} {admin?.lastname}
              </span>
            </p>
          ) : (
            <p>De :</p>
          )}
          <p>
            Envoyé le : <span>{message && transformDate(message?.date)}</span>
          </p>
          <p>
            A :
            {selectedMessage &&
            selectedMembers[0] !== undefined &&
            selectedMessage.idFamilyMember !== null ? (
              selectedMembers
                .filter((member) => selectedMessage.idFamilyMember === member.id)
                .map((memberSelected, index) => (
                  <span key={index}> {memberSelected.firstname}</span>
                ))
            ) : (
              <span style={{ color: '#519642' }}> La famille</span>
            )}
          </p>
        </div>
        <div className="messagingCardContainer__header__right">
          <div
            tabIndex={0}
            role="button"
            onClick={() => handleSelectedMessage('left')}
            onKeyDown={() => handleSelectedMessage('left')}>
            <Icon name="arrow-left" width="20px" color="#3D79AF" />
          </div>
          <div
            tabIndex={0}
            role="button"
            onClick={() => handleSelectedMessage('right')}
            onKeyDown={() => handleSelectedMessage('right')}>
            <Icon name="arrow-right" width="20px" color="#3D79AF" />
          </div>
          <div
            tabIndex={0}
            role="button"
            onClick={() => handleTrash()}
            onKeyDown={() => handleTrash()}>
            <Icon name="trash-can" width="20px" color="#3D79AF" />
          </div>
        </div>
      </div>
      <div className="messagingCardContainer__object">
        <p>
          Objet : <span>{message && message.object}</span>
        </p>
      </div>
      <div className="messagingCardContainer__message">
        <p>Message :</p>
        {message ? (
          <div className="messagingCardContainer__message__content">
            {message.content}
          </div>
        ) : (
          <div className="messagingCardContainer__message__contentNone">
            <Icon name="envelope-exclamation" width="150px" color="#3D79AF" />
            <h1>Vous n’avez pas encore sélectionné de message</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingCard;
