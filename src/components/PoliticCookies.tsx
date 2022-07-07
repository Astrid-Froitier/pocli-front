import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import ComeBackHome from './ComeBackHome';
import Icon from './Icon';

const PoliticCookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [listFb, setListFb] = useState(false);
  const [listYt, setListYt] = useState(false);
  const [listWild, setListWild] = useState(false);
  const [listReact, setListReact] = useState(false);
  const [listSql, setListSql] = useState(false);

  const handleClickListFb = () => {
    setListFb(!listFb);
  };
  const handleClickListYt = () => {
    setListYt(!listYt);
  };
  const handleClickListWild = () => {
    setListWild(!listWild);
  };
  const handleClickListReact = () => {
    setListReact(!listReact);
  };
  const handleClickListSql = () => {
    setListSql(!listSql);
  };

  return (
    <div className="">
      <Banner
        nameBannerActivity=""
        title="Politique de Cookies"
        nameIcon=""
        memberFilter={false}
        bannerAbout={false}
        bannerEvent={false}
        bannerMember={false}
      />
      <div className="politicCookies">
        <div className="politicCookies__politicSectionContainer">
          <div className="politicCookies__politicSectionContainer__politicCookiesPreambul">
            <h1>Politique de cookies</h1>
            <h2>
              Nous sommes respectueux de la protection de vos données personnelles.
              Retrouvez notre politique en la matière.
            </h2>
            <p>
              Cette politique de cookies a été mise à jour pour la dernière fois le 1
              avril 2022 et s’applique aux citoyens et aux résidents permanents légaux de
              l’Espace Économique Européen et de la Suisse.{' '}
            </p>
          </div>
          <div className="politicCookies__politicSectionContainer__politicCookiesIntro">
            <h2>1. Introduction</h2>
            <p>
              Notre site web, https://www.pocli.fr (ci-après : « le site web ») utilise
              des cookies et autres technologies liées (par simplification, toutes ces
              technologies sont désignées par le terme « cookies »). Des cookies sont
              également placés par des tierces parties que nous avons engagées. Dans le
              document ci-dessous, nous vous informons de l’utilisation des cookies sur
              notre site web.{' '}
            </p>
          </div>
          <div className="politicCookies__politicSectionContainer__politicCookiesWhat">
            <h2>2. Que sont les cookies ?</h2>
            <p>
              Un cookie est un petit fichier simple envoyé avec les pages de ce site web
              et stocké par votre navigateur sur le disque dur de votre ordinateur ou d’un
              autre appareil. Les informations qui y sont stockées peuvent être renvoyées
              à nos serveurs ou aux serveurs des tierces parties concernées lors d’une
              visite ultérieure.{' '}
            </p>
            <div className="politicCookies__politicSectionContainer__politicCookiesScript">
              <h2>3. Que sont les scripts ?</h2>
              <p>
                Un script est un élément de code utilisé pour que notre site web
                fonctionne correctement et de manière interactive. Ce code est exécuté sur
                notre serveur ou sur votre appareil.{' '}
              </p>
            </div>
            <div className="politicCookies__politicSectionContainer__politicCookiesBalis">
              <h2>4. Qu’est-ce qu’une balise invisible ?</h2>
              <p>
                Une balise invisible (ou balise web) est un petit morceau de texte ou
                d’image invisible sur un site web, utilisé pour suivre le trafic sur un
                site web. Pour ce faire, diverses données vous concernant sont stockées à
                l’aide de balises invisibles.{' '}
              </p>
            </div>
            <div className="politicCookies__politicSectionContainer__politicCookiesCookiesList">
              <h2>5. Cookies</h2>
              <h3>5.1 Cookies techniques ou fonctionnels</h3>
              <p>
                Certains cookies assurent le fonctionnement correct de certaines parties
                du site web et la prise en compte de vos préférences en tant
                qu’utilisateur. En plaçant des cookies fonctionnels, nous vous facilitons
                la visite de notre site web. Ainsi, vous n’avez pas besoin de saisir à
                plusieurs reprises les mêmes informations lors de la visite de notre site
                web et, par exemple, les éléments restent dans votre panier jusqu’à votre
                paiement. Nous pouvons placer ces cookies sans votre consentement.{' '}
              </p>
              <h3>5.2 Cookies statistiques</h3>
              <p>
                Nous utilisons des cookies statistiques afin d’optimiser l’expérience des
                utilisateurs sur notre site web. Avec ces cookies statistiques, nous
                obtenons des informations sur l’utilisation de notre site web. Nous
                demandons votre permission pour placer des cookies statistiques.{' '}
              </p>
              <h3>5.3 Cookies de marketing/suivi</h3>
              <p>
                Les cookies de marketing/suivi sont des cookies ou toute autre forme de
                stockage local, utilisés pour créer des profils d’utilisateurs afin
                d’afficher de la publicité ou de suivre l’utilisateur sur ce site web ou
                sur plusieurs sites web dans des finalités marketing similaires.{' '}
              </p>
            </div>
            <div className="politicCookies__politicSectionContainer__politicCookiesPlaced">
              <h2>6. Cookies placés</h2>
              <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List">
                <ul>
                  <li
                    aria-hidden
                    onKeyDown={handleClickListFb}
                    onClick={() => {
                      handleClickListFb();
                    }}>
                    <div className='politicCookies__politicSectionContainer__politicCookiesPlaced__List__Align'>
                    <h2>Facebook</h2>
                    <Icon name="arrow-list" width="20px" height="20px" color="black"/>
                  </div>
                    {listFb && (
                      <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer">
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Utilisation</h3>
                          <p>
                            Nous utilisons Facebook pour l’affichage de publications
                            sociales récentes et/ou des boutons de partage de réseaux
                            sociaux.
                          </p>
                        </div>
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Partage de données</h3>
                          <p>
                          Pour plus d’informations, veuillez lire la déclaration de confidentialité Facebook.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                  <li
                    aria-hidden
                    onKeyDown={handleClickListYt}
                    onClick={() => {
                      handleClickListYt();
                    }}>
                      <div className='politicCookies__politicSectionContainer__politicCookiesPlaced__List__Align'>
                    <h2>Youtube</h2>
                    <Icon name="arrow-list" width="20px" height="20px" color="black"/>
                  </div>
                    {listYt && (
                      <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer">
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Utilisation</h3>
                          <p>
                            Nous utilisons Youtube pour l’affichage de publications
                            sociales récentes et/ou des boutons de partage de réseaux
                            sociaux.
                          </p>
                        </div>
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Partage de données</h3>
                          <p>
                          Pour plus d’informations, veuillez lire la déclaration de confidentialité YouTube.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                  {/* <li
                    aria-hidden
                    onKeyDown={handleClickListWild}
                    onClick={() => {
                      handleClickListWild();
                    }}>
                      <div className='politicCookies__politicSectionContainer__politicCookiesPlaced__List__Align'>
                    <h2>Wild Corp</h2>
                    <img src='../../public/assets/down.png' width={'30px'}/>
                  </div>
                    {listWild && (
                      <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer">
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Utilisation</h3>
                          <p>
                            Nous utilisons Facebook pour l’affichage de publications
                            sociales récentes et/ou des boutons de partage de réseaux
                            sociaux.
                          </p>
                        </div>
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Partage de données</h3>
                          <p>
                          Ces données ne sont pas partagées avec des tierces parties.
                          </p>
                        </div>
                      </div>
                    )}
                  </li> */}
                  <li
                    aria-hidden
                    onKeyDown={handleClickListReact}
                    onClick={() => {
                      handleClickListReact();
                    }}>
                      <div className='politicCookies__politicSectionContainer__politicCookiesPlaced__List__Align'>
                    <h2>React</h2>
                    <Icon name="arrow-list" width="20px" height="20px" color="black"/>
                  </div>
                    {listReact && (
                      <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer">
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Utilisation</h3>
                          <p>
                            Nous utilisons React pour l’affichage du site Pocli.
                          </p>
                        </div>
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Partage de données</h3>
                          <p>
                          Ces données ne sont pas partagées avec des tierces parties.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                  <li
                    aria-hidden
                    onKeyDown={handleClickListSql}
                    onClick={() => {
                      handleClickListSql();
                    }}>
                      <div className='politicCookies__politicSectionContainer__politicCookiesPlaced__List__Align'>
                    <h2>Sql</h2>
                    <Icon name="arrow-list" width="20px" height="20px" color="black"/>
                  </div>
                    {listSql && (
                      <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer">
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Utilisation</h3>
                          <p>
                            Nous utilisons MySql pour pour gérer la base de donnée du site Pocli.
                          </p>
                        </div>
                        <div className="politicCookies__politicSectionContainer__politicCookiesPlaced__List__BlocContainer__Bloc">
                          <h3>Partage de données</h3>
                          <p>
                          Ces données ne sont pas partagées avec des tierces parties.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div className="politicCookies__politicSectionContainer__politicCookiesConsent">
              <h2>7. Consentement</h2>
              <p>
                Lorsque vous visitez notre site web pour la première fois, nous vous
                montrerons une fenêtre contextuelle avec une explication sur les cookies.
                Dès que vous cliquez sur « Enregistrer les préférences » vous nous
                autorisez à utiliser les catégories de cookies et d’extensions que vous
                avez sélectionnés dans la fenêtre contextuelle, comme décrit dans la
                présente politique de cookies. Vous pouvez désactiver l’utilisation des
                cookies via votre navigateur, mais veuillez noter que notre site web
                pourrait ne plus fonctionner correctement.{' '}
              </p>
              <h2>7.1 Réglage obligatoire</h2>
              <p>
                Le stockage ou l’accès technique est strictement nécessaire dans la
                finalité d’intérêt légitime de permettre l’utilisation d’un service
                spécifique explicitement demandé par l’abonné ou l’utilisateur, ou dans le
                seul but d’effectuer la transmission d’une communication sur un réseau de
                communications électroniques.
              </p>
            </div>
            <div className="politicCookies__politicSectionContainer__politicCookiesData">
              <h2>8. Vos droits concernant les données personnelles</h2>
              <p>Vous avez les droits suivants concernant vos données personnelles :</p>
              <div className="politicCookies__politicSectionContainer__politicCookiesData__politicCookiesDataList">
                <ul>
                  <li>
                    Vous avez le droit de savoir pourquoi vos données personnelles sont
                    nécessaires, ce qui leur arrivera et combien de temps elles seront
                    conservées.
                  </li>
                  <li>
                    Droit d’accès : vous avez le droit d’accéder à vos données
                    personnelles que nous connaissons.
                  </li>
                  <li>
                    Droit de rectification : vous avez le droit à tout moment de
                    compléter, corriger, faire supprimer ou bloquer vos données
                    personnelles.
                  </li>
                  <li>
                    Si vous nous donnez votre consentement pour le traitement de vos
                    données, vous avez le droit de révoquer ce consentement et de faire
                    supprimer vos données personnelles.
                  </li>
                  <li>
                    Droit de transférer vos données : vous avez le droit de demander
                    toutes vos données personnelles au responsable du traitement et de les
                    transférer dans leur intégralité à un autre responsable du traitement.
                  </li>
                  <li>
                    Droit d’opposition : vous pouvez vous opposer au traitement de vos
                    données. Nous obtempérerons, à moins que certaines raisons ne
                    justifient ce traitement.
                  </li>
                </ul>
              </div>
            </div>
            <div className="politicContainer__politicSectionContainer__politicCookiesActive">
              <h2>9. Activer/désactiver et supprimer les cookies</h2>
              <p>
                Vous pouvez utiliser votre navigateur internet pour supprimer
                automatiquement ou manuellement les cookies. Vous pouvez également
                spécifier que certains cookies ne peuvent pas être placés. Une autre
                option consiste à modifier les réglages de votre navigateur Internet afin
                que vous receviez un message à chaque fois qu’un cookie est placé. Pour
                plus d’informations sur ces options, reportez-vous aux instructions de la
                section Aide de votre navigateur.
              </p>
              <p>
                Veuillez noter que notre site web peut ne pas marcher correctement si tous
                les cookies sont désactivés. Si vous supprimez les cookies dans votre
                navigateur, ils seront de nouveau placés après votre consentement lorsque
                vous revisiterez nos sites web.
              </p>
            </div>
            <div className="politicContainer__politicSectionContainer__politicCookiesContact">
              <h2>10. Coordonnées</h2>
              <p>pocli.asso@gmail.com</p>
              <p>07 64 15 27 11</p>
              <p>Lundi, mardi, jeudi, vendredi - de 9h à 12h30 et de 14h à 16h30</p>
              <p>4 Ribeyreau, 33420 Espiet</p>
            </div>
          </div>
        </div>
      </div>
      <ComeBackHome />
    </div>
  );
};

export default PoliticCookies;
