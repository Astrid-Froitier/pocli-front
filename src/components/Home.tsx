import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import aboutNumbers from '../../data/aboutNumbers';
import { navLinks_bottom } from '../../data/links';
import { getAllDataWithoutCredential } from '../../helpers/axios';
import dateNowToDate from '../../helpers/dateNowToDate';
import CurrentDataContext from '../contexts/CurrentData';
import CurrentUserContext from '../contexts/CurrentUser';
import INewsletter from '../interfaces/INewsletter';
import ActivityCard from './ActivityCard';
import Banner from './Banner';
import Button from './Button';
import EventCard from './EventCard';
import Icon from './Icon';
import ModalEvent from './ModalEvent';
import PartnersList from './PartnersList';

const StyledTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down(500)]: {
    width: '250px',
    '& .MuiOutlinedInput-input': {
      fontSize: '18px',
    },
    '& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-outlined.MuiFormLabel-root.MuiFormLabel-colorPrimary.Mui-required.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
      {
        fontSize: '18px',
      },
    '& .MuiInputLabel-asterisk': {
      fontSize: '18px',
    },
  },

  [theme.breakpoints.up(500)]: {
    width: '400px',
    '& .MuiOutlinedInput-input': {
      fontSize: '20px',
    },
    '& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-outlined.MuiFormLabel-root.MuiFormLabel-colorPrimary.Mui-required.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
      {
        fontSize: '20px',
      },
    '& .MuiInputLabel-asterisk': {
      fontSize: '20px',
    },
  },

  '& .MuiOutlinedInput-input': {
    color: '#3d79af',
  },
  '& .MuiInputLabel-root': {
    color: '#3d79af',
    '&.Mui-error': {
      color: '#d32f2f',
    },
  },
  '& .MuiInputLabel-asterisk': {
    color: '#3d79af',
    '&.Mui-error': {
      color: '#d32f2f',
    },
  },
  '& label.Mui-focused': {
    color: '#3d79af',
    '&.Mui-error': {
      color: '#d32f2f',
    },
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3d79af',
    },
    '&:hover fieldset': {
      borderColor: '#3d79af',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3d79af',
    },
  },
  '& .MuiOutlinedInput-root.Mui-error': {
    '& fieldset': {
      borderColor: '#d32f2f',
    },
    '&:hover fieldset': {
      borderColor: '#d32f2f',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#d32f2f',
    },
  },
}));

