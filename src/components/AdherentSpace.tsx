import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import getAllData from '../../helpers/axios';
import CurrentUserContext from '../contexts/CurrentUser';
import Banner from './Banner';
import ModalAdherent from './ModalAdherent';

const AdherentSpace = () => {
  // useContext pour la data
  const { user } = useContext(CurrentUserContext);
  console.log(user); // useContext(CurrentUserContext);

  const [modalOnOff, setModalOnOff] = useState<string>('');
  const [modalAdherentInfo, setModalAdherentInfo] = useState<boolean>(false);
  const [modalAdherentPwd, setModalAdherentPwd] = useState<boolean>(false);

  // handleClick permettant d'afficher l'évènement cliqué sous forme de modale
  const handleClickInfo = () => {
    setModalAdherentInfo(!modalAdherentInfo);
    setModalOnOff('modal');
  };
  const handleClickPwd = () => {
    setModalAdherentPwd(!modalAdherentPwd);
    setModalOnOff('modal');
  };

  // useEffect permettant de remonter la page en top au montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect permettant de get l'ensemble des informations liées aux évènements (axios)
  useEffect(() => {
    let urls = [
      'https://wild-pocli.herokuapp.com/api/families/:idfamily/familyMembers/:idfamilymember',
      'https://wild-pocli.herokuapp.com/api/families/:idfamily/paymentrecords/:idpaymentrecord',
    ];

    getAllData(urls)
      .then((res) => {
        setModalAdherentInfo(res[0].data);
        setModalAdherentPwd(res[1].data);
        console.log(res[0].data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect permettant d'empêcher le scroll sur x suivant l'état de modalOnOff
  useEffect(() => {
    {
      modalOnOff && document.documentElement.style.setProperty('overflow-y', 'hidden');
    }
  }, [modalOnOff]);

  return (
    <>
      <div>
        <Banner
          nameBannerActivity=""
          title="Mon espace adhérent"
          nameIcon=""
          memberFilter={true}
          bannerAbout={false}
          bannerEvent={false}
          bannerMember={true}
        />
        <div className={`adherentSpaceContainer ${modalOnOff}`}>
          <div className="adherentSpaceContainer__left">
            <h1>Tableau de bord</h1>
            <p>
              Mes évènements - <span>2</span> à venir
            </p>
            <NavLink to="/messaging">
              <p>
                Mes messages - <span>3</span> non lu(s)
              </p>
            </NavLink>
            <NavLink to="/documents">
              <p>
                Mes documents - <span>0</span> non lu(s)
              </p>
            </NavLink>
          </div>
          <div className="adherentSpaceContainer__right">
            <h1>Mon compte</h1>
            <ul>
              <li className="adherentSpaceContainer__right__info">
                <span
                  onKeyDown={handleClickInfo}
                  tabIndex={0}
                  onClick={handleClickInfo}
                  role="button">
                  Mes informations
                </span>
              </li>

              <li className="adherentSpaceContainer__right__pwd">
                <span
                  onKeyDown={handleClickPwd}
                  tabIndex={0}
                  onClick={handleClickPwd}
                  role="button">
                  Changer mon mot de passe
                </span>
              </li>

              <NavLink to="/contact">
                <p>Nous contacter</p>
              </NavLink>
              <li>Me déconnecter</li>
            </ul>
          </div>
        </div>
      </div>
      {modalOnOff && (
        <ModalAdherent
          setModalAdherentInfo={setModalAdherentInfo}
          setModalAdherentPwd={setModalAdherentPwd}
          modalAdherentInfo={modalAdherentInfo}
          modalAdherentPwd={modalAdherentPwd}
          setModalOnOff={setModalOnOff}
        />
      )}
    </>
  );
};

export default AdherentSpace;
