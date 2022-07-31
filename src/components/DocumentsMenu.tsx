import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import dateNowToDate from '../../helpers/dateNowToDate';
import { transformDate } from '../../helpers/transformDate';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IDocument from '../interfaces/IDocument';
import ILinkedDocument from '../interfaces/ILinkedDocument';
import Icon from './Icon';

interface DocumentsMenuProps {
  selectedDocument: ILinkedDocument;
  setSelectedDocument: React.Dispatch<React.SetStateAction<ILinkedDocument>>;
  currentDocument: IDocument;
  setCurrentDocument: React.Dispatch<React.SetStateAction<IDocument>>;
  setCurrentMenu: React.Dispatch<React.SetStateAction<ILinkedDocument[]>>;
}
const DocumentsMenu = ({
  selectedDocument,
  setSelectedDocument,
  currentDocument,
  setCurrentDocument,
  setCurrentMenu,
}: DocumentsMenuProps) => {
  const { documents, setDocuments } = useContext(CurrentDataContext);
  const d = new Date(Date.now());
  const { user, setLinkedDocumentsByFamily, linkedDocumentsByFamily } =
    useContext(CurrentUserContext);

  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleSelectedMenu = (number: number) => {
    setSelectedMenu(number);
    setSelectedDocument({
      id: 0,
      idFamilyMember: 0,
      idFamily: 0,
      date: '',
      idActivity: 0,
      idDocument: 0,
      isOpened: 0,
      isTrashed: 0,
    });
    setCurrentDocument({
      id: 0,
      name: '',
      url: '',
      idDocumentType: 0,
    });
    number === 1
      ? setCurrentMenu(documentsFamilyUnread)
      : number === 2
      ? setCurrentMenu(allDocumentsFamily)
      : number === 3 && setCurrentMenu(trashDocuments);
  };
  const [unreadDocuments, setUnreadDocuments] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
          setLinkedDocumentsByFamily(res[0].data);
          setDocuments(res[1].data);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [currentDocument]);

  const dataOpened = JSON.stringify({ isOpened: '1' });

  const putOpened = async (idCommunication: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      await axios.put<ILinkedDocument>(
        `https://wild-pocli.herokuapp.com/api/linkedDocuments/${idCommunication}`,
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

  useEffect(() => {
    selectedDocument.id && putOpened(selectedDocument.id);
  }, [selectedDocument]);

  useEffect(() => {
    documents &&
      setCurrentDocument(
        documents.filter((doc) => doc.id === selectedDocument.idDocument)[0],
      );
  }, [selectedDocument, currentDocument]);

  useEffect(() => {
    setAllDocumentsFamily(linkedDocumentsByFamily.filter((doc) => doc.isTrashed === 0)),
      setDocumentsFamilyUnread(
        linkedDocumentsByFamily.filter((doc) => doc.isOpened === 0),
      ),
      setTrashDocuments(linkedDocumentsByFamily.filter((doc) => doc.isTrashed));
  }, [linkedDocumentsByFamily]);

  useEffect(() => {
    linkedDocumentsByFamily
      .filter((doc) => doc.isOpened === 0)
      .map((doc, index) => doc && setUnreadDocuments(index + 1));
  }, [linkedDocumentsByFamily, selectedMenu]);

  const handleSelectedDocument = (document: ILinkedDocument) => {
    setSelectedDocument(document);
  };

  return (
    <div className="documentsMenuContainer">
      {selectedMenu === 1 && unreadDocuments > 0 ? (
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
          <div className="documentsMenuContainer__allDocumentsDevelopped__documentsBox">
            {allDocumentsFamily.map((doc, index) => (
              <div
                key={index}
                role="button"
                onKeyDown={() => handleSelectedDocument(doc)}
                tabIndex={0}
                onClick={() => handleSelectedDocument(doc)}
                className={
                  selectedDocument.id === doc.id
                    ? 'documentsMenuContainer__allDocumentsDevelopped__documentsBox__documentSelected'
                    : 'documentsMenuContainer__allDocumentsDevelopped__documentsBox__documents'
                }>
                {doc.isOpened === 0 ? (
                  <div
                    className={
                      selectedDocument.id === doc.id
                        ? 'documentsMenuContainer__allDocumentsDevelopped__documentsBox__documentSelected__unread'
                        : 'documentsMenuContainer__allDocumentsDevelopped__documentsBox__documents__unread'
                    }>
                    <p>{`${
                      doc.date !== null ? transformDate(doc.date) : dateNowToDate(d)
                    } ${documents
                      .filter((document) => document.id === doc.idDocument)
                      .map((doc) => doc.name)}`}</p>
                    <p>Non lu</p>
                  </div>
                ) : (
                  <div
                    className={
                      selectedDocument.id === doc.id
                        ? 'documentsMenuContainer__allDocumentsDevelopped__documentsBox__documentSelected__readed'
                        : 'documentsMenuContainer__allDocumentsDevelopped__documentsBox__documents__readed'
                    }>
                    <div key={index}>
                      <p>{`${
                        doc.date !== null ? transformDate(doc.date) : dateNowToDate(d)
                      } ${documents
                        .filter((document) => document.id === doc.idDocument)
                        .map((doc) => doc.name)}`}</p>
                      <p>Lu</p>
                    </div>
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
          <div className="documentsMenuContainer__trashDevelopped__documentsBox">
            {trashDocuments.map((doc, index) => (
              <div
                key={index}
                role="button"
                onKeyDown={() => handleSelectedDocument(doc)}
                tabIndex={0}
                onClick={() => handleSelectedDocument(doc)}
                className={
                  selectedDocument.id === doc.id
                    ? 'documentsMenuContainer__trashDevelopped__documentsBox__documentSelected'
                    : 'documentsMenuContainer__trashDevelopped__documentsBox__documents'
                }>
                <div key={index}>
                  <p>{`${
                    doc.date !== null ? transformDate(doc.date) : dateNowToDate(d)
                  } ${documents
                    .filter((document) => document.id === doc.idDocument)
                    .map((doc) => doc.name)}`}</p>
                  <p>Lu</p>
                </div>
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
          className="documentsMenuContainer__trash">
          <Icon name="trash-can" width="40px" color="#3D79AF" />
          <p>Corbeille</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsMenu;
