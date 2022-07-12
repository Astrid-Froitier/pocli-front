import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IFamilyMemberEvent from '../interfaces/IFamilyMembers';
import Banner from './Banner';
import ComeBackDashbord from './ComeBackAdherentSpace';
import EventCard from './EventCard';

const MyEvents = () => {
  // state
  const [familyMemberEvent, setFamilyMemberEvent] = useState<IFamilyMemberEvent[]>([]);
  // function
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getFamilyMemberByID = async () => {
      let url: string = 'http://localhost:3001/api/familyMemberEvents';
      try {
        const { data } = await axios.get<IFamilyMemberEvent[]>(url);
        setFamilyMemberEvent(data);
      } catch (err) {
        console.error(err);
      }
    };
    getFamilyMemberByID();
  }, []);

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
        {familyMemberEvent.map(
          (familyMember, index) =>
            index > 0 &&
            index < 5 && (
              <div key={index}>
                <EventCard familyMember={familyMember} />
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default MyEvents;
