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
    selectedMembers,
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
    ];

    getAllDataWithCredential(urls)
      .then((res) => {
        setLinkedDocumentsByFamily(res[0].data);
        setDocuments(res[1].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(selectedDocument);

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
            {!cardSelected.includes(true) && <p>Aucun membre sélectionné</p>}
            {cardSelected.includes(false) && cardSelected.includes(true) ? (
              <p>
                Filtre :
                {selectedMembers[0] !== undefined &&
                  selectedMembers.map((member, index) =>
                    index !== selectedMembers.length - 1 ? (
                      <span key={index}> {member.firstname},</span>
                    ) : (
                      <span key={index}> {member.firstname}</span>
                    ),
                  )}
              </p>
            ) : (
              !cardSelected.includes(false) && <p>Filtre : Toute la famille</p>
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
