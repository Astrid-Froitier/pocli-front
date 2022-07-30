import React, { useContext, useEffect, useState } from 'react';
import { getAllDataWithCredential } from '../../helpers/axios';

import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IFamilyMember from '../interfaces/IFamilyMember';
import Icon from './Icon';

const FamilyMembers = () => {
  const {
    familyMembers,
    cardSelected,
    setCardSelected,
    setSelectedMembers,
    selectedMembers,
  } = useContext(CurrentUserContext);
  const { documents } = useContext(CurrentDataContext);

  // function to select only one member of the family with a map. If the key is egal to the index don't select the card else select it.
  function selectMember(index: number) {
    setCardSelected(cardSelected.map((card, key) => (key === index ? !card : card)));
  }

  useEffect(() => {
    const membersSelected: IFamilyMember[] = [];
    cardSelected && localStorage.setItem('cardSelected', JSON.stringify(cardSelected));
    cardSelected.map((card, index) => card && membersSelected.push(familyMembers[index]));
    setSelectedMembers(membersSelected);
  }, [cardSelected, familyMembers]);

  return (
    <div className="familyMembers">
      {/* map to show all members in the family */}
      {familyMembers &&
        familyMembers.map((familyMember, index) => (
          <div className="familyMembers__card" key={index}>
            <img
              src={
                familyMember.avatar
                  ? `${familyMember.avatar}`
                  : !familyMember.avatar && documents && documents.length > 1
                  ? `${documents[index].url}`
                  : 'assets/nopicture.png'
              }
              alt="avatar"
            />
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
                  <Icon name="square-nocheck" width="20px" height="20px" color="white" />
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FamilyMembers;
