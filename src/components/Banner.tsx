import React from 'react';

// import events from '../../data/Xevents';
// import IBanner from '../interfaces/IBanner';
import IEvent from '../interfaces/IEvent';
import EventCard from './EventCard';
import Icon from './Icon';

interface BannerProps {
  event?: IEvent;
  nameBannerActivity?: string;
  title: string;
  nameIcon?: string;
  bannerAbout?: boolean;
  bannerEvent?: boolean;
  bannerMember?: boolean;
  memberFilter?: boolean;
}

const Banner = ({
  nameBannerActivity = '',
  title,
  nameIcon = '',
  bannerAbout = false,
  bannerEvent = false,
  bannerMember = false,
  memberFilter = false,
  event,
}: BannerProps) => {
  return (
    <div className={`banner ${nameBannerActivity}`}>
      <h1>{title}</h1>
      <div className="box">
        {!bannerAbout && !bannerEvent && !bannerMember && !memberFilter && (
          <Icon name={nameIcon} />
        )}
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
        {bannerEvent && event && (
          <div className="box__event">
            <EventCard event={event} bannerEvent={bannerEvent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
