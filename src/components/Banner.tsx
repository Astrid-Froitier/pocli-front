import React from 'react';
import IBanner from '../interfaces/IBanner';
import Icon from './Icon';

const Banner = ({
  activity,
  title,
  nameIcon,
  bannerContact = false,
  bannerEvent = false,
  bannerMember = false,
  memberFilter = false,
}: IBanner) => {
  return (
    <div className={`banner ${activity}`}>
      <h1>{title}</h1>
      <div className="box">
        {!bannerContact && !bannerEvent && !bannerMember && <Icon name={nameIcon} />}
      </div>
    </div>
  );
};

export default Banner;
