import React from 'react';

import { crewDev } from '../../data/Xcrew';

const FamilyMembers = () => {
  return (
    <div>
      <div className="familyMembers">
        {crewDev.map(
          (crew, index) =>
            crew.image && (
              <div className="familyMembers__card" key={index}>
                <img src={crew.image} key={index} alt="équipe dev" />
                <div className="familyMembers__card__name">
                  <p>{crew.name}</p>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default FamilyMembers;
