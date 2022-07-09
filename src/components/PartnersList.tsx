import React from 'react';

import { partners } from '../../data/Xcrew';

const PartnersList = () => {
  return (
    <div className="partnersContainer">
      <h1>Nos partenaires</h1>
      {/* data map of the logos to display them directly on the page */}
      <div className="partnersContainer__imageMapContainer">
        {partners.map((partner, index) => (
          // link to redirect to the partner site in a new window
          <a href={partner.URL} key={index} target="blank">
            <img src={partner.image} alt={partner.name} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PartnersList;
