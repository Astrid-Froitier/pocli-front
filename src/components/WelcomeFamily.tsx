import React from 'react';

import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import { NavLink } from 'react-router-dom';

const WelcomeFamily = () => {
  return (
    <div>
      <Banner
        nameBannerActivity=""
        title="Bienvenue à vous famille WildCodeSchool !"
        nameIcon=""
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={false}
      />
      <div className="welcomeFamilyContainer">
        <div className="welcomeFamilyContainer__left">
          <div className="welcomeFamilyContainer__left__comeBack">
            <ComeBackHome type={'bigComeBackHome'} text={"Retour à l'accueil"} />
          </div>
        </div>
        <div className="welcomeFamilyContainer__right">
          <h1>Raccourcis vers mon espace</h1>
          <NavLink to="/adherentSpace">
            <p>Mon espace adhérent</p>
          </NavLink>
          <p>Mes évènements</p>
          <p>Ma messagerie</p>
          <p>Mes documents</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeFamily;
