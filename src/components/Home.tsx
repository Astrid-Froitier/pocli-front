import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import aboutNumbers from '../../data/aboutNumbers';
import { navLinks_bottom } from '../../data/links';
import { getAllDataWithoutCredential } from '../../helpers/axios';
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

const Home = () => {
  const [onClickNewsletter, setOnClickNewsletter] = useState(false);
  const [emailNewsletter, setEmailNewsletter] = useState({});

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
      'https://wild-pocli.herokuapp.com/api/events?sort="id,DESC"',
      'https://wild-pocli.herokuapp.com/api/postTypes',
      'https://wild-pocli.herokuapp.com/api/activities',
      'https://wild-pocli.herokuapp.com/api/documents',
      'https://wild-pocli.herokuapp.com/api/linkedDocuments',
    ];

    getAllDataWithoutCredential(urls)
      .then((res) => {
        setEvents(res[0].data);
        setPostTypes(res[1].data);
        setActivities(res[2].data);
        setDocuments(res[3].data);
        setLinkedDocuments(res[4].data);
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

  interface IFormInput {
    email: String;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const email = data.email;
    try {
      const { data } = await axios.post<INewsletter>(
        'http://localhost:3001/api/newsletters',
        { email },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setEmailNewsletter(data);
    } catch (err) {
      console.error(err);
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
              <h1>PoCLi, c’est [accroche]</h1>
              <p>Description succincte...</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non perferendis
                libero ipsa
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non perferendis
                libero ipsa
              </p>
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
            <img src="./assets/pocli.png" alt="logo" />
            {!onClickNewsletter && (
              <div className="homeContainer__newsletter__box__newsrespons">
                <p>Pour rester informer sur les activités de PoCLi</p>
                <button onClick={() => setOnClickNewsletter(true)}>
                  <Button text="S'ABONNER À LA NEWSLETTER" />
                </button>
              </div>
            )}
            {onClickNewsletter &&
              !Object.getOwnPropertyDescriptor(emailNewsletter, 'email') && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="email">E-mail :</label>
                    <input
                      {...register('email', {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                    {errors.email && <p>Champ invalide</p>}
                  </div>
                  <button>
                    <Button text="ENVOYER" />
                  </button>
                </form>
              )}
            {Object.getOwnPropertyDescriptor(emailNewsletter, 'email') && (
              <p>
                Votre demande d&apos;abonnement à notre newsletter a bien été prise en
                compte.
              </p>
            )}
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
