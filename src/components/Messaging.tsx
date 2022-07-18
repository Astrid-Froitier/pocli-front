import React, { useEffect } from 'react';

import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import MessagingCard from './MessagingCard';
import MessagingMenu from './MessagingMenu';

const Messaging = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner
        nameBannerActivity=""
        title="Ma messagerie"
        nameIcon=""
        memberFilter={true}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={true}
      />
      <div className="messagingContainer">
        <div className="messagingContainer__header">
          <div className="messagingContainer__header__left">
            <p>Filtre :</p>
          </div>
          <div className="messagingContainer__header__right">
            <ComeBackHome />
          </div>
        </div>
        <div className="messagingContainer__content">
          <div className="messagingContainer__content__left">
            <MessagingMenu />
          </div>
          <div className="messagingContainer__content__right">
            <MessagingCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
