import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IEvent from '../interfaces/IEvent';
import Banner from './Banner';
import ComeBackDashbord from './ComeBackAdherentSpace';
import EventCard from './EventCard';

const MyEvents = () => {
  // state
  const [events, setEvents] = useState<IEvent[]>([]);
  // function
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      let url: string = 'http://localhost:3001/api/events';
      try {
        const { data } = await axios.get<IEvent[]>(url);
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    getEvents();
  }, []);

  // const documentsByEvent =
  //   eventDocuments && eventDocuments.filter((document) => document.idEvent === event.id);
  // debug

  return (
    <div className="myEventsContainer">
      <Banner
        nameBannerActivity=""
        title="Mes évènements"
        nameIcon=""
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={true}
      />
      <div className="myEventsContainer__header">
        <label htmlFor="myEventsFilter" className="myEventsContainer__header__filter">
          Filtres : Tous les membres de la famille
        </label>
        <div>
          <div className="myEventsContainer__header__comeBack">
            <ComeBackDashbord
              type={'comeBackDashboard'}
              text={'Retour à mon tableau de bord'}
            />
          </div>
        </div>
      </div>
      <div className="myEventsContainer__events">
        {events.map(
          (event, index) =>
            index > 0 &&
            index < 5 && (
              <div key={index}>
                <EventCard event={event} />
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default MyEvents;
