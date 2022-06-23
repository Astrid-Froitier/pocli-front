import React from 'react';

import { crewDev } from '../../data/Xcrew';

const familyMembers = () => {
  return (
    <div>
      <div>
        {crewDev.map((crew, index) => (
          <div key={index}>
            <img src={crew.image} alt="équipe dev" />
            <p>{crew.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default familyMembers;
