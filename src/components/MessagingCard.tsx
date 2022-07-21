import React from 'react';

import Icon from './Icon';

const MessagingCard = () => {
  return (
    <div className="messagingCardContainer">
      <div className="messagingCardContainer__header">
        <div className="messagingCardContainer__header__left">
          <p>
            <span>De :</span>
          </p>
          <p>
            <span>Envoyé le :</span>
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
          <span>Objet :</span>
        </p>
      </div>
      <div className="messagingCardContainer__message">
        <p>Message :</p>
        <div className="messagingCardContainer__message__content"></div>
      </div>
    </div>
  );
};

export default MessagingCard;
