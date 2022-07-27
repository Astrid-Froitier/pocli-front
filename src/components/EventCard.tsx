import React, { useContext, useEffect, useState } from 'react';

import { todaysDateLower, transformDate } from '../../helpers/transformDate';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import IEvent from '../interfaces/IEvent';
import Icon from './Icon';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks';

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

  const { paymentRecordsByFamily, familyMembers, familyMemberEvents } =
    useContext(CurrentUserContext);

  const [dateEvent, setDateEvent] = useState<React.SetStateAction<string>>();

  useEffect(() => {
    setDateEvent(transformDate(event.date));
  }, [event]);

  const documentsByEvent =
    linkedDocuments &&
    event &&
    linkedDocuments
      .filter((linkedDocument) => linkedDocument.idEvent === event.id)
      .map((linkedDocument) => linkedDocument.idDocument);

  const dateToday = new Date().toLocaleDateString();

  // Permet de filtrer tous les paiements des membres au sein d'une même famille en fonction de l'idActivity
  // et de l'échéance du paiement (permet de déterminer si l'abonnement du membre est cours ou s'il est arrivé à son terme).
  // Les adhésions arrivées à échéance seront donc exclues du résultat.
  const paymentRecordsByActivityEventAndIsActive =
    paymentRecordsByFamily &&
    paymentRecordsByFamily.filter(
      (paymentRecordByFamily) =>
        transformDate(paymentRecordByFamily.dateEnd) > dateToday &&
        paymentRecordByFamily.idActivity === event.idActivity,
    );

  // Filtre permettant d'afficher toutes les informations de chaque membre d'une même famille ayant payé pour une ou plusieurs activités
  // et n'ayant pas dépassé la date d'échéance (activité en cours)
  const familyMembersIsActive =
    paymentRecordsByActivityEventAndIsActive &&
    paymentRecordsByActivityEventAndIsActive.map(
      (paymentRecordByActivityEventAndIsActive) =>
        familyMembers.filter(
          (familyMember) =>
            familyMember.id === paymentRecordByActivityEventAndIsActive.idFamilyMember,
        )[0],
    );

  const availablePlaces =
    event.numberParticipantsMax &&
    event.numberParticipantsMax -
      familyMemberEvents.filter(
        (familyMemberEvent) => familyMemberEvent.idEvent === event.id,
      ).length;

  return (
    <>
      <div className={`eventCard${modalEvent ? ' modal' : ''}`}>
        <div className="eventCard__preview">
          {documents && documentsByEvent[0] > 0 && documents[0].id > 0 ? (
            <img
              className="eventCard__preview__image"
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
          ) : null}
          {((documents && documentsByEvent[0] === undefined) ||
            (documents && documents[0].id === 0)) &&
            !modalEvent && (
              <img
                className="eventCard__preview__image"
                src="assets/nopicture.png"
                alt="no img"></img>
            )}
          <div className="eventCard__preview__informations">
            <div className="eventCard__preview__informations__date-and-category">
              <span className="eventCard__preview__informations__date-and-category__date">
                {dateEvent}
              </span>
              <span
                className={`eventCard__preview__informations__date-and-category__${
                  event.idPostType === 1
                    ? activities &&
                      activities
                        .filter((activity) => activity.id === event.idActivity)
                        .map((activity) => activity.shortName)[0]
                    : postTypes &&
                      postTypes
                        .filter((postType) => postType.id === event.idPostType)
                        .map((postType) => postType.name)[0]
                }`}>
                {event.idPostType === 1
                  ? activities &&
                    activities
                      .filter((activity) => activity.id === event.idActivity)
                      .map((activity) => activity.name)[0]
                  : postTypes &&
                    postTypes
                      .filter((postType) => postType.id === event.idPostType)
                      .map((postType) => postType.name)[0]}
              </span>
            </div>
            <div className="eventCard__preview__informations__text">
              <p>
                {modalEvent
                  ? event.description.slice(0, 125)
                  : `${event.description.slice(0, 125)}${
                      event.description.length > 125 ? '...' : ''
                    }`}
              </p>
            </div>
            {bannerEvent && (
              <div className="eventCard__preview__informations__arrow">
                <div className="eventCard__preview__informations__arrow__box">
                  <Icon name="arrow-right" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modalEvent && (
        <div className="eventCard-modal">
          {event.idActivity &&
          familyMembersIsActive.length &&
          todaysDateLower(event.date) ? (
            <div className="eventCard-modal__participation">
              <MultipleSelectCheckmarks
                familyMembersIsActive={familyMembersIsActive}
                event={event}
              />
            </div>
          ) : null}
          {event.idActivity &&
          familyMembersIsActive.length &&
          todaysDateLower(event.date) &&
          event.numberParticipantsMax ? (
            <div className="eventCard-modal__number-participants-max">
              {availablePlaces ? (
                <span>{`Place${availablePlaces > 1 ? 's' : ''} disponible${
                  availablePlaces > 1 ? 's' : ''
                } : ${availablePlaces}`}</span>
              ) : (
                <span>Toutes les places ont été prises !</span>
              )}
            </div>
          ) : null}
          {event.podcastLink && (
            <a
              className="eventCard-modal__podcast"
              href={event.podcastLink}
              target="_blank"
              rel="noreferrer">
              Accéder au Podcast
            </a>
          )}
          {event.text?.split('\\').map((paragraph, index) => (
            <p className="eventCard-modal__paragraph" key={index}>
              {paragraph}
            </p>
          ))}
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
