import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from './Icon';

const ComeBackDashbord = ({
  type = 'comeBackDashboard',
  text = 'Revenir sur mon tableau de bord',
}) => {
  return (
    <div>
      <NavLink to="/adherentSpace" className={type}>
        <h1 className="comeBackDashboard__title">{text}</h1>
        <div className="comeBackDashboard__arrow">
          <Icon name="arrow-left" width="25px" height="25px" color="white" />
        </div>
      </NavLink>
    </div>
  );
};

export default ComeBackDashbord;
