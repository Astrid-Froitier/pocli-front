import React, { useContext, useEffect, useState } from 'react';

import { getAllDataWithoutCredential } from '../../helpers/axios';
import { todaysDateLower } from '../../helpers/transformDate';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IEvent from '../interfaces/IEvent';
import IFamilyMemberEvent from '../interfaces/IFamilyMemberEvent';
import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import EventCard from './EventCard';
import ModalEvent from './ModalEvent';

const MyEvents = () => {
  // useStates permettant de gérer la modale d'un évènement
  const [modalOnOff, setModalOnOff] = useState<string>('');
  const [idEventModal, setIdEventModal] = useState<number>(0);

  // useState permettant de stocker la valeur du filtre concernant l'affichage des évènements
  const [filteredEvent, setFilteredEvent] = useState('');

  // useContext pour la data
  const {
    events,
    activities,
    setEvents,
    setPostTypes,
    setActivities,
    setDocuments,
    setLinkedDocuments,
  } = useContext(CurrentDataContext);

  // useContext permettant de savoir si l'utilisateur est connecté ou non.
  // Permet d'afficher tous les évènements ou seulement ceux accessibles aux visiteurs
  const {
    user,
    setPaymentRecordsByFamily,
    cardSelected,
    familyMembers,
    setFamilyMembers,
    familyMemberEvents,
    setFamilyMemberEvents,
  } = useContext(CurrentUserContext);

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
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/paymentRecords`,
      `https://wild-pocli.herokuapp.com/api/families/${user.id}/familyMembers`,
      `https://wild-pocli.herokuapp.com/api/familyMemberEvents`,
    ];

    getAllDataWithoutCredential(urls)
      .then((res) => {
        setEvents(res[0].data);
        setPostTypes(res[1].data);
        setActivities(res[2].data);
        setDocuments(res[3].data);
        setLinkedDocuments(res[4].data);
        setPaymentRecordsByFamily(res[5].data);
        setFamilyMembers(res[6].data);
        setFamilyMemberEvents(res[7].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect permettant d'empêcher le scroll sur Y suivant l'état de modalOnOff
  useEffect(() => {
    {
      modalOnOff && document.documentElement.style.setProperty('overflow-y', 'hidden');
    }
  }, [modalOnOff]);

  //   Filtre permettant de récupérer l'id des membres sélectionnés
  const familyMembersSelected = familyMembers.filter(
    (familyMember, index) => cardSelected[index],
  );

  //   Filtre permettant de récupérer tous les familyMemberEvents auxquels les membres sélectionnés se sont inscrits
  let familyMemberEventsFiltered: IFamilyMemberEvent[] = [];
  familyMembersSelected
    .map((familyMemberSelected) =>
      familyMemberEvents.filter(
        (familyMemberEvent) =>
          familyMemberEvent.idFamilyMember === familyMemberSelected.id,
      ),
    )
    .map((selectedMembersEvent) =>
      selectedMembersEvent.map((event) => familyMemberEventsFiltered.push(event)),
    );

  //   Filtre permettant de récupérer tous les événements auxquels les membres sélectionnés se sont inscrits (sans doublon)
  const membersEvents: IEvent[] = [];
  familyMemberEventsFiltered
    .map(
      (familyMemberEventFiltered) =>
        events.filter((event) => event.id === familyMemberEventFiltered.idEvent)[0],
    )
    .map(
      (membersEvent) =>
        !membersEvents.includes(membersEvent) && membersEvents.push(membersEvent),
    );

  return (
    <>
      <div className={`myEventsContainer ${modalOnOff}`}>
        <Banner
          nameBannerActivity=""
          title="Mes événements"
          nameIcon=""
          memberFilter={true}
          bannerMember={true}
        />
        <div className="myEventsContainer__header">
          <div className="myEventsContainer__header__filter-members">
            {cardSelected.includes(false) ? (
              <p>
                {familyMembers.length === cardSelected.filter((card) => !card).length
                  ? 'Filtre par membre : Aucun membre sélectionné'
                  : `Filtre par membre : ${familyMembersSelected
                      .map((familyMemberSelected) => familyMemberSelected.firstname)
                      .join(', ')}`}
              </p>
            ) : (
              <p>Filtre par membre : Toute la famille</p>
            )}
            <ComeBackHome link="/adherent-space" text="Revenir à l'espace adhérent" />
          </div>
          <div className="myEventsContainer__header__filter-events">
            <label htmlFor="eventsfilter">Filtre par événement :</label>
            <select
              name="events"
              id="eventsFilter"
              onChange={(e) => setFilteredEvent(e.target.value)}>
              <option value="">Tous</option>
              {/* Créer une <option> autant qu'il y a d'activités dans activities */}
              {activities &&
                activities.map((activity, index) => (
                  <option key={index} value={activity.name}>
                    {activity.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="myEventsContainer__events">
          <div className="myEventsContainer__events__list">
            {/* Si filterEvent est vrai (soit la valeur du filtre n'est pas égale à "Tous"), renvoie les évènements correspondant à sélection */}
            {filteredEvent && events
              ? events
                  .filter((event) => membersEvents.includes(event))
                  .filter(
                    (event) =>
                      // Renvoie les évènements selon l'activité choisie
                      activities
                        .filter((activity) => activity.name === filteredEvent)
                        .map((activity) => activity.id)[0] === event.idActivity,
                  )
                  .filter((event) => todaysDateLower(event.date))
                  .map((event, index) => (
                    <div
                      role="button"
                      key={index}
                      className="myEventsContainer__events__list__card"
                      onClick={() => handleClick(event.id)}
                      onKeyDown={() => handleClick(event.id)}
                      tabIndex={0}>
                      <EventCard event={event} />
                    </div>
                  ))
              : // Si la valeur du filtre est égale à "Tous", renvoie tous les évènements
                events &&
                events
                  .filter((event) => membersEvents.includes(event))
                  .filter((event) => todaysDateLower(event.date))
                  .map((event, index) => (
                    <div
                      role="button"
                      key={index}
                      className="myEventsContainer__events__list__card"
                      onClick={() => handleClick(event.id)}
                      onKeyDown={() => handleClick(event.id)}
                      tabIndex={0}>
                      <EventCard event={event} />
                    </div>
                  ))}
          </div>
        </div>
      </div>
      {modalOnOff && events && (
        <ModalEvent
          event={events.filter((event) => event.id === idEventModal)[0]}
          setModalOnOff={setModalOnOff}
        />
      )}
    </>
  );
};

export default MyEvents;
