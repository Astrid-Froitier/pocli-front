import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from './Icon';

const ComeBackHome = ({
  type = 'comeBackHome',
  text = 'Revenir à la page d’accueil',
}) => {
  return (
    <div>
      <NavLink to="/" className={type}>
        <h1 className="comeBackHome__title">{text}</h1>
        <div className="comeBackHome__arrow">
          <Icon name="arrow-left" width="25px" height="25px" color="white" />
        </div>
      </NavLink>
    </div>
  );
};

export default ComeBackHome;
