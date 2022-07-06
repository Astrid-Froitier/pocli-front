import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import activities from '../../data/Xactivities';
// import events from '../../data/Xevents';
import postTypes from '../../data/XpostTypes';
import CurrentModalContext from '../contexts/CurrentModal';
import IEvent from '../interfaces/IEvent';
import Banner from './Banner';
import EventCard from './EventCard';
import ModalEvent from './ModalEvent';

const Events = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const { modalOnOff, setModalOnOff } = useContext(CurrentModalContext);
  const [filteredEvent, setFilteredEvent] = useState('');

  // useEffect qui permet de remonter la page en top lorsque le composant se monte
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      // indispensable quand on veut utiliser async/await dans un useEffect
      let url: string = 'http://localhost:3001/api/events';
      try {
        const { data } = await axios.get<IEvent[]>(url);
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    getEvents();
  }, []);

  // useEffect qui permet d'empêcher ou de libérer le scroll sur x suivant l'état de modalOnOff
  useEffect(() => {
    {
      modalOnOff
        ? document.documentElement.style.setProperty('overflow-y', 'hidden')
        : document.documentElement.style.setProperty('overflow-y', 'scroll');
    }
  }, [modalOnOff]);
  // useEffect qui permet de libérer le scroll sur x et d'initialiser la state modalOnOff lorsque le composant se démonte (en cas de changement de page avec la modale ouverte)
  useEffect(() => {
    return () => {
      document.documentElement.style.setProperty('overflow-y', 'scroll');
      setModalOnOff('');
    };
  }, []);

  return (
    <>
      <div className={`eventsContainer ${modalOnOff}`}>
        <Banner
          // nameBannerActivity={''}
          title="Evènements"
          nameIcon="calendar"
          // bannerContact={false}
          // bannerMember={false}
          // bannerEvent={false}
          // memberFilter={false}
        />
        <div className="eventsContainer__filter">
          <label htmlFor="eventsfilter">Filtre actif :</label>
          <select
            name="events"
            id="eventsFilter"
            onChange={(e) => setFilteredEvent(e.target.value)}>
            <option value="">Tous</option>
            {/* postTypes[0] correspond au type "Activité" : créer une <option> autant qu'il y a de types de poste dans postTypes excepté pour le type "Activité" */}
            {postTypes.map(
              (postType, index) =>
                index > 0 && (
                  <option key={index} value={postType.name}>
                    {postType.name}
                  </option>
                ),
            )}
            {/* Créer une <option> autant qu'il y a d'activités dans activities */}
            {activities.map((activity, index) => (
              <option key={index} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>
        <div className="eventsContainer__events">
          <div className="eventsContainer__events__list">
            {/* Si la valeur du filtre n'est pas égale à "Tous", renvoie les évènements correspondant à sélection */}
            {filteredEvent
              ? events
                  .filter((event) =>
                    // si le type de poste est une Activité
                    event.postType_name === 'Activité'
                      ? // Renvoie les évènements selon l'activité choisie
                        activities
                          .filter((activity) => activity.name === filteredEvent)
                          .map((activity) => activity.name)[0] === event.activity_name
                      : // Sinon, renvoie les évènements selon le type de poste choisi
                        postTypes
                          .filter((postType) => postType.name === filteredEvent)
                          .map((postType) => postType.name)[0] === event.postType_name,
                  )
                  .map((event, index) => (
                    <div
                      role="button"
                      key={index}
                      className="eventsContainer__events__list__card"
                      onClick={() => setModalOnOff('modal')}
                      onKeyDown={() => setModalOnOff('modal')}
                      tabIndex={0}>
                      <EventCard event={event} />
                    </div>
                  ))
              : // Si la valeur du filtre est égale à "Tous", renvoie tous les évènements
                events.map((event, index) => (
                  <div
                    role="button"
                    key={index}
                    className="eventsContainer__events__list__card"
                    onClick={() => setModalOnOff('modal')}
                    onKeyDown={() => setModalOnOff('modal')}
                    tabIndex={0}>
                    <EventCard event={event} />
                  </div>
                ))}
          </div>
        </div>
      </div>
      {modalOnOff && events && <ModalEvent event={events[0]} />}
    </>
  );
};

export default Events;
