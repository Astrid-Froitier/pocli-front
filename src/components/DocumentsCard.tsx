import axios from 'axios';
import React, { useState } from 'react';
import IDocument from '../interfaces/IDocument';
import ILinkedDocument from '../interfaces/ILinkedDocument';
import Icon from './Icon';
import Fancybox from './Fancybox';

interface DocumentsCardProps {
  selectedDocument: ILinkedDocument;
  setSelectedDocument: React.Dispatch<React.SetStateAction<ILinkedDocument>>;
  currentDocument: IDocument;
  setCurrentDocument: React.Dispatch<React.SetStateAction<IDocument>>;
  currentMenu: ILinkedDocument[];
}

const DocumentsCard = ({
  setSelectedDocument,
  selectedDocument,
  currentDocument,
  setCurrentDocument,
  currentMenu,
}: DocumentsCardProps) => {
  const [document, setDocument] = useState<IDocument>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleselectedDocument = (direction: string) => {
    selectedDocument && direction === 'left' && currentMenu[0] !== selectedDocument
      ? currentMenu.map(
          (com, index) =>
            com.id === selectedDocument.id && setSelectedDocument(currentMenu[index - 1]),
        )
      : selectedDocument &&
        direction === 'right' &&
        currentMenu[currentMenu.length - 1] !== selectedDocument &&
        currentMenu.map(
          (com, index) =>
            com.id === selectedDocument.id && setSelectedDocument(currentMenu[index + 1]),
        );
  };

  const dataTrash = JSON.stringify({ isTrashed: '1' });

  const putTrash = async (idDocument: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      await axios.put<ILinkedDocument>(
        `https://wild-pocli.herokuapp.com/api/linkedDocuments/${idDocument}`,
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

  const deleteDoc = async (idCommunication: number) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      await axios.delete<ILinkedDocument>(
        `https://wild-pocli.herokuapp.com/api/linkedDocuments/${idCommunication}`,
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

  const handleBigger = () => {
    selectedDocument.id !== 0 &&
      currentDocument &&
      currentDocument.idDocumentType !== 11 && (
        <Fancybox>
          <a data-fancybox="gallery" href={currentDocument.url}></a>
        </Fancybox>
      );
  };

  const handleTrash = () => {
    setCurrentDocument({
      id: 0,
      name: '',
      url: '',
      idDocumentType: 0,
    });
    setDocument({
      id: 0,
      name: '',
      url: '',
      idDocumentType: 0,
    });
    selectedDocument && selectedDocument.isTrashed === 0
      ? putTrash(selectedDocument.id)
      : deleteDoc(selectedDocument.id);
  };
  return (
    <div className="documentsCardContainer">
      <div className="documentsCardContainer__header">
        <div className="documentsCardContainer__header__arrows">
          <div onClick={() => handleselectedDocument('left')}>
            <Icon name="arrow-left" width="20px" color="white" />
          </div>
          <div onClick={() => handleselectedDocument('right')}>
            <Icon name="arrow-right" width="20px" color="white" />
          </div>
        </div>
        <div className="documentsCardContainer__header__right">
          {selectedDocument.id !== 0 &&
            currentDocument &&
            currentDocument.idDocumentType !== 11 && (
              <Fancybox>
                <a data-fancybox="gallery" href={currentDocument.url}>
                  <div
                    onClick={() => handleBigger()}
                    className="documentsCardContainer__header__right__bigger">
                    <Icon name="upper-size" width="20px" color="white" />
                  </div>
                </a>
              </Fancybox>
            )}
          <div
            className="documentsCardContainer__header__right__trash"
            onClick={() => handleTrash()}>
            <Icon name="trash-can" width="20px" color="white" />
          </div>
        </div>
      </div>
      <div className="documentsCardContainer__viewer">
        {selectedDocument.id !== 0 &&
        currentDocument &&
        currentDocument.idDocumentType === 1 ? (
          <Fancybox>
            <a data-fancybox="gallery" href={currentDocument.url}>
              <img src={currentDocument.url} alt={currentDocument.name} />
            </a>
          </Fancybox>
        ) : selectedDocument.id !== 0 &&
          currentDocument &&
          currentDocument.idDocumentType === 11 ? (
          <embed
            type="video/webm"
            src={currentDocument.url}
            width="400"
            height="300"></embed>
        ) : selectedDocument.id !== 0 &&
          currentDocument &&
          currentDocument.idDocumentType === 21 ? (
          <Fancybox>
            <a data-fancybox="gallery" href={currentDocument.url}>
              <embed
                type="video/webm"
                src={currentDocument.url}
                width="400"
                height="550"></embed>
            </a>
          </Fancybox>
        ) : (
          selectedDocument.id === 0 && (
            <div className="documentsCardContainer__viewer__none">
              <Icon name="file-exclamation" width="150px" color="#3D79AF" />
              <h1>Vous n’avez pas encore sélectionné de document</h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DocumentsCard;
