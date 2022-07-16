import React, { useEffect } from 'react';

interface ModalAdherentProps {
  modalAdherentInfo: boolean;
  modalAdherentPwd: boolean;
  setModalAdherentInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setModalAdherentPwd: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOnOff: React.Dispatch<React.SetStateAction<string>>;
}

const ModalAdherent = ({
  setModalAdherentPwd,
  setModalAdherentInfo,
  setModalOnOff,
  modalAdherentInfo,
  modalAdherentPwd,
}: ModalAdherentProps) => {
  // handleClick permettant d'afficher l'évènement cliqué sous forme de modale
  const handleClick = () => {
    setModalOnOff('');
  };

  // useEffect permettant de libérer le scroll sur x lorsque le composant se démonte (en cas de changement de page avec la modale ouverte)
  useEffect(() => {
    return () => {
      document.documentElement.style.setProperty('overflow-y', 'scroll');
      setModalAdherentInfo(false);
      setModalAdherentPwd(false);
    };
  }, []);

  return (
    <div className="modalAdherent">
      <div
        className="modalAdherent__overlay"
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex={0}></div>
      <div className="modalAdherent__box">
        {modalAdherentInfo && (
          <div className="modalAdherent__box__infos">
            <div className="modalAdherent__box__infos__family">
              <h1>Nom de famille:</h1>
              <h2>Mon Mirail de Fontainebleau</h2>
              <div className="modalAdherent__box__infos__family__address">
                <h2>Addresse:</h2>
                <ul>
                  <li>168 route du hameau</li>
                  <li>92000 Chatenây Malabry</li>
                </ul>
              </div>
              <div className="modalAdherent__box__infos__family__mail">
                <h2>Email:</h2>
                <p className="modalAdherent__box__infos__family__mail__p">
                  monmiraildeboisdebou@gmail.com
                </p>
              </div>
              <div className="modalAdherent__box__infos__family__recipient">
                <h2>Régime sociale:</h2>
                <p>CAF</p>
              </div>
              <div className="modalAdherent__box__infos__family__isActived">
                <h2>Compte actif:</h2>
                <input type="checkbox" name="check" value="{isActived = true}" />
              </div>
            </div>
            <div className="modalAdherent__box__infos__hr"></div>
            <div className="modalAdherent__box__infos__familyMembers">
              <div className="modalAdherent__box__infos__familyMembers__firstname">
                <h2>Prénom:</h2>
                <p>Gaudefrois</p>
              </div>
              <div className="modalAdherent__box__infos__familyMembers__birthday">
                <h2>Date anniversaire:</h2>
                <p>1859</p>
              </div>
              <div className="modalAdherent__box__infos__familyMembers__activities">
                <h2>Activités Souscrite:</h2>
                <ul>
                  {/* avec un map qui recupère les activités souscrite */}
                  <li>idFamilyMemberActivity</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {modalAdherentPwd && (
          <div className="modalAdherent__box__password">Password:</div>
        )}
      </div>
    </div>
  );
};

export default ModalAdherent;
