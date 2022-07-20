import React, { useEffect } from 'react';

import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import ContactForm from './ContactForm';
import Icon from './Icon';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="contactBanner">
        <h1>Contact</h1>
        <Icon name="paper-plane" />
      </div>
      <Banner
        nameBannerActivity=""
        title="Contact"
        nameIcon="paper-plane"
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={false}
      />
      <div className="contactContainer">
        <div className="contactContainer__header">
          <h1 className="contactContainer__header__firstSentence">
            Vous pouvez nous adresser un message en remplissant le formulaire de contact
            ci-dessous.
          </h1>
          <div className="contactContainer__header__textContact">
            <h1 className="contactContainer__header__textContact__title">
              Vous pouvez également nous joindre par mail ou par téléphone&nbsp;:
            </h1>
            <div className="contactContainer__header__textContact__email">
              <div className="contactContainer__header__textContact__email__icon">
                <Icon name={'at'} width="20px" height="20px" color="#3373C7" />
              </div>
              <p className="contactContainer__header__textContact__email__text">
                pocli.asso@gmail.com
              </p>
            </div>
            <div className="contactContainer__header__textContact__phoneNumber">
              <div className="contactContainer__header__textContact__phoneNumber__icon">
                <Icon name={'square-phone'} width="20px" height="20px" color="#3373C7" />
              </div>
              <p className="contactContainer__header__textContact__phoneNumber__text">
                07 64 15 27 11
              </p>
            </div>
          </div>
          <div className="contactContainer__header__textAddress">
            <h1 className="contactContainer__header__textAddress__title">
              Accueil du public au bureau :
            </h1>
            <div className="contactContainer__header__textAddress__days">
              <div className="contactContainer__header__textAddress__days__icon">
                <Icon name={'house'} width="20px" height="20px" color="#3373C7" />
              </div>
              <p className="contactContainer__header__textAddress__days__text">
                Lundi, mardi, jeudi, vendredi - de 9h à 12h30 et de 14h à 16h30
              </p>
            </div>
            <div className="contactContainer__header__textAddress__address">
              <div className="contactContainer__header__textAddress__address__icon">
                <Icon name={'location'} width="20px" height="20px" color="#3373C7" />
              </div>
              <p className="contactContainer__header__textAddress__address__text">
                4 Ribeyreau, 33420 Espiet
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
      <div className="contactContainer__comeBackHome">
        <ComeBackHome />
      </div>
    </div>
  );
};

export default Contact;
