import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUser';

import Banner from './Banner';

const AdherentSpace = () => {
  const { id } = useContext(CurrentUserContext);
  console.log(id);

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
          <NavLink to="/messaging">
            <p>
              Mes messages - <span>3</span> non lu(s)
            </p>
          </NavLink>
          <p>
            Mes documents - <span>0</span> non lu(s)
          </p>
        </div>
        <div className="adherentSpaceContainer__right">
          <h1>Mon compte</h1>
          <p>Mes informations</p>
          <p>Changer mon mot de passe</p>
          <NavLink to="/contact">
            <p>Nous contacter</p>
          </NavLink>
          <p className="adherentSpaceContainer__right__disconnection">Me déconnecter</p>
        </div>
      </div>
    </div>
  );
};

export default AdherentSpace;
