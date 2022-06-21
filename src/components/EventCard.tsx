import React from 'react';

import activities from '../../data/Xactivities';
import documents from '../../data/Xdocuments';
import eventDocuments from '../../data/XeventDocuments';
import postTypes from '../../data/XpostTypes';
import IEventCard from '../interfaces/IEventCard';

const EventCard = ({ event, bannerEvent = false }: IEventCard) => {
  console.log(event);
  const documentByEvent = eventDocuments.filter(
    (document) => document.idEvent === event.id,
  );
  const eventPostType = postTypes.filter((postType) => postType.id === event.idPostType);
  const eventActivity = activities.filter((activity) => activity.id === event.idActivity);

  return (
    <div className={`event-card`}>
      <img
        className="event-card__image"
        src={
          documents.filter((document) => document.id === documentByEvent[0].idDocument)[0]
            .url
        }
        alt={
          documents.filter((document) => document.id === documentByEvent[0].idDocument)[0]
            .name
        }></img>
      <div className="event-card__informations">
        <div className="event-card__informations__header">
          <span className="event-card__informations__header__date">{event.date}</span>
          <span
            className={`event-card__informations__header__${
              eventPostType[0].name === 'Activité'
                ? eventActivity[0].abridged
                : eventPostType[0].name
            }`}>
            {eventPostType[0].name === 'Activité'
              ? eventActivity[0].name
              : eventPostType[0].name}
          </span>
        </div>
        <p className="event-card__informations__text">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
