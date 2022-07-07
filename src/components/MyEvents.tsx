import React from 'react';

import Banner from './Banner';

const MyEvents = () => {
  // state

  // function

  // debug

  return (
    <div>
      <Banner
        nameBannerActivity=""
        title="Mes évènements"
        nameIcon=""
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={true}
      />
      <div className="myEventsContainer">Mes évènements</div>
    </div>
  );
};

export default MyEvents;
