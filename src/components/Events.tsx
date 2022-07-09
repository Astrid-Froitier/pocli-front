import React, { useContext, useEffect, useState } from 'react';

import getAllData from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import Banner from './Banner';
import EventCard from './EventCard';
import ModalEvent from './ModalEvent';

const Events = () => {
  // useStates permettant de gérer la modale d'un évènement
  const [modalOnOff, setModalOnOff] = useState<string>('');
  const [idEventModal, setIdEventModal] = useState<number>(0);

  // useState permettant de stocker la valeur du filtre concernant l'affichage des évènements
  const [filteredEvent, setFilteredEvent] = useState('');

  // useContext pour la data
  const {
    events,
    postTypes,
    activities,
    setEvents,
    setPostTypes,
    setActivities,
    setDocuments,
    setLinkedDocuments,
  } = useContext(CurrentDataContext);

  // handleClick permettant d'afficher l'évènement cliqué sous forme de modale
  const handleClick = (e: number) => {
    setModalOnOff('modal');
    setIdEventModal(e);
  };

  // useEffect permettant de remonter la page en top au montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect permettant de get l'ensemble des informations liées aux évènements (axios)
  useEffect(() => {
    let urls = [
      'https://wild-pocli.herokuapp.com/api/events',
      'https://wild-pocli.herokuapp.com/api/postTypes',
      'https://wild-pocli.herokuapp.com/api/activities',
      'https://wild-pocli.herokuapp.com/api/documents',
      'https://wild-pocli.herokuapp.com/api/linkedDocuments',
    ];

    getAllData(urls)
      .then((res) => {
        setEvents(res[0].data);
        setPostTypes(res[1].data);
        setActivities(res[2].data);
        setDocuments(res[3].data);
        setLinkedDocuments(res[4].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect permettant d'empêcher le scroll sur x suivant l'état de modalOnOff
  useEffect(() => {
    {
      modalOnOff && document.documentElement.style.setProperty('overflow-y', 'hidden');
    }
  }, [modalOnOff]);

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
            {/* Si filterEvent est vrai (soit la valeur du filtre n'est pas égale à "Tous"), renvoie les évènements correspondant à sélection */}
            {filteredEvent
              ? events
                  .filter((event) =>
                    // si le type de poste est une Activité
                    event.idPostType === 1
                      ? // Renvoie les évènements selon l'activité choisie
                        activities
                          .filter((activity) => activity.name === filteredEvent)
                          .map((activity) => activity.id)[0] === event.idActivity
                      : // Sinon, renvoie les évènements selon le type de poste choisi
                        postTypes
                          .filter((postType) => postType.name === filteredEvent)
                          .map((postType) => postType.id)[0] === event.idPostType,
                  )
                  .map((event, index) => (
                    <div
                      role="button"
                      key={index}
                      className="eventsContainer__events__list__card"
                      onClick={() => handleClick(event.id)}
                      onKeyDown={() => handleClick(event.id)}
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
                    onClick={() => handleClick(event.id)}
                    onKeyDown={() => handleClick(event.id)}
                    tabIndex={0}>
                    <EventCard event={event} />
                  </div>
                ))}
          </div>
        </div>
      </div>
      {modalOnOff && (
        <ModalEvent
          event={events.filter((event) => event.id === idEventModal)[0]}
          setModalOnOff={setModalOnOff}
        />
      )}
    </>
  );
};

export default Events;
