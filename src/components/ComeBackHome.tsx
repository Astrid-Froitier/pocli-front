import React from 'react';
import Icon from './Icon';

const ComeBackHome = () => {
  return (
    <div className="comeBackHome">
      <h1 className="comeBackHome__title">Revenir à la page d’accueil</h1>
      <div className="comeBackHome__arrow">
        <Icon name="arrow-left" />
      </div>
    </div>
  );
};

export default ComeBackHome;
