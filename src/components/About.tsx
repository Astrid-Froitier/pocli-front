import React from 'react';

import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import PartnersList from './PartnersList';

const about = () => {
  return (
    <div>
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
          <h1>PoCLi, POur Créer des LIens, voilà l’essence même de l’association !</h1>
          <h1>
            PoCLi est un Espace de Vie Sociale, un lieu de rencontres, de partages et
            d’échanges.
          </h1>

          <div className="aboutContainer__header__firstText">
            <p>Nos objectifs associatifs découlent de notre sigle :</p>
            <p> – Créer du lien entre les personnes,</p>
            <p> – Favoriser l’intégration des habitants sur le territoire,</p>
            <p> – Permettre l’épanouissement individuel et collectif,</p>
            <p> – Proposer des activités attractives,</p>
            <p> – Favoriser le bien vivre ensemble,</p>
            <p> – Animer le territoire.</p>
          </div>
          <div className="aboutContainer__header__secondText">
            <p>Nos activités s’articulent autour 4 pôles d’activités :</p>
            <p>
              – la famille et la parentalité, – les activités sportives et le bien-être,
            </p>
            <p>– la prévention et l’action sociale,</p>
            <p>– l’animation du territoire.</p>
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
        <div className="aboutContainer__associationMembers"></div>
        <div>
          <PartnersList />
        </div>
        <div className="aboutContainer__comeBackHome">
          <ComeBackHome />
        </div>
      </div>
    </div>
  );
};

export default about;
