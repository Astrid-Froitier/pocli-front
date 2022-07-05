import React, { useEffect, useState } from 'react';

import activities from '../../data/Xactivities';
import events from '../../data/Xevents';
import postTypes from '../../data/XpostTypes';
import Banner from './Banner';
import EventCard from './EventCard';

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [filteredEvent, setFilteredEvent] = useState('');
  const [modal] = useState('modal');

  return (
    <div className="eventsContainer">
      <div className={`${modal}`}></div>
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
          id="eventsfilter"
          onChange={(e) => setFilteredEvent(e.target.value)}>
          <option value="">Tous</option>
          {postTypes.map(
            (postType, index) =>
              index > 0 && (
                <option key={index} value={postType.name}>
                  {postType.name}
                </option>
              ),
          )}
          {activities.map((activity, index) => (
            <option key={index} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
      <div className="eventsContainer__events">
        <div className="eventsContainer__events__list">
          {filteredEvent
            ? events
                .filter((event) =>
                  event.idPostType === 1
                    ? activities
                        .filter((activity) => activity.name === filteredEvent)
                        .map((activity) => activity.id)[0] === event.idActivity
                    : postTypes
                        .filter((postType) => postType.name === filteredEvent)
                        .map((postType) => postType.id)[0] === event.idPostType,
                )
                .map((event, index) => (
                  <div key={index} className="eventsContainer__events__list__card">
                    <EventCard event={event} />
                  </div>
                ))
            : events.map((event, index) => (
                <div key={index} className="eventsContainer__events__list__card">
                  <EventCard event={event} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
