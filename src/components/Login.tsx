import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Banner from './Banner';
import Button from './Button';
import Icon from './Icon';
import LoginCard from './LoginCard';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="loginBannerResponsive">
        <h1>Me connecter à mon espace adhérent</h1>
        <Icon name="user" color="#3d79af" />
      </div>
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
        <div className="loginContainer__left">
          <div className="loginContainer__left__form">
            <LoginCard />
          </div>
        </div>
        <div className="loginContainer__right">
          <h1>Devenez adhérent PoCLi</h1>
          <p>Vous souhaitez vous inscrire à l’association, rien de plus simple ! </p>
          <p>Envoyez-nous votre demande via notre formulaire de contact.</p>
          <p>
            Nous reviendrons vers vous dans les plus brefs délais afin de convenir d’un
            rendez-vous.
          </p>
          <NavLink to="/contact">
            <Button text="CONTACTEZ-NOUS" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