const Home = () => {
  const [emailNewsletter, setEmailNewsletter] = useState('');
  const [emailSended, setEmailSended] = useState('');
  const [errorEmailNewsletter, setErrorEmailNewsletter] = useState('');

  // useStates permettant de gérer la modale d'un évènement
  const [modalOnOff, setModalOnOff] = useState<string>('');
  const [idEventModal, setIdEventModal] = useState<number>(0);

  const {
    events,
    setEvents,
    setPostTypes,
    setActivities,
    setDocuments,
    setLinkedDocuments,
    setPartners,
  } = useContext(CurrentDataContext);

  const { user } = useContext(CurrentUserContext);

  // useEffect permettant de remonter la page en top au montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // handleClick permettant d'afficher l'évènement cliqué sous forme de modale
  const handleClick = (e: React.SetStateAction<number>) => {
    events[0].id > 0 && setModalOnOff('modal');
    events[0].id > 0 && setIdEventModal(e);
  };

  // useEffect permettant de get l'ensemble des informations liées aux évènements (axios)
  useEffect(() => {
    let urls = [
      'https://wild-pocli.herokuapp.com/api/events?sort="date,DESC"',
      'https://wild-pocli.herokuapp.com/api/postTypes',
      'https://wild-pocli.herokuapp.com/api/activities',
      'https://wild-pocli.herokuapp.com/api/documents',
      'https://wild-pocli.herokuapp.com/api/linkedDocuments',
      'https://wild-pocli.herokuapp.com/api/partners',
    ];

    getAllDataWithoutCredential(urls)
      .then((res) => {
        setEvents(res[0].data);
        setPostTypes(res[1].data);
        setActivities(res[2].data);
        setDocuments(res[3].data);
        setLinkedDocuments(res[4].data);
        setPartners(res[5].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect permettant d'empêcher le scroll sur Y suivant l'état de modalOnOff
  useEffect(() => {
    {
      modalOnOff && document.documentElement.style.setProperty('overflow-y', 'hidden');
    }
  }, [modalOnOff]);

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // handleClick permettant d'afficher l'évènement cliqué sous forme de modale
  const handleChangeNewsletter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNewsletter(e.target.value);
    regexEmail.exec(emailNewsletter) !== null && setErrorEmailNewsletter('');
  };

  const newsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    const email = emailNewsletter;
    if (email && regexEmail.exec(email) !== null) {
      try {
        e.preventDefault();
        await axios.post<INewsletter>(
          'http://localhost:3001/api/newsletters',
          { email },
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        setEmailSended(
          "Votre demande d'abonnement à notre newsletter a bien été prise en compte.",
        );
      } catch (err) {
        // err est renvoyé potentiellement par axios ou par le code, il peut avoir différents types
        if (axios.isAxiosError(err)) {
          // pour gérer les erreurs de type axios
          console.error(err);
        } else {
          // pour gérer les erreurs non axios
          if (err instanceof Error) {
            console.error(err);
          }
        }
      }
    } else if (regexEmail.exec(emailNewsletter) === null) {
      e.preventDefault();
      setErrorEmailNewsletter('Email invalide');
    }
  };

  return (
    <>
      <div className={`homeContainer ${modalOnOff}`}>
        <Banner
          // nameBannerActivity={''}
          title={''}
          // nameIcon={'users'}
          // bannerContact={false}
          // bannerMember={false}
          bannerEvent={true}
          // memberFilter={false}
          event={
            events &&
            events.filter((event) => (!user.id ? event.reservedAdherent === 0 : event))[0]
          }
          handleClick={handleClick}
        />
        <div className="homeContainer__events">
          <div className="homeContainer__events__list">
            {events &&
              events
                .filter((event) => (!user.id ? event.reservedAdherent === 0 : event))
                .map(
                  (event, index) =>
                    index > 0 &&
                    index < 5 && (
                      <div
                        role="button"
                        key={index}
                        className="homeContainer__events__list__card"
                        onClick={() => handleClick(event.id)}
                        onKeyDown={() => handleClick(event.id)}
                        tabIndex={0}>
                        <EventCard event={event} />
                      </div>
                    ),
                )}
          </div>
          <div className="homeContainer__events__list-response">
            {events &&
              events
                .filter((event) => (!user.id ? event.reservedAdherent === 0 : event))
                .map(
                  (event, index) =>
                    index < 4 && (
                      <div
                        role="button"
                        key={index}
                        className="homeContainer__events__list-response__card"
                        onClick={() => handleClick(event.id)}
                        onKeyDown={() => handleClick(event.id)}
                        tabIndex={0}>
                        <EventCard event={event} />
                      </div>
                    ),
                )}
          </div>
          <Button text="TOUS LES ÉVÈNEMENTS" link="/events" />
        </div>
        {!user.id && (
          <div className="homeContainer__nonAdherent">
            <div className="homeContainer__nonAdherent__box">
              <div className="homeContainer__nonAdherent__box__text">
                <h1>Devenez adhérent PoCLi</h1>
                <p>
                  Vous souhaitez vous inscrire à l&apos;association, rien de plus simple !
                </p>
                <p>Envoyez-nous votre demande via notre formulaire de contact.</p>
                <p>
                  Nous reviendrons vers vous dans les plus brefs délais afin de convenir
                  d’un rendez-vous.
                </p>
              </div>
              <div className="homeContainer__nonAdherent__box__arrow">
                <Icon name="arrow-right" width="24px" color="white" />
              </div>
              <div className="homeContainer__nonAdherent__box__button">
                <Button text="CONTACTEZ-NOUS" link="/contact" />
              </div>
            </div>
          </div>
        )}
        {!user.id && (
          <div className="homeContainer__about">
            <div className="homeContainer__about__numbers">
              {aboutNumbers.map((number, index) => (
                <div className="homeContainer__about__numbers__box" key={index}>
                  <div className="homeContainer__about__numbers__box__digit">
                    {number.number}
                  </div>
                  <p className="homeContainer__about__numbers__box__text">
                    {number.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="homeContainer__about__text">
              <h1>La recette de PoCLi </h1>
              <p>Une louche de bienveillance</p>
              <p>Une bonne dose de dynamisme</p>
              <p>Un chaudron d&apos;idées</p>
              <p>Le tout arrosé de convivialité</p>
              <p>A servir avec le sourire</p>
              <div className="homeContainer__about__text__button">
                <Button text="QUI SOMMES-NOUS ?" link="/about" />
              </div>
            </div>
          </div>
        )}
        <div className="homeContainer__activities">
          <h1>Nos domaines d&apos;activité</h1>
          <div className="homeContainer__activities__box">
            {navLinks_bottom.map((link, index) => (
              <NavLink to={link.path} key={index}>
                <div className="homeContainer__activities__box__card">
                  <ActivityCard
                    nameActivity={link.path.substring(1, link.path.length)}
                    nameIcon={link.icon}
                    title={link.title}
                  />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="homeContainer__newsletter">
          <div className="homeContainer__newsletter__box">
            <img src="assets/pocli.png" alt="pocli" />
            <span>
              Vous pouvez suivre nos actualités en vous abonnant à notre newsletter
            </span>
            <div className="homeContainer__newsletter__box__form">
              {!emailSended && (
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    newsletter(e);
                  }}>
                  <div className="homeContainer__newsletter__box__form__email">
                    <StyledTextField
                      error={errorEmailNewsletter ? true : false}
                      required
                      id="outlined-required"
                      label="Email"
                      value={emailNewsletter}
                      onChange={handleChangeNewsletter}
                      InputProps={{
                        style: {
                          fontFamily: 'Karla, sans-serif',
                          fontWeight: 800,
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          fontFamily: 'Karla, sans-serif',
                          fontWeight: 800,
                        },
                      }}
                    />
                    {errorEmailNewsletter && <p>{errorEmailNewsletter}</p>}
                  </div>
                  <button>
                    <Button text="ENVOYER" />
                  </button>
                </form>
              )}
            </div>
            {emailSended && <p>{emailSended}</p>}
          </div>
        </div>
        <div className="homeContainer__partners">
          <PartnersList />
        </div>
      </div>
      {modalOnOff && (
        <ModalEvent
          event={events.filter((event) => event.id === idEventModal)[0]}
          setModalOnOff={setModalOnOff}
        />
      )}
    </>
  );
};

export default Home;
