import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import transformDate from '../../helpers/transformDate';
import CurrentUserContext from '../contexts/CurrentUser';
import IAdmin from '../interfaces/IAdmin';
import Icon from './Icon';
import { MessageProps } from './MessagingMenu';

const MessagingCard = ({ openedMessage }: MessageProps) => {
  const { communications } = useContext(CurrentUserContext);
  const [idAdmin, setIdAdmin] = useState<number>();
  const [admin, setAdmin] = useState<IAdmin>();
  const message = communications.find((com) => com.id === openedMessage);

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
          <Icon name="arrow-left" width="20px" color="#3D79AF" />
          <Icon name="arrow-right" width="20px" color="#3D79AF" />
          <Icon name="trash-can" width="20px" color="#3D79AF" />
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
