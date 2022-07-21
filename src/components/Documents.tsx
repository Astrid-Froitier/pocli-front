import React, { useContext, useEffect } from 'react';

import { getAllDataWithCredential } from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import DocumentsCard from './DocumentCard';
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
    // familyMembers,
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
  } = useContext(CurrentUserContext);

  const { setDocuments } = useContext(CurrentDataContext);

  useEffect(() => {
    let urls = [
      `https://wild-pocli.herokuapp.com/api/families/${user.id}`,
      `https://wild-pocli.herokuapp.com/api/cities/`,
      `https://wild-pocli.herokuapp.com/api/recipients/`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/familyMembers`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/paymentRecords`,
      `https://wild-pocli.herokuapp.com/api/paymentMethods`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/communicationMembers`,
      `https://wild-pocli.herokuapp.com/api/communications`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/linkedDocuments`,
      `https://wild-pocli.herokuapp.com/api/documents`,
      `https://wild-pocli.herokuapp.com/api/familyMemberEvents`,
    ];

    getAllDataWithCredential(urls)
      .then((res) => {
        setFamily(res[0].data);
        setCities(res[1].data);
        setRecipients(res[2].data);
        setFamilyMembers(res[3].data);
        setPaymentRecordsByFamily(res[4].data);
        setPaymentMethods(res[5].data);
        setCommunicationMembersByFamily(res[6].data);
        setCommunications(res[7].data);
        setLinkedDocumentsByFamily(res[8].data);
        setDocuments(res[9].data);
        setFamilyMemberEvents(res[10].data);
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
            <p>Filtre :</p>
          </div>
          <div className="documentsContainer__header__right">
            <ComeBackHome link="/adherent-space" text="Revenir à l'espace adhérent" />
          </div>
        </div>
        <div className="documentsContainer__content">
          <div className="documentsContainer__content__left">
            <DocumentsMenu />
          </div>
          <div className="documentsContainer__content__right">
            <DocumentsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
