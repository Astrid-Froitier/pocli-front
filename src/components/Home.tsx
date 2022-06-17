import React from 'react';
import Banner from './Banner';

const Home = () => {
  return (
    <div className="home">
      <Banner
        nameBannerActivity={''}
        title={'Hello man my name is Dave Turner'}
        nameIcon={'users'}
        // bannerContact={false}
        // bannerMember={false}
        // bannerEvent={false}
        // memberFilter={false}
      />
    </div>
  );
};

export default Home;
