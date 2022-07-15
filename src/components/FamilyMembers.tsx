import React, { useContext, useEffect, useState } from 'react';

import { members } from '../../data/Xcrew';
import CurrentUserContext from '../contexts/CurrentUser';
import Icon from './Icon';

const FamilyMembers = () => {
  const [cardSelected, setCardSelected] = useState<boolean[]>([]);
  const { familyMembers } = useContext(CurrentUserContext);

  useEffect(() => {
    setCardSelected(members.map(() => true));
  }, []);

  // function to select only one member of the family with a map. If the key is egal to the index don't select the card else select it.
  function selectMember(index: number) {
    setCardSelected(cardSelected.map((card, key) => (key === index ? !card : card)));
  }

  return (
    <div className="familyMembers">
      {/* map to show all members in the family */}
      {familyMembers.map(
        (familyMember, index) =>
          familyMember.avatar && (
            <div className="familyMembers__card" key={index}>
              <img src={familyMember.avatar} alt="équipe dev" />
              <div className="familyMembers__card__name">
                <p>{familyMember.firstname}</p>
                {/* button to select one member in family */}

                <div
                  className="familyMembers__card__name__square"
                  onClick={() => selectMember(index)}
                  aria-hidden="true">
                  {cardSelected[index] ? (
                    <Icon name="square-check" width="20px" height="20px" color="white" />
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
  );
};

export default FamilyMembers;
