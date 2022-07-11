import React, { useState } from 'react';

import Icon from './Icon';

const DocumentsMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const handleSelectedMenu = (number: number) => {
    setSelectedMenu(number);
  };
  return (
    <div className="documentsMenuContainer">
      {selectedMenu === 1 ? (
        <div className="documentsMenuContainer__unreadDocumentsDevelopped">
          <div
            className="documentsMenuContainer__unreadDocumentsDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="envelope-notification" width="40px" color="white" />
            <p>
              Document(s) non lu(s) - <span> 2</span>
            </p>
          </div>
          <div className="documentsMenuContainer__unreadDocumentsDevelopped__documents"></div>
        </div>
      ) : (
        <div
          onClick={() => handleSelectedMenu(1)}
          className="documentsMenuContainer__unreadDocuments">
          <Icon name="envelope-notification" width="40px" color="#3D79AF" />
          <p>
            Document(s) non lu(s) - <span> 2</span>
          </p>
        </div>
      )}
      {selectedMenu === 2 ? (
        <div className="documentsMenuContainer__allDocumentsDevelopped">
          <div
            className="documentsMenuContainer__allDocumentsDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="envelopes" width="40px" color="white" />
            <p>Tous les documents</p>
          </div>
          <div className="documentsMenuContainer__allDocumentsDevelopped__documents"></div>
        </div>
      ) : (
        <div
          onClick={() => handleSelectedMenu(2)}
          className="documentsMenuContainer__allDocuments">
          <Icon name="envelopes" width="40px" color="#3D79AF" />
          <p>Tous les documents</p>
        </div>
      )}
      {selectedMenu === 3 ? (
        <div className="documentsMenuContainer__trashDevelopped">
          <div
            className="documentsMenuContainer__trashDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="trash-can" width="40px" color="white" />
            <p>Corbeille</p>
          </div>
          <div className="documentsMenuContainer__trashDevelopped__documents"></div>
        </div>
      ) : (
        <div
          onClick={() => handleSelectedMenu(3)}
          className="documentsMenuContainer__trash">
          <Icon name="trash-can" width="40px" color="#3D79AF" />
          <p>Corbeille</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsMenu;
