import React, { useState } from 'react';

import Icon from './Icon';

const MessagingMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const handleSelectedMenu = (number: number) => {
    setSelectedMenu(number);
  };
  return (
    <div className="messagingMenuContainer">
      {selectedMenu === 1 ? (
        <div className="messagingMenuContainer__unreadMessagesDevelopped">
          <div
            className="messagingMenuContainer__unreadMessagesDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="envelope-notification" width="40px" color="white" />
            <p>
              Message(s) non lu(s) - <span> 2</span>
            </p>
          </div>
          <div className="messagingMenuContainer__unreadMessagesDevelopped__messages"></div>
        </div>
      ) : (
        <div
          onClick={() => handleSelectedMenu(1)}
          className="messagingMenuContainer__unreadMessages">
          <Icon name="envelope-notification" width="40px" color="#3D79AF" />
          <p>
            Message(s) non lu(s) - <span> 2</span>
          </p>
        </div>
      )}
      {selectedMenu === 2 ? (
        <div className="messagingMenuContainer__allMessagesDevelopped">
          <div
            className="messagingMenuContainer__allMessagesDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="envelopes" width="40px" color="white" />
            <p>Tous les messages</p>
          </div>
          <div className="messagingMenuContainer__allMessagesDevelopped__messages"></div>
        </div>
      ) : (
        <div
          onClick={() => handleSelectedMenu(2)}
          className="messagingMenuContainer__allMessages">
          <Icon name="envelopes" width="40px" color="#3D79AF" />
          <p>Tous les messages</p>
        </div>
      )}
      {selectedMenu === 3 ? (
        <div className="messagingMenuContainer__trashDevelopped">
          <div
            className="messagingMenuContainer__trashDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="trash-can" width="40px" color="white" />
            <p>Corbeille</p>
          </div>
          <div className="messagingMenuContainer__trashDevelopped__messages"></div>
        </div>
      ) : (
        <div
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
