import React, { useEffect } from 'react';

import IEvent from '../interfaces/IEvent';
import EventCard from './EventCard';
import Icon from './Icon';

interface BannerProps {
  event: IEvent;
  setModalOnOff: React.Dispatch<React.SetStateAction<string>>;
}

const ModalEvent = ({ event, setModalOnOff }: BannerProps) => {
  // useEffect permettant de libérer le scroll sur Y lorsque le composant se démonte (en cas de changement de page avec la modale ouverte)
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
        <div className="modalEvent__box__header">
          <div
            className="modalEvent__box__header__x-mark"
            role="button"
            onClick={() => setModalOnOff('')}
            onKeyDown={() => setModalOnOff('')}
            tabIndex={0}>
            <Icon name={'xmark'} width={'30px'} color={'#3d79af'} />
          </div>
        </div>
        <div>
          <EventCard event={event} modalEvent={true} />
        </div>
        <div className="modalEvent__box__test"></div>
      </div>
    </div>
  );
};

export default ModalEvent;
