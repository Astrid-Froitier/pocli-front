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
    <>
      <div className={`eventCard${modalEvent ? ' modal' : ''}`}>
        <div className="eventCard__preview">
          {documentsByEvent && documentsByEvent && (
            <img
              className="eventCard__preview__image"
              src={
                documents &&
                documents
                  .filter((document) => document.id === documentsByEvent[0])
                  .map((document) => document.url)[0]
              }
              alt={
                documents &&
                documents
                  .filter((document) => document.id === documentsByEvent[0])
                  .map((document) => document.name)[0]
              }></img>
          )}
          <div className="eventCard__preview__informations">
            <div className="eventCard__preview__informations__date-and-category">
              <span className="eventCard__preview__informations__date-and-category__date">
                {event.date}
              </span>
              <span
                className={`eventCard__preview__informations__date-and-category__${
                  event.idPostType === 1
                    ? activities &&
                      activities
                        .filter((activity) => activity.id === event.idActivity)
                        .map((activity) => activity.shortName)
                    : postTypes &&
                      postTypes
                        .filter((postType) => postType.id === event.idPostType)
                        .map((postType) => postType.name)
                }`}>
                {event.idPostType === 1
                  ? activities &&
                    activities
                      .filter((activity) => activity.id === event.idActivity)
                      .map((activity) => activity.name)
                  : postTypes &&
                    activities
                      .filter((postType) => postType.id === event.idPostType)
                      .map((postType) => postType.name)}
              </span>
            </div>
            <p className="eventCard__preview__informations__text">{event.description}</p>
            {bannerEvent && (
              <div className="eventCard__preview__informations__arrow">
                <Icon name="arrow-right" />
              </div>
            )}
          </div>
        </div>
      </div>
      {modalEvent && (
        <div className="eventCard-modal">
          <p>{event.text}</p>
          <div className="eventCard-modal__images">
            {documentsByEvent &&
              documentsByEvent.map((documentByEvent, index) => (
                <img
                  key={index}
                  src={
                    documents.filter((document) => document.id === documentByEvent)[0].url
                  }
                  alt={
                    documents.filter((document) => document.id === documentByEvent)[0]
                      .name
                  }
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
