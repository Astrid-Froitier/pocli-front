import React, { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUser';

import IEvent from '../interfaces/IEvent';
import EventCard from './EventCard';
import FamilyMembers from './FamilyMembers';
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
  handleClick?: React.Dispatch<React.SetStateAction<number>>;
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
  handleClick,
}: BannerProps) => {
  const { setCardSelected, familyMembers, cardSelected } = useContext(CurrentUserContext);

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectNobody, setSelectNobody] = useState<boolean>(false);

  const handleSelectAll = () => {
    setSelectNobody(false);
    setSelectAll(true);
    setCardSelected(familyMembers.map((member) => member && true));
  };
  const handleSelectNobody = () => {
    setSelectAll(false);
    setSelectNobody(true);
    setCardSelected(familyMembers.map((member) => member && false));
  };

  useEffect(() => {
    cardSelected.includes(false) && setSelectAll(false);
    cardSelected.includes(true) && setSelectNobody(false);
  }, [cardSelected]);

  return (
    <div className={`banner ${nameBannerActivity}`}>
      {title && <h1>{title}</h1>}
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
          <div
            role="button"
            className="box__event"
            onClick={() => handleClick!(event.id)}
            onKeyDown={() => handleClick!(event.id)}
            tabIndex={0}>
            <EventCard event={event} bannerEvent={bannerEvent} />
          </div>
        )}
        {bannerMember && (
          <div className="box__members">
            <FamilyMembers />
          </div>
        )}
      </div>
      {bannerMember && (
        <div className="banner__select">
          <div className="banner__select__all">
            <label htmlFor="checkbox">Tout sélectionner : </label>
            <input
              type="checkbox"
              onChange={() => handleSelectAll()}
              checked={selectAll}
            />
          </div>
          <div className="banner__select__nobody">
            <label htmlFor="checkbox">Tout désélectionner : </label>
            <input
              type="checkbox"
              onChange={() => handleSelectNobody()}
              checked={selectNobody}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
