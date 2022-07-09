import React, { useContext } from 'react';

import CurrentDataContext from '../contexts/CurrentData';
import IEvent from '../interfaces/IEvent';
import Icon from './Icon';

interface EventCardProps {
  event: IEvent;
  bannerEvent?: boolean;
  modalEvent?: boolean;
}

const EventCard = ({
  event,
  bannerEvent = false,
  modalEvent = false,
}: EventCardProps) => {
  const { postTypes, activities, documents, linkedDocuments } =
    useContext(CurrentDataContext);

  const documentsByEvent = linkedDocuments
    .filter((linkedDocument) => linkedDocument.idEvent === event.id)
    .map((linkedDocument) => linkedDocument.idDocument);

  return (
    <div className="eventCard">
      {documentsByEvent && (
        <img
          className="eventCard__image"
          src={
            documents
              .filter((document) => document.id === documentsByEvent[0])
              .map((document) => document.url)[0]
          }
          alt={
            documents
              .filter((document) => document.id === documentsByEvent[0])
              .map((document) => document.name)[0]
          }></img>
      )}
      <div className="eventCard__informations">
        <div className="eventCard__informations__header">
          <span className="eventCard__informations__header__date">{event.date}</span>
          <span
            className={`eventCard__informations__header__${
              event.idPostType === 1
                ? activities
                    .filter((activity) => activity.id === event.idActivity)
                    .map((activity) => activity.shortName)
                : postTypes
                    .filter((postType) => postType.id === event.idPostType)
                    .map((postType) => postType.name)
            }`}>
            {event.idPostType === 1
              ? activities
                  .filter((activity) => activity.id === event.idActivity)
                  .map((activity) => activity.name)
              : postTypes
                  .filter((postType) => postType.id === event.idPostType)
                  .map((postType) => postType.name)}
          </span>
        </div>
        <p className="eventCard__informations__text">{event.description}</p>
        {bannerEvent && (
          <div className="eventCard__informations__arrow">
            <Icon name="arrow-right" />
          </div>
        )}
        {modalEvent && <div>{event.text}</div>}
      </div>
    </div>
  );
};

export default EventCard;
