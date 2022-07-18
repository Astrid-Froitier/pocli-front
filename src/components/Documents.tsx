import React, { useEffect } from 'react';

import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import DocumentsCard from './DocumentCard';
import DocumentsMenu from './DocumentsMenu';

const Documents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
            <ComeBackHome />
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
