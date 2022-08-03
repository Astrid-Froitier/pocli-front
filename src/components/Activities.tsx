import React, { useEffect } from 'react';

import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import Icon from './Icon';

const Activities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <Banner
        nameBannerActivity="activity physical"
        title="Activités physiques et de Bien-Être"
        nameIcon="person-running"
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={false}
      />
      <div className="activityBanner">
        <h1 className="activityBanner__title">Activités physiques et de Bien-Être</h1>
        <Icon name="person-running" color="#fff" width="40px" height="40px" />
      </div>
      <div className="activityContainer">
        <div className="activityContainer__preambulContainer">
          <p>Un lieu d’épanouissement individuel et collectif.</p>
          <p>
            Vous pratiquerez des activités physiques dans une ambiance détendue et
            conviviale : pilates, gym douce, gym seniors.
          </p>
          <p>
            Vous renforcerez vos relations avec vos enfants lors de séances de bien être
            duo parents/enfants : méditation, yoga, massage, balade sensorielle.
          </p>
          <p>
            Vous prendrez du temps pour vous : activités et sorties bien-être solo
            (méditation, yoga), soirées papote autour d’un verre...
          </p>
        </div>
        <div className="activityContainer__pilateContainer">
          <h1>Pilates</h1>
          <div className="activityContainer__pilateContainer__pilateContainerBloc1">
            <Icon name="arrow-right" height="40px" color="#8FBF69" opacity={0.6} />
            <p>Renforcement musculaire en douceur allié à une respiration profonde.</p>
          </div>
          <div className="activityContainer__pilateContainer__pilateContainerBloc2">
            <Icon name="arrow-right" height="40px" color="#8FBF69" opacity={0.6} />
            <p>
              Travail essentiellement au sol, avec ou sans matériel (élastiques, ballon…).
            </p>
          </div>
          <div className="activityContainer__pilateContainer__pilateContainerHour">
            <p>Séances le lundi de 19h à 20h.</p>
            <p>Salle des fêtes d’Espiet.</p>
          </div>
        </div>
        <div className="activityContainer__gymSeniorContainer">
          <h1>Gym Seniors</h1>
          <div className="activityContainer__gymSeniorContainer__gymSeniorContainerBloc1">
            <Icon name="arrow-right" height="40px" color="#8FBF69" opacity={0.6} />
            <p>
              Renforcement et étirement musculaire, équilibre dynamique, stimulation de la
              fonction cardia-respiratoire, assouplissement de la colonne vertébrale.
            </p>
          </div>
          <div className="activityContainer__gymSeniorContainer__gymSeniorHour">
            <p>Séances le mardi de 11h15 à 12h15.</p>
            <p>Salle des fêtes de St Quentin de Baron.</p>
          </div>
        </div>
        <div className="activityContainer__gymSoftContainer">
          <h1>Gym Douce</h1>
          <div className="activityContainer__gymSoftContainer__gymSoftContainerBloc1">
            <Icon name="arrow-right" height="40px" color="#8FBF69" opacity={0.6} />
            <p>
              Travail de respiration, équilibre dynamique, stretching, sens du rythme,
              coordination, relaxation.
            </p>
          </div>
          <div className="activityContainer__gymSoftContainer__gymSoftHour">
            <p>Séances le mardi de 11h15 à 12h15.</p>
            <p>Salle des fêtes de St Quentin de Baron.</p>
          </div>
        </div>
        <div className="activityContainer__welfareContainer">
          <h1>Bien-Être Solo</h1>
          <div className="activityContainer__welfareContainer__welfareContainerBloc1">
            <Icon name="arrow-right" height="40px" color="#8FBF69" opacity={0.6} />
            <p>Cycles de découvertes d’activités relaxantes&nbsp;: Méditation, yoga.</p>
          </div>
          <div className="activityContainer__welfareContainer__welfareContainerBloc2">
            <Icon name="arrow-right" height="40px" color="#8FBF69" opacity={0.6} />
            <p>Sorties bien-être&nbsp;: Calicéo, balade nature…</p>
          </div>
        </div>
        <div className="activityContainer__welfareDuoContainer">
          <h1>Bien-Être Duo</h1>
          <div className="activityContainer__welfareDuoContainer__welfareDuoContainerBloc1">
            <Icon name="arrow-right" height="40px" color="#8FBF69" opacity={0.6} />
            <p>Partager un moment de bien être avec son enfant.</p>
          </div>
          <div className="activityContainer__welfareDuoContainer__welfareDuoContainerBloc2">
            <Icon name="arrow-right" height="40px" color="#8FBF69" opacity={0.6} />
            <p>Massage bébé, yoga famille, méditation, sortie nature...</p>
          </div>
        </div>
        <div className="activityContainer__activityPictures">
          <div className="activityContainer__activityPictures__activityPicturesBloc1">
            <img src="/assets/bienetresolo.png" alt="SportThemeImage1" />
            <img src="/assets/bienetreduo.png" alt="SportThemeImage2" />
          </div>
          <div className="activityContainer__activityPictures__activityPicturesBloc2">
            <img src="/assets/eventexample.jpg" alt="SportThemeImage3" />
            <img src="/assets/pilate.png" alt="SportThemeImage4" />
          </div>
        </div>
        <div className="activityContainer__comeBackHome">
          <ComeBackHome />
        </div>
      </div>
    </div>
  );
};

export default Activities;
