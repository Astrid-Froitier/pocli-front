import React, { useEffect, useState } from 'react';

import { crewDev } from '../../data/Xcrew';
import Icon from './Icon';

const FamilyMembers = () => {
  const [cardSelected, setCardSelected] = useState<Array>([]);

  // to
  useEffect(() => {
    setCardSelected(crewDev.map(() => true));
  }, []);

  console.log(cardSelected);

  // function to select only one member of the family with a map. If the key is egal to the index don't select the card else select it.
  function selectMember(index: number) {
    setCardSelected(
      cardSelected.map((card: string, key: number) => (key == index ? !card : card)),
    );
  }

  return (
    <div>
      <div className="familyMembers">
        {/* map to show all members in the family */}
        {crewDev.map(
          (crew, index) =>
            crew.image && (
              <div className="familyMembers__card" key={index}>
                <img src={crew.image} alt="équipe dev" />
                <div className="familyMembers__card__name">
                  {/* <p>{crew.name}</p> */}
                  <p>{crew.username}</p>
                  {/* button to select one member in family */}

                  <div
                    className="familyMembers__card__name__square"
                    onClick={() => selectMember(index)}
                    aria-hidden="true">
                    {cardSelected[index] ? (
                      <Icon
                        name="square-check"
                        width="35px"
                        height="35px"
                        color="white"
                      />
                    ) : (
                      <Icon
                        name="square-nocheck"
                        width="35px"
                        height="35px"
                        color="white"
                      />
                    )}
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default FamilyMembers;
