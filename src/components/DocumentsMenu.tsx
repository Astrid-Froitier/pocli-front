import React, { useContext, useEffect, useState } from 'react';
import { getAllDataWithCredential } from '../../helpers/axios';
import dateNowToDate from '../../helpers/dateNowToDate';
import {transformDate} from '../../helpers/transformDate';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IDocument from '../interfaces/IDocument';
import ILinkedDocument from '../interfaces/ILinkedDocument';
import { DocumentsMenuProps } from './Documents';

import Icon from './Icon';
const d = new Date(Date.now());
const DocumentsMenu = ({
  selectedDocument,
  setSelectedDocument,
  currentDocument,
  setCurrentDocument,
}: DocumentsMenuProps) => {
  const { linkedDocuments, setLinkedDocuments, documents, setDocuments } =
    useContext(CurrentDataContext);

  const { user, cardSelected, communicationMembersByFamily } =
    useContext(CurrentUserContext);

  const [selectedMenu, setSelectedMenu] = useState(0);
  const handleSelectedMenu = (number: number) => {
    setSelectedMenu(number);
  };
  const [unreadDocuments, setUnreadDocuments] = useState<number>(0);

  const [allDocumentsFamily, setAllDocumentsFamily] = useState<ILinkedDocument[]>([]);
  const [documentsFamilyUnread, setDocumentsFamilyUnread] = useState<ILinkedDocument[]>(
    [],
  );
  const [trashDocuments, setTrashDocuments] = useState<ILinkedDocument[]>([]);

  useEffect(() => {
    let urls = [
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/linkedDocuments`,
      `https://wild-pocli.herokuapp.com/api/documents`,
    ];
    documents &&
      getAllDataWithCredential(urls)
        .then((res) => {
          setLinkedDocuments(res[0].data);
          setDocuments(res[1].data);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [user]);

  useEffect(() => {
    setAllDocumentsFamily(linkedDocuments.filter((doc) => doc.isTrashed === 0)),
      setDocumentsFamilyUnread(linkedDocuments.filter((doc) => doc.isOpened === 0)),
      setTrashDocuments(linkedDocuments.filter((doc) => doc.isTrashed));
  }, [linkedDocuments]);

  useEffect(() => {
    linkedDocuments[0].id &&
      linkedDocuments
        .filter((doc) => !doc.isOpened)
        .map((doc, index) => doc && setUnreadDocuments(index + 1));
  }, [linkedDocuments]);

  const handleSelectedDocument = (document: ILinkedDocument) => {
    setSelectedDocument(document);
  };

  console.log(allDocumentsFamily, documentsFamilyUnread, trashDocuments);
  return (
    <div className="documentsMenuContainer">
      {selectedMenu === 1 ? (
        <div className="documentsMenuContainer__unreadDocumentsDevelopped">
          <div
            role="button"
            onKeyDown={() => handleSelectedMenu(0)}
            tabIndex={0}
            className="documentsMenuContainer__unreadDocumentsDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="document-notification" width="40px" color="white" />
            <p>
              {unreadDocuments > 1 ? 'Documents non lus' : 'Document non lu'} -
              <span> {unreadDocuments}</span>
            </p>
          </div>
          <div className="documentsMenuContainer__unreadDocumentsDevelopped__documentsBox">
            {documentsFamilyUnread.map((docFamily, index) => (
              <div
                onClick={() => handleSelectedDocument(docFamily)}
                role="button"
                onKeyDown={() => handleSelectedDocument(docFamily)}
                tabIndex={0}
                key={index}
                className={
                  selectedDocument.id === docFamily.id
                    ? 'documentsMenuContainer__unreadDocumentsDevelopped__documentsBox__documentSelected'
                    : 'documentsMenuContainer__unreadDocumentsDevelopped__documentsBox__documents'
                }>
                <div key={index}>
                  <p>{`${
                    docFamily.date !== null
                      ? transformDate(docFamily.date)
                      : dateNowToDate(d)
                  } ${documents
                    .filter((document) => document.id === docFamily.idDocument)
                    .map((doc) => doc.name)}`}</p>
                  <p>Non lu</p>
                </div>
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
          className="documentsMenuContainer__unreadDocuments">
          <Icon name="document-notification" width="40px" color="#3D79AF" />
          <p>
            {unreadDocuments > 1 ? 'Documents non lus' : 'Document non lu'} -
            <span> {unreadDocuments}</span>
          </p>
        </div>
      )}
      {selectedMenu === 2 ? (
        <div className="documentsMenuContainer__allDocumentsDevelopped">
          <div
            role="button"
            onKeyDown={() => handleSelectedMenu(0)}
            tabIndex={0}
            className="documentsMenuContainer__allDocumentsDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="documents" width="40px" color="white" />
            <p>Tous les documents</p>
          </div>
          <div className="documentsMenuContainer__allDocumentsDevelopped__documents"></div>
        </div>
      ) : (
        <div
          role="button"
          onKeyDown={() => handleSelectedMenu(2)}
          tabIndex={0}
          onClick={() => handleSelectedMenu(2)}
          className="documentsMenuContainer__allDocuments">
          <Icon name="documents" width="40px" color="#3D79AF" />
          <p>Tous les documents</p>
        </div>
      )}
      {selectedMenu === 3 ? (
        <div className="documentsMenuContainer__trashDevelopped">
          <div
            role="button"
            onKeyDown={() => handleSelectedMenu(0)}
            tabIndex={0}
            className="documentsMenuContainer__trashDevelopped__title"
            onClick={() => handleSelectedMenu(0)}>
            <Icon name="trash-can" width="40px" color="white" />
            <p>Corbeille</p>
          </div>
          <div className="documentsMenuContainer__trashDevelopped__documents"></div>
        </div>
      ) : (
        <div
          role="button"
          onKeyDown={() => handleSelectedMenu(3)}
          tabIndex={0}
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
