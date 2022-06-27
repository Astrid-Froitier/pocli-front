import React from 'react';

import activities from '../../data/Xactivities';
import documents from '../../data/Xdocuments';
import eventDocuments from '../../data/XeventDocuments';
import postTypes from '../../data/XpostTypes';
import IEventCard from '../interfaces/IEventCard';
import Icon from './Icon';

const EventCard = ({ event, bannerEvent = false }: IEventCard) => {
  const documentByEvent = eventDocuments.filter(
    (document) => document.idEvent === event.id,
  );
  const eventPostType = postTypes.filter((postType) => postType.id === event.idPostType);
  const eventActivity = activities.filter((activity) => activity.id === event.idActivity);

  return (
    <div className="eventCard">
      <img
        className="eventCard__image"
        src={
          documents.filter((document) => document.id === documentByEvent[0].idDocument)[0]
            .url
        }
        alt={
          documents.filter((document) => document.id === documentByEvent[0].idDocument)[0]
            .name
        }
      ></img>
      <div className="eventCard__informations">
        <div className="eventCard__informations__header">
          <span className="eventCard__informations__header__date">{event.date}</span>
          <span
            className={`eventCard__informations__header__${
              eventPostType[0].name === 'Activité'
                ? eventActivity[0].abridged
                : eventPostType[0].name
            }`}
          >
            {eventPostType[0].name === 'Activité'
              ? eventActivity[0].name
              : eventPostType[0].name}
          </span>
        </div>
        <p className="eventCard__informations__text">{event.description}</p>
        {bannerEvent && (
          <div className="eventCard__informations__arrow">
            <Icon name="arrow-right" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
