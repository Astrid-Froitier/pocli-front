import React from 'react';
import IBanner from '../interfaces/IBanner';
import Icon from './Icon';

const Banner = ({
  nameBannerActivity = '',
  title,
  nameIcon = '',
  bannerAbout = false,
  bannerEvent = false,
  bannerMember = false,
  memberFilter = false,
}: IBanner) => {
  return (
    <div className={`banner ${nameBannerActivity}`}>
      <h1>{title}</h1>
      <div className="box">
        {!bannerAbout && !bannerEvent && !bannerMember && <Icon name={nameIcon} />}
        {bannerAbout && (
          <div className="box__about">
            <span>PoCLi,&nbsp;</span>
            <span className="box__about__blue-pocli-text">PO</span>
            <span>ur&nbsp;</span>
            <span className="box__about__green-pocli-text">C</span>
            <span>réer&nbsp;</span>
            <span>du&nbsp;</span>
            <span className="box__about__red-pocli-text">LI</span>
            <span>en</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
