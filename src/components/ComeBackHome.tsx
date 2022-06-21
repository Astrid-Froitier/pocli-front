import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from './Icon';

const ComeBackHome = () => {
  return (
    <div>
      <NavLink to="/" className="comeBackHome">
        <h1 className="comeBackHome__title">Revenir à la page d’accueil</h1>
        <div className="comeBackHome__arrow">
          <Icon name="arrow-left" width="25px" height="25px" color="white" />
        </div>
      </NavLink>
    </div>
  );
};

export default ComeBackHome;
