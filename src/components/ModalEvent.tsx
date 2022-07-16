import React, { useEffect, useState } from 'react';

import IEvent from '../interfaces/IEvent';
import EventCard from './EventCard';
import Icon from './Icon';

interface BannerProps {
  event: IEvent;
  setModalOnOff: React.Dispatch<React.SetStateAction<string>>;
}

const ModalEvent = ({ event, setModalOnOff }: BannerProps) => {
  const [signUp, setSignUp] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(false);
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
          {!signUp && (
            <div
              className="modalEvent__box__header__sign-up"
              role="button"
              tabIndex={0}
              onClick={() => setSignUp(true)}>
              <div className="modalEvent__box__header__sign-up__user-plus">
                <Icon name={'user-plus'} height={'30px'} color={'white'} />
              </div>
              <span>S'inscrire</span>
            </div>
          )}
          {signUp && (
            <select
              className="modalEvent__box__header__sign-up"
              onChange={(e) => console.log(e.target.value)}>
              <option value="Fred">Fred</option>
              <option value="Jean">Jean</option>
              <option value="Alfred">Alfred</option>
              <option value="Jose">Jose</option>
              <div className="modalEvent__box__header__sign-up__user-plus">
                <Icon name={'user-plus'} height={'30px'} color={'white'} />
              </div>
            </select>
          )}
          <div className="modalEvent__box__header__unsubscribe">
            <div
              className="modalEvent__box__header__unsubscribe__user-minus"
              role="button"
              // onClick={() => setModalOnOff('')}
              // onKeyDown={() => setModalOnOff('')}
              tabIndex={0}>
              <Icon name={'user-minus'} height={'30px'} color={'white'} />
            </div>
            <span>Se désinscrire</span>
          </div>
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
