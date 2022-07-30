import React, { useContext } from 'react';
import CurrentDataContext from '../contexts/CurrentData';

const PartnersList = () => {
  const { partners } = useContext(CurrentDataContext);

  return (
    <div className="partnersContainer">
      <h1>Nos partenaires</h1>
      {/* data map of the logos to display them directly on the page */}
      <div className="partnersContainer__imageMapContainer">
        {partners &&
          partners.map((partner, index) => (
            // link to redirect to the partner site in a new window
            <a href={partner.link} key={index} target="blank">
              <img src={partner.logo} alt={partner.name} />
            </a>
          ))}
      </div>
    </div>
  );
};

export default PartnersList;
