import React from 'react';

import Icon from './Icon';

const Messaging = () => {
  return (
    <div>
      <div className="messagingTitle">“Vous avez un message”</div>
      <div className="messagingContainer">
        <div className="messagingContainer__left">
          <div className="messagingContainer__left__newMessage">Nouveau message</div>
          <div className="messagingContainer__left__menu">
            <p>Changer de boite de réception</p>
            <p>Boite de réception</p>
            <p>Messages envoyés</p>
            <p>Corbeille</p>
          </div>
        </div>
        <div className="messagingContainer__familyMember">
          <div className="messagingContainer__familyMember__header">
            <p>Eliot</p>
            <div className="messagingContainer__familyMember__header__icons">
              <Icon name="trash" height="40px" color="#3d79af" />
              <Icon name="enveloppe" height="40px" color="#3d79af" />
            </div>
          </div>
          <div className="messagingContainer__familyMember__messagingBox">
            <div className="messagingContainer__familyMember__messagingBox__contact">
              <h1>Contact</h1>
              <ul>
                <li>---</li>
                <li>---</li>
                <li>---</li>
                <li>---</li>
              </ul>
            </div>
            <div className="messagingContainer__familyMember__messagingBox__object">
              <h1>Objet</h1>
              <ul>
                <li>---</li>
                <li>---</li>
                <li>---</li>
                <li>---</li>
              </ul>
            </div>
            <div className="messagingContainer__familyMember__messagingBox__date">
              <h1>Date</h1>
              <ul>
                <li>---</li>
                <li>---</li>
                <li>---</li>
                <li>---</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="messagingContainer__family">
          <div className="messagingContainer__family__header">
            <p>Eliot</p>
          </div>
          <div className="messagingContainer__family__messagingBox">
            <div className="messagingContainer__family__messagingBox__contact">
              <h1>Contact</h1>
              <ul>
                <li>---</li>
                <li>---</li>
                <li>---</li>
                <li>---</li>
              </ul>
            </div>
            <div className="messagingContainer__family__messagingBox__object">
              <h1>Objet</h1>
              <ul>
                <li>---</li>
                <li>---</li>
                <li>---</li>
                <li>---</li>
              </ul>
            </div>
            <div className="messagingContainer__family__messagingBox__date">
              <h1>Date</h1>
              <ul>
                <li>---</li>
                <li>---</li>
                <li>---</li>
                <li>---</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
