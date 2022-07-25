import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IDocument from '../interfaces/IDocument';
import ILinkedDocument from '../interfaces/ILinkedDocument';
import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import DocumentsCard from './DocumentsCard';
import DocumentsMenu from './DocumentsMenu';

export interface DocumentsMenuProps {
  selectedDocument: ILinkedDocument;
  setSelectedDocument: React.Dispatch<React.SetStateAction<ILinkedDocument>>;
  currentDocument: IDocument;
  setCurrentDocument: React.Dispatch<React.SetStateAction<IDocument>>;
  setCurrentMenu: React.Dispatch<React.SetStateAction<ILinkedDocument[]>>;
}

export interface DocumentsCardProps {
  selectedDocument: ILinkedDocument;
  setSelectedDocument: React.Dispatch<React.SetStateAction<ILinkedDocument>>;
  currentDocument: IDocument;
  setCurrentDocument: React.Dispatch<React.SetStateAction<IDocument>>;
  currentMenu: ILinkedDocument[];
}

const Documents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    user,
    // family,
    setFamily,
    // cities,
    setCities,
    // recipients,
    setRecipients,
    familyMembers,
    setFamilyMembers,
    // paymentRecordsByFamily,
    setPaymentRecordsByFamily,
    // paymentMethods,
    setPaymentMethods,
    // communicationMembersByFamily,
    setCommunicationMembersByFamily,
    // communications,
    setCommunications,
    // linkedDocumentsByFamily,
    setLinkedDocumentsByFamily,
    // familyMemberEvents,
    setFamilyMemberEvents,
    cardSelected,
  } = useContext(CurrentUserContext);

  const { setDocuments } = useContext(CurrentDataContext);

  const [currentDocument, setCurrentDocument] = useState<IDocument>({
    id: 0,
    name: '',
    url: '',
    idDocumentType: 0,
  });
  const [selectedDocument, setSelectedDocument] = useState<ILinkedDocument>({
    id: 0,
    idDocument: 0,
    date: '',
    idActivity: 0,
    idEvent: 0,
    idFamilyMember: 0,
    idFamily: 0,
    isOpened: 0,
    isTrashed: 0,
  });
  const [currentMenu, setCurrentMenu] = useState<ILinkedDocument[]>([]);

  const [selectedMenu, setSelectedMenu] = useState<number>(0);

  useEffect(() => {
    let urls = [
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/linkedDocuments`,
      `https://wild-pocli.herokuapp.com/api/documents`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/familyMembers`,
    ];

    getAllDataWithCredential(urls)
      .then((res) => {
        setLinkedDocumentsByFamily(res[0].data);
        setDocuments(res[1].data);
        setFamilyMembers(res[2].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Banner
        nameBannerActivity=""
        title="Mes documents"
        nameIcon=""
        memberFilter={true}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={true}
      />
      <div className="documentsContainer">
        <div className="documentsContainer__header">
          <div className="documentsContainer__header__left">
            {cardSelected.includes(false) ? (
              <p>
                Filtre :
                {cardSelected.map((card, index) =>
                  index !== 0 && card ? (
                    <span key={index}>, {familyMembers[index].firstname}</span>
                  ) : (
                    card && <span key={index}> {familyMembers[index].firstname}</span>
                  ),
                )}
              </p>
            ) : (
              <p>Filtre : Toute la famille</p>
            )}
          </div>
          <div className="documentsContainer__header__right">
            <ComeBackHome link="/adherent-space" text="Revenir à l'espace adhérent" />
          </div>
        </div>
        <div className="documentsContainer__content">
          <div className="documentsContainer__content__left">
            <DocumentsMenu
              selectedDocument={selectedDocument}
              setSelectedDocument={setSelectedDocument}
              currentDocument={currentDocument}
              setCurrentDocument={setCurrentDocument}
              setCurrentMenu={setCurrentMenu}
            />
          </div>
          <div className="documentsContainer__content__right">
            <DocumentsCard
              setSelectedDocument={setSelectedDocument}
              selectedDocument={selectedDocument}
              currentDocument={currentDocument}
              setCurrentDocument={setCurrentDocument}
              currentMenu={currentMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
