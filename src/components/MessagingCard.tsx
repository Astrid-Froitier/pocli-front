import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import transformDate from '../../helpers/transformDate';
import CurrentUserContext from '../contexts/CurrentUser';
import IAdmin from '../interfaces/IAdmin';
import ICommunication from '../interfaces/ICommunication';
import ICommunicationMember from '../interfaces/ICommunicationMember';
import Icon from './Icon';
import { MessageCardProps } from './Messaging';

const MessagingCard = ({
  setSelectedMessage,
  selectedMessage,
  currentMenu,
  trashCom,
  setTrashCom,
}: MessageCardProps) => {
  const {
    communicationMembersByFamily,
    setCommunicationMembersByFamily,
    communications,
    setCommunications,
    user,
  } = useContext(CurrentUserContext);
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
      setTrashCom(trashCom + 1);
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
    currentMenu.length !== -1 &&
      selectedMessage !== -1 &&
      setMessage(
        communications.find((com) => com.id === currentMenu[selectedMessage].id),
      );
  }, [selectedMessage]);

  useEffect(() => {
    setIdAdmin(message && message.idAdmin);
  }, [message]);

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
  }, [idAdmin]);

  const handleSelectedMessage = (direction: string) => {
    selectedMessage > 0 && direction === 'left'
      ? setSelectedMessage(selectedMessage - 1)
      : selectedMessage >= 0 &&
        selectedMessage < currentMenu.length - 1 &&
        direction === 'right' &&
        setSelectedMessage(selectedMessage + 1);
  };

  const handleTrash = () => {
    setTrashCom(trashCom + 1);
    currentMenu.length !== -1 &&
    selectedMessage !== -1 &&
    communicationMembersByFamily.find(
      (com) => com.idCommunication === currentMenu[selectedMessage].id,
    )?.isTrashed === 0
      ? putTrash(
          communicationMembersByFamily.find(
            (com) => com.idCommunication === currentMenu[selectedMessage].id,
          )?.id!,
        )
      : deleteCom(
          communicationMembersByFamily.find(
            (com) => com.idCommunication === currentMenu[selectedMessage].id,
          )?.id!,
        );
  };

  return (
    <div className="messagingCardContainer">
      <div className="messagingCardContainer__header">
        <div className="messagingCardContainer__header__left">
          <p>
            {admin ? (
              <span>
                De : {admin.firstname} {admin.lastname}
              </span>
            ) : (
              <span>De : </span>
            )}
          </p>
          <p>
            <span>Envoyé le : {message && transformDate(message?.date)}</span>
          </p>
        </div>
        <div className="messagingCardContainer__header__right">
          <div onClick={() => handleSelectedMessage('left')}>
            <Icon name="arrow-left" width="20px" color="#3D79AF" />
          </div>
          <div onClick={() => handleSelectedMessage('right')}>
            <Icon name="arrow-right" width="20px" color="#3D79AF" />
          </div>
          <div onClick={() => handleTrash()}>
            <Icon name="trash-can" width="20px" color="#3D79AF" />
          </div>
        </div>
      </div>
      <div className="messagingCardContainer__object">
        <p>
          <span>Objet : {message && message.object}</span>
        </p>
      </div>
      <div className="messagingCardContainer__message">
        <p>Message :</p>
        <div className="messagingCardContainer__message__content">
          {message && message.content}
        </div>
      </div>
    </div>
  );
};

export default MessagingCard;
