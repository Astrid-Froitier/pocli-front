import React from 'react';
import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import Icon from './Icon';

const Animation = () => {
  return (
    <div>
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
        <p className="animationContainer__sentenceList">
          Un lieu pour sortir sur le territoire.
        </p>
        <div className="animationContainer__list">
          <Icon name="arrow-right" width="40px" height="40px" color="#f5c342" />
          <p>A l’occasion de nos bourses aux vêtements et jouets.</p>
        </div>
        <div className="animationContainer__list">
          <Icon name="arrow-right" width="40px" height="40px" color="#f5c342" />
          <p>Pour la fête de la musique à St Quentin de Baron.</p>
        </div>
        <div className="animationContainer__list">
          <Icon name="arrow-right" width="40px" height="40px" color="#f5c342" />
          <p>Pour les semaines petite enfance.</p>
        </div>
        <div className="animationContainer__list">
          <Icon name="arrow-right" width="40px" height="40px" color="#f5c342" />
          <p>Lors des cinés débats à la médiathèque de Branne.</p>
        </div>
        <div className="animationContainer__pictures">
          <img src="/assets/animation1.png" alt="AnimationImage1" />
          <img src="/assets/animation2.png" alt="AnimationImage2" />
          <img src="/assets/animation3.png" alt="AnimationImage3" />
        </div>
      </div>
      <ComeBackHome />
    </div>
  );
};

export default Animation;
