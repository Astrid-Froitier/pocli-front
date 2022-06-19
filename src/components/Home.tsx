import React from 'react';
import Banner from './Banner';
import EventCard from './EventCard';
import events from '../../data/Xevents';

const Home = () => {
  return (
    <div className="home">
      <Banner
        // nameBannerActivity={''}
        title={''}
        // nameIcon={'users'}
        // bannerContact={false}
        // bannerMember={false}
        bannerEvent={true}
        // memberFilter={false}
      />
      <div className="home__events">
        <div className="home__events__list">
          {events.map((event, index) => ( index > 0 && index < 5 &&
            <div className="home__events__list__card">
              <EventCard key={index} event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
