import React from 'react';
import Banner from './Banner';

const Home = () => {
  return (
    <div className="home">
      <Banner
        activity={'activity social'}
        title={'Hello man'}
        nameIcon={'arrow-left'}
        bannerContact={false}
        bannerMember={false}
        bannerEvent={false}
        memberFilter={false}
      />
    </div>
  );
};

export default Home;
