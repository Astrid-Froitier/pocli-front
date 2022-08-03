import React, { useContext, useEffect } from 'react';

import { getAllDataWithoutCredential } from '../../helpers/axios';
import CurrentDataContext from '../contexts/CurrentData';
import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import PartnersList from './PartnersList';

const about = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { pocliMembers, setPocliMembers, setPartners } = useContext(CurrentDataContext);

  useEffect(() => {
    let urls = [
      'https://wild-pocli.herokuapp.com/api/pocliMembers',
      'https://wild-pocli.herokuapp.com/api/partners',
    ];

    getAllDataWithoutCredential(urls)
      .then((res) => {
        setPocliMembers(res[0].data);
        setPartners(res[1].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="aboutBanner">
        <h1>Qui sommes-nous&nbsp;?</h1>
      </div>
      <Banner
        nameBannerActivity=""
        title="Qui sommes-nous ?"
        // nameIcone=""
        memberFilter={false}
        bannerAbout={true}
        bannerEvent={false}
        bannerMember={false}
      />
      <div className="aboutContainer">
        <div className="aboutContainer__header">
          <div className="aboutContainer__header__slogan">
            <span>PoCLi,&nbsp;</span>
            <span className="aboutContainer__header__slogan__blue-pocli-text">PO</span>
            <span>ur&nbsp;</span>
            <span className="aboutContainer__header__slogan__green-pocli-text">C</span>
            <span>réer&nbsp;</span>
            <span>du&nbsp;</span>
            <span className="aboutContainer__header__slogan__red-pocli-text">LI</span>
            <span>en,&nbsp;</span>
            <span>voilà l’essence même de l’association&nbsp;!</span>
            <p>
              PoCLi est un Espace de Vie Sociale, un lieu de rencontres, de partages et
              d’échanges.
            </p>
          </div>

          <div className="aboutContainer__header__firstText">
            <p>Nos objectifs associatifs découlent de notre sigle&nbsp;:</p>
            <p> – Créer du lien entre les personnes,</p>
            <p> – Favoriser l’intégration des habitants sur le territoire,</p>
            <p> – Permettre l’épanouissement individuel et collectif,</p>
            <p> – Proposer des activités attractives,</p>
            <p> – Favoriser le bien vivre ensemble,</p>
            <p> – Animer le territoire.</p>
          </div>
          <div className="aboutContainer__header__secondText">
            <p>Nos activités s’articulent autour 4 pôles d’activités&nbsp;:</p>
            <p>– La famille et la parentalité,</p>
            <p>– Les activités physiques et le bien-être,</p>
            <p>– La prévention et l’action sociale,</p>
            <p>– L’animation du territoire.</p>
          </div>
          <div className="aboutContainer__header__association">
            <p>
              L’association emploie 2 salariées. Elle est gouvernée par une équipe de
              bénévoles dynamiques et impliqués. Nous restons à votre écoute pour proposer
              des actions qui répondent à vos besoins.
            </p>
          </div>
        </div>
        {/* balise pour rajouter directement les membres de l'association */}
        <div className="aboutContainer__associationMembers">
          {pocliMembers &&
            pocliMembers.map(
              (pocliMembers, index) =>
                pocliMembers.url && (
                  <div className="aboutContainer__associationMembers__card" key={index}>
                    <img
                      className="aboutContainer__associationMembers__card__img"
                      src={pocliMembers.url}
                      alt="Members"
                    />
                    <div className="aboutContainer__associationMembers__card__name">
                      <p>{pocliMembers.firstname}</p>
                      <p>{pocliMembers.lastname}</p>
                      <p>{pocliMembers.function}</p>
                    </div>
                  </div>
                ),
            )}
        </div>
        <div className="aboutContainer__partners">
          <PartnersList />
        </div>
        <div className="aboutContainer__comeBackHome">
          <ComeBackHome />
        </div>
      </div>
    </>
  );
};

export default about;
