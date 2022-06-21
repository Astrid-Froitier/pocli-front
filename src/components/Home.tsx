import React from 'react';

import events from '../../data/Xevents';
import Banner from './Banner';
import Button from './Button';
import EventCard from './EventCard';

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
          {events.map(
            (event, index) =>
              index > 0 &&
              index < 5 && (
                <div className="home__events__list__card">
                  <EventCard key={index} event={event} />
                </div>
              ),
          )}
        </div>
      </div>
      <Button text="TOUS LES EVENEMENTS" />
    </div>
  );
};

export default Home;
