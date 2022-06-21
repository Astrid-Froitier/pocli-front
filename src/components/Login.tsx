import React from 'react';

import Banner from './Banner';
import Button from './Button';
import LoginCard from './LoginCard';

const Login = () => {
  return (
    <div>
      <Banner
        nameBannerActivity=""
        title="Me connecter à mon espace adhérent"
        nameIcon="user"
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={false}
      />
      <div className="loginContainer">
        <LoginCard />
        <div className="loginContainer__line"></div>
        <div className="loginContainer__text">
          <h1 className="loginContainer__text__title">Devenez adhérent PoCLi</h1>
          <p>Vous souhaitez vous inscrire à l’association, rien de plus simple ! </p>
          <p>Envoyez-nous votre demande via notre formulaire de contact.</p>
          <p>
            Nous reviendrons vers vous dans les plus brefs délais afin de convenir d’un
            rendez-vous.
          </p>
          <Button text="CONTACTEZ-NOUS" />
        </div>
      </div>
    </div>
  );
};

export default Login;
