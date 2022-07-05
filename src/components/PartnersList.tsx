import React from 'react';

import { partners } from '../../data/Xcrew';

const PartnersList = () => {
  return (
    <div className="partnersContainer">
      <h1>Nos partenaires</h1>
      {/* map de la data des logos pour qu'ils s'affichent directement sur la page */}
      <div className="partnersContainer__imageMapContainer">
        {partners.map((partner, index) => (
          <a href={partner.URL} key={index} target="blank">
            <img src={partner.image} alt={partner.name} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PartnersList;
