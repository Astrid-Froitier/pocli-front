import React, { useEffect } from 'react';

import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import Icon from './Icon';

const Family = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="familyBanner">
        <h1 className="familyBanner__title">Famille - Parentalité</h1>
        <Icon name="users" color="#fff" width="40px" height="40px" />
      </div>
      <Banner
        nameBannerActivity="activity family"
        title="Famille - Parentalité"
        nameIcon="users"
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={false}
      />
      <div className="familyContainer">
        <div className="familyContainer__header">
          <p>Un lieu de partage et de rencontres pour les parents et les enfants.</p>
          <p className="familyContainer__header__firstParagraph">
            Les activités proposées vous permettent, parents et grands-parents, de
            partager un moment avec vos enfants et petits enfants de 0 à 12 ans&nbsp;:
            Activité manuelle, cuisine, motricité, éveil musical, balades...
          </p>
          <p className="familyContainer__header__secondParagraph">
            Lors des temps de partage d’expériences et de discussions, vous aborderez des
            questions de parentalité et y trouverez des réponses.
          </p>
        </div>
        <div className="familyContainer__workshop">
          <h1>Les Ateliers Part’Ages</h1>
          <div className="familyContainer__workshop__description">
            <div className="familyContainer__workshop__description__firstPoint">
              <Icon name="arrow-right" height="40px" color="#8bafcf" opacity={0.6} />
              <p className="familyContainer__workshop__description__firstPoint__text">
                Moment convivial autour d’une activité partagée&nbsp;: découverte
                sensorielle, motricité, éveil musical, contes, activité manuelle, sortie
                nature...
              </p>
            </div>
            <div className="familyContainer__workshop__description__secondPoint">
              <Icon name="arrow-right" height="40px" color="#8bafcf" opacity={0.6} />
              <p className="familyContainer__workshop__description__secondPoint__text">
                Temps de rencontres intergénérationnelles pour les enfants de 0 à 12 ans
                et leurs parents et/ou grands parents.
              </p>
            </div>
          </div>
          <div className="familyContainer__workshop__hourly">
            <div className="familyContainer__workshop__hourly__hollydaysOff">
              <p>Hors vacances scolaires&nbsp;:</p>
              <p>
                Lundi, mardi et jeudi&nbsp;: 9h-11h, salle des fêtes de St Quentin de
                Baron.
              </p>
              <p>Mercredi&nbsp;: 9h30-11h30, salle des fêtes d’Espiet.</p>
            </div>
            <div className="familyContainer__workshop__hourly__hollydaysOn">
              <p>Vacances scolaires&nbsp;:</p>
              <p>Lundi, mercredi et jeudi&nbsp;: 9h30-11h30, salle des fêtes d’Espiet.</p>
              <p>Mardi&nbsp;: 9h-11h, salle des fêtes de St Quentin de Baron.</p>
              <p>Une fois par mois le samedi de 10h à 12h (lieu variable).</p>
            </div>
          </div>
          <div className="familyContainer__workshop__pictures">
            <img src="/assets/workshop1.png" alt="WorkshopImage1" />
            <img src="/assets/workshop2.png" alt="WorkshopImage2" />
          </div>
        </div>
        <div className="familyContainer__parentsThemes">
          <h1 className="familyContainer__parentsThemes__title">Les Parents Thèmes</h1>
          <p className="familyContainer__parentsThemes__sentenceList">
            Temps de parole entre parents et professionnels pour aborder des questions de
            parentalité&nbsp;:
          </p>
          <ul className="familyContainer__parentsThemes__list">
            <li>«&nbsp;Comment gérer les conflits dans la fratrie&nbsp;?&nbsp;»</li>
            <li>
              «&nbsp;Pourquoi mon enfant est plus difficile avec moi qu’avec les
              autres&nbsp;?&nbsp;»
            </li>
            <li>
              «&nbsp;Comment prévenir les troubles du sommeil de enfants et des
              adolescents&nbsp;?&nbsp;»
            </li>
            <li>9 rencontres par an.</li>
            <li>Le vendredi de 19h à 21h à la mairie de Nérigean.</li>
          </ul>
          <div className="familyContainer__parentsThemes__pictures">
            <img src="/assets/parentsTheme1.png" alt="ParentsThemeImage1" />
            <img src="/assets/parentsTheme2.png" alt="ParentsThemeImage2" />
            <img src="/assets/parentsTheme3.png" alt="ParentsThemeImage3" />
          </div>
        </div>
        <div className="familyContainer__comeBackHome">
          <ComeBackHome />
        </div>
      </div>
    </>
  );
};

export default Family;
