import React from 'react';

import { partners } from '../../data/Xcrew';

const partnersList = () => {
  return (
    <div>
      <div className="partnersContainer">
        <h1>Nos partenaires</h1>
        {/* map de la data des logos pour qu'ils s'affichent directement sur la page */}
        <div className="partnersContainer__imageMapContainer">
          {partners.map((partner, index) => (
            <img src={partner.image} alt="logo" key={index} height={100} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default partnersList;
