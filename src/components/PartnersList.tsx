import React from 'react';

import { partners } from '../../data/Xcrew';

const PartnersList = () => {
  return (
    <div className="partnersContainer">
      <h1>Nos partenaires</h1>
      {/* map de la data des logos pour qu'ils s'affichent directement sur la page */}
      <div className="partnersContainer__imageMapContainer">
        {partners.map((partner, index) => (
          <img src={partner.image} alt={partner.name} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PartnersList;
