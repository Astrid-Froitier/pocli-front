import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import aboutNumbers from '../../data/aboutNumbers';
import { navLinks_bottom } from '../../data/links';
import events from '../../data/Xevents';
import ActivityCard from './ActivityCard';
import Banner from './Banner';
import Button from './Button';
import EventCard from './EventCard';
import Icon from './Icon';

const Home = () => {
  const [onClickNewsletter, setOnClickNewsletter] = useState(false);
  const [emailNewsletter, setEmailNewsletter] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  interface IFormInput {
    email: String;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => setEmailNewsletter(data);
  return (
    <div className="home">
      <Banner
        // nameBannerActivity={''}
        title={''}
        // nameIcon={'users'}
        // bannerContact={false}
        // bannerMember={false}
        bannerEvent={true}
        // memberFilter={false}
      />
      <div className="home__events">
        <div className="home__events__list">
          {events.map(
            (event, index) =>
              index > 0 &&
              index < 5 && (
                <div key={index} className="home__events__list__card">
                  <EventCard event={event} />
                </div>
              ),
          )}
        </div>
        <Button text="TOUS LES ÉVÈNEMENTS" />
      </div>
      <div className="home__nonAdherent">
        <div className="home__nonAdherent__box">
          <div className="home__nonAdherent__box__text">
            <h1>Devenez adhérent PoCLi</h1>
            <p>Vous souhaitez vous inscrire à l’association, rien de plus simple !</p>
            <p>Envoyez-nous votre demande via notre formulaire de contact.</p>
            <p>
              Nous reviendrons vers vous dans les plus brefs délais afin de convenir d’un
              rendez-vous.
            </p>
          </div>
          <div className="home__nonAdherent__box__arrow">
            <Icon name="arrow-right" width="24px" color="white" />
          </div>
          <div className="home__nonAdherent__box__button">
            <Button text="CONTACTEZ-NOUS" />
          </div>
        </div>
      </div>
      <div className="home__about">
        <div className="home__about__numbers">
          {aboutNumbers.map((number, index) => (
            <div className="home__about__numbers__box" key={index}>
              <div className="home__about__numbers__box__digit">{number.number}</div>
              <p className="home__about__numbers__box__text">{number.text}</p>
            </div>
          ))}
        </div>
        <div className="home__about__text">
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
          <div className="home__about__text__button">
            <Button text="QUI SOMMES-NOUS ?" />
          </div>
        </div>
      </div>
      <div className="home__activities">
        <h1>Nos domaines d&apos;activité</h1>
        <div className="home__activities__box">
          {navLinks_bottom.map((link, index) => (
            <NavLink to={link.path} key={index}>
              <div className="home__activities__box__card">
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
      <div className="home__newsletter">
        <div className="home__newsletter__box">
          <img src="./assets/pocli.png" alt="logo" />
          {!onClickNewsletter && (
            <>
              <p>Pour rester informer sur les activités de PoCLi</p>
              <button onClick={() => setOnClickNewsletter(true)}>
                <Button text="S'ABONNER À LA NEWSLETTER" />
              </button>
            </>
          )}
          {onClickNewsletter && !emailNewsletter.hasOwnProperty('email') && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
                  E-mail :
                </label>
                <input
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && <p>Champ invalide</p>}
              </div>
              <button onClick={() => setOnClickNewsletter(true)}>
                <Button text="ENVOYER" />
              </button>
            </form>
          )}
          {emailNewsletter.hasOwnProperty('email') && (
            <p>
              Votre demande d'abonnement à notre newsletter a bien été prise en compte.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
