import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IEvent from '../interfaces/IEvent';
import IEventDocument from '../interfaces/IEventDocument';
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
  const [eventDocuments, setEventDocuments] = useState<IEventDocument[]>();

  useEffect(() => {
    const getEventDocuments = async () => {
      // indispensable quand on veut utiliser async/await dans un useEffect
      let url: string = 'http://localhost:3001/api/eventDocuments/';
      try {
        const { data } = await axios.get<IEventDocument[]>(url);
        setEventDocuments(data);
      } catch (err) {
        console.error(err);
      }
    };
    getEventDocuments();
  }, []);

  const documentsByEvent =
    eventDocuments && eventDocuments.filter((document) => document.idEvent === event.id );
  
  return (
    <div className="eventCard">
      {documentsByEvent && documentsByEvent.length ? (
        <img
          className="eventCard__image"
          src={documentsByEvent[0].document_url}
          alt={documentsByEvent[0].document_name}></img>
      ): undefined}
      <div className="eventCard__informations">
        <div className="eventCard__informations__header">
          <span className="eventCard__informations__header__date">{event.date}</span>
          <span
            className={`eventCard__informations__header__${
              event.postType_name === 'Activité'
                ? event.activity_abridged
                : event.postType_name
            }`}>
            {event.postType_name === 'Activité'
              ? event.activity_name
              : event.postType_name}
          </span>
        </div>
        <p className="eventCard__informations__text">{event.description}</p>
        {bannerEvent && (
          <div className="eventCard__informations__arrow">
            <Icon name="arrow-right" />
          </div>
        )}
        {modalEvent && <div>{event.description}</div>}
      </div>
    </div>
  );
};

export default EventCard;
