import React from 'react';

import Icon from './Icon';

interface ActivityCardProps {
  nameActivity: string;
  nameIcon: string;
  title: string;
}

const ActivityCard = ({ nameActivity, nameIcon, title }: ActivityCardProps) => {
  return (
    <div className={`activityCard ${nameActivity}`}>
      <div className={`activityCard__iconTop ${nameActivity}`}>
        <Icon name={nameIcon} color={'white'} />
      </div>
      <h2>{title}</h2>
      <div className={`activityCard__iconBottom ${nameActivity}`}>
        <Icon name={'arrow-right'} width={'49px'} color={'white'} />
      </div>
    </div>
  );
};

export default ActivityCard;
