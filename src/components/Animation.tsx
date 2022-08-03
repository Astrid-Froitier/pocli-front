import React, { useEffect } from 'react';

import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import Icon from './Icon';

const Animation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="animationBanner">
        <h1>Animation Locale</h1>
        <Icon name="compass" color="#fff" />
      </div>
      <Banner
        nameBannerActivity="activity animation"
        title="Animation Locale"
        nameIcon="compass"
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={false}
      />
      <div className="animationContainer">
        <p>Un lieu pour sortir sur le territoire.</p>
        <div className="animationContainer__list">
          <Icon name="arrow-right" height="40px" color="#f5c342" opacity={0.6} />
          <p>A l’occasion de nos bourses aux vêtements et jouets.</p>
        </div>
        <div className="animationContainer__list">
          <Icon name="arrow-right" height="40px" color="#f5c342" opacity={0.6} />
          <p>Pour la fête de la musique à St Quentin de Baron.</p>
        </div>
        <div className="animationContainer__list">
          <Icon name="arrow-right" height="40px" color="#f5c342" opacity={0.6} />
          <p>Pour les semaines petite enfance.</p>
        </div>
        <div className="animationContainer__list">
          <Icon name="arrow-right" height="40px" color="#f5c342" opacity={0.6} />
          <p>Lors des cinés débats à la médiathèque de Branne.</p>
        </div>
        <div className="animationContainer__pictures">
          <img src="/assets/animation1.png" alt="AnimationImage1" />
          <img src="/assets/animation2.png" alt="AnimationImage2" />
          <img src="/assets/animation3.png" alt="AnimationImage3" />
        </div>
        <div className="animationContainer__comeBackHome">
          <ComeBackHome />
        </div>
      </div>
    </div>
  );
};

export default Animation;
