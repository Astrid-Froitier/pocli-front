import React, { useEffect } from 'react';

import IEvent from '../interfaces/IEvent';
import EventCard from './EventCard';

interface BannerProps {
  event: IEvent;
  setModalOnOff: React.Dispatch<React.SetStateAction<string>>;
}

const ModalEvent = ({ event, setModalOnOff }: BannerProps) => {
  // useEffect permettant de libérer le scroll sur x lorsque le composant se démonte (en cas de changement de page avec la modale ouverte)
  useEffect(() => {
    return () => {
      document.documentElement.style.setProperty('overflow-y', 'scroll');
    };
  }, []);

  return (
    <div className="modalEvent">
      <div
        className="modalEvent__overlay"
        onClick={() => setModalOnOff('')}
        onKeyDown={() => setModalOnOff('')}
        role="button"
        tabIndex={0}></div>
      <div className="modalEvent__box">
        <EventCard event={event} modalEvent={true} />
        <div className="modalEvent__box__test"></div>
      </div>
    </div>
  );
};

export default ModalEvent;
