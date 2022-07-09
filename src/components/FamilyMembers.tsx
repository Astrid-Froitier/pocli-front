import React, { useEffect, useState } from 'react';

import { members } from '../../data/Xcrew';
import Icon from './Icon';

const FamilyMembers = () => {
  const [cardSelected, setCardSelected] = useState<boolean[]>([]);

  // to display the family members on the component mount
  useEffect(() => {
    setCardSelected(members.map(() => true));
  }, []);

  console.log(cardSelected);

  // function to select only one member of the family with a map. If the key is egal to the index don't select the card else select it.
  function selectMember(index: number) {
    setCardSelected(
      cardSelected.map((card, key) => (key == index ? !card : card)),
    );
  }

  return (
    <div>
      <div className="familyMembers">
        {/* map to show all members in the family */}
        {members.map(
          (member, index) =>
            member.image && (
              <div className="familyMembers__card" key={index}>
                <img src={member.image} alt="équipe dev" />
                <div className="familyMembers__card__name">
                  {/* <p>{member.name}</p> */}
                  <p>{member.username}</p>
                  {/* button to select one member in family */}

                  <div
                    className="familyMembers__card__name__square"
                    onClick={() => selectMember(index)}
                    aria-hidden="true">
                    {cardSelected[index] ? (
                      <Icon
                        name="square-check"
                        width="20px"
                        height="20px"
                        color="white"
                      />
                    ) : (
                      <Icon
                        name="square-nocheck"
                        width="20px"
                        height="20px"
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
