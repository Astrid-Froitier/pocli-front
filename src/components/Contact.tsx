import React from 'react';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <div className="contactContainer">
      <div className="contactContainer__header__firstSentence">
        <h1 className="contactContainer__header__firstSentence">
          Vous pouvez nous adresser un message en remplissant le formulaire de contact
          ci-dessous.
        </h1>
        <div className="contactContainer__header__textContact">
          <h1 className="contactContainer__header__textContact__title">
            Vous pouvez également nous joindre par mail ou par téléphone :
          </h1>
          <p className="contactContainer__header__textContact__email">
            pocli.asso@gmail.com
          </p>
          <p className="contactContainer__header__textContact__phoneNumber">
            07 64 15 27 11
          </p>
        </div>
        <div className="contactContainer__header__textAddress">
          <h1 className="contactContainer__header__textAddress__title">
            Accueil du public au bureau :
          </h1>
          <p className="contactContainer__header__textAddress__days">
            Lundi, mardi, jeudi, vendredi - de 9h à 12h30 et de 14h à 16h30
          </p>
          <p className="contactContainer__header__textAddress__address">
            4 Ribeyreau, 33420 Espiet
          </p>
        </div>
      </div>
      <ContactForm />
      <h1 className="contactContainer__header__goback">Revenir à la page d’accueil</h1>
    </div>
  );
};

export default Contact;
