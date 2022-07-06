import React from 'react';

import Banner from './Banner';

const AdherentSpace = () => {
  return (
    <div>
      <Banner
        nameBannerActivity=""
        title="Mon espace adhérent"
        nameIcon=""
        memberFilter={true}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={true}
      />
      <div className="adherentSpaceContainer">
        <div className="adherentSpaceContainer__left">
          <h1>Tableau de bord</h1>
          <p>
            Mes évènements - <span>2</span> à venir
          </p>
          <p>
            Mes messages - <span>3</span> non lu(s)
          </p>
          <p>
            Mes documents - <span>0</span> non lu(s)
          </p>
        </div>
        <div className="adherentSpaceContainer__right">
          <h1>Mon compte</h1>
          <p>Changer mon mot de passe</p>
          <p>Mes cotisations</p>
          <p>Mon statut</p>
          <p>Pour tout autre changement, merci de nous contacter</p>
          <p>Me déconnecter</p>
        </div>
      </div>
    </div>
  );
};

export default AdherentSpace;
