// import axios from 'axios';
import React, { useState } from 'react';

const ContactForm = () => {
  const [civility, setCivility] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [object, setObject] = useState('');
  const [message, setMessage] = useState('');
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(true);
    setCheckedTwo(false);
    setCivility('Monsieur');
    civility;
  };

  const handleChangeTwo = () => {
    setCheckedTwo(true);
    setCheckedOne(false);
    setCivility('Madame');
  };

  const handlePolicy = () => {
    setIsPolicyChecked(!isPolicyChecked);
  };

  const handleLastname = (word: string) => {
    setLastname(word);
  };

  const handleFirstname = (word: string) => {
    setFirstname(word);
  };

  const handleEmail = (word: string) => {
    setEmail(word);
  };

  const handleObject = (word: string) => {
    setObject(word);
  };

  const handleMessage = (word: string) => {
    setMessage(word);
  };

  // const handleSubmitMail = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:3000/', {
  //     civility: civility,
  //     firstname: firstname,
  //     lastname: lastname,
  //     email: email,
  //     object: object,
  //     message: message,
  //   });
  //   setCivility('');
  //   setFirstname('');
  //   setLastname('');
  //   setEmail('');
  //   setObject('');
  //   setMessage('');
  // };

  return (
    <div className="contactFormContainer">
      <div className="contactFormContainer__civility">
        <label htmlFor="civility" className="contactFormContainer__civility__title">
          Civilité <span>*</span>
        </label>
        <div className="contactFormContainer__civility__checkbox">
          <div className="contactFormContainer__civility__checkbox__madam">
            <input
              className="contactFormContainer__civility__checkbox__madam__input"
              type="radio"
              key="madam"
              checked={checkedOne}
              onChange={handleChangeOne}></input>
            <label
              htmlFor="madam"
              className="contactFormContainer__civility__checkbox__madam__label">
              Madame
            </label>
          </div>
          <div className="contactFormContainer__civility__checkbox__mister">
            <input
              className="contactFormContainer__civility__checkbox__mister__input"
              type="radio"
              checked={checkedTwo}
              key="monsieur"
              value="Monsieur"
              onChange={handleChangeTwo}></input>
            <label
              htmlFor="monsieur"
              className="contactFormContainer__civility__checkbox__mister__label">
              Monsieur
            </label>
          </div>
        </div>
      </div>
      <div className="contactFormContainer__name">
        <div className="contactFormContainer__name__lastname">
          <label htmlFor="name" className="contactFormContainer__name__lastname__label">
            Nom <span>*</span>
          </label>
          <input
            className="contactFormContainer__name__lastname__input"
            type="text"
            key="name"
            onChange={(e) => handleLastname(e.target.value)}
            value={lastname}></input>
        </div>
        <div className="contactFormContainer__name__firstname">
          <label
            htmlFor="firstname"
            className="contactFormContainer__name__firstname__label">
            Prénom <span>*</span>
          </label>
          <input
            className="contactFormContainer__name__firstname__input"
            type="text"
            key="firsname"
            onChange={(e) => handleFirstname(e.target.value)}
            value={firstname}></input>
        </div>
      </div>
      <div className="contactFormContainer__email">
        <label htmlFor="email" className="contactFormContainer__email__label">
          Adresse e-mail <span>*</span>
        </label>
        <input
          className="contactFormContainer__email__input"
          type={email}
          key="email"
          onChange={(e) => handleEmail(e.target.value)}
          value={email}></input>
      </div>
      <div className="contactFormContainer__object">
        <label htmlFor="object" className="contactFormContainer__object__label">
          Objet <span>*</span>
        </label>
        <input
          className="contactFormContainer__object__input"
          type="text"
          key="object"
          onChange={(e) => handleObject(e.target.value)}
          value={object}></input>
      </div>
      <div className="contactFormContainer__message">
        <label htmlFor="message" className="contactFormContainer__message__label">
          Message <span>*</span>
        </label>
        <input
          className="contactFormContainer__message__input"
          type="text"
          key="message"
          onChange={(e) => handleMessage(e.target.value)}
          value={message}></input>
      </div>
      <div className="contactFormContainer__data">
        <h1 className="contactFormContainer__data__title">
          Protection des données personnelles <span>*</span>
        </h1>
        <div className="contactFormContainer__data__checkbox">
          <input
            className="contactFormContainer__data__checkbox__input"
            type="checkbox"
            value="rgpd"
            key="rgpd"
            onChange={() => handlePolicy}></input>
          <label htmlFor="rgpd" className="contactFormContainer__data__checkbox__label">
            J&apos;ai lu et j&apos;accepte la Politique de confidentialité de PoCLi.
          </label>
          <h2 className="contactFormContainer__data__checkbox__consult">Consulter</h2>
        </div>
      </div>
      <button type="submit" className="contactFormContainer__submit">
        ENVOYER
      </button>
    </div>
  );
};

export default ContactForm;
