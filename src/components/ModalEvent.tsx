import React, { useContext } from 'react';

import CurrentModalContext from '../contexts/CurrentModal';
import IEvent from '../interfaces/IEvent';
import EventCard from './EventCard';

interface BannerProps {
  event: IEvent;
}

const ModalEvent = ({ event }: BannerProps) => {
  const { setModalOnOff } = useContext(CurrentModalContext);
  return (
    <div className="modalEvent">
      <div
        className="modalEvent__overlay"
        onClick={() => setModalOnOff('')}
        onKeyDown={() => setModalOnOff('')}
        role="button"
        tabIndex={0}></div>
      <div className="modalEvent__content">
        <EventCard event={event} modalEvent={true} />
        <div className="modalEvent__content__test"></div>
      </div>
    </div>
  );
};

export default ModalEvent;
