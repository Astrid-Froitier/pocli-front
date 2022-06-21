import React from 'react';
import { NavLink } from 'react-router-dom';

import navLinks_bottom from '../../data/navLinks_bottom';
// import CurrentUserContext from '../contexts/CurrentUser';
import navLinks_top from '../../data/navLinks_top';

const NavBar = () => {
  // const { id, logout, admin } = useContext(CurrentUserContext);
  return (
    <div className="">
      <div className="alert">Message d&apos;alerte</div>
      <div className="navBar">
        <NavLink to="/">
          <img width={200} src="./assets/pocli.png" alt="pocli's logo" />
        </NavLink>
        <div className="navBar__links">
          <div className="navBar__links__linksTop">
            {navLinks_top.map((link) => (
              <NavLink
                className="navBar__links__linksTop__a"
                key={link.id}
                to={link.path}>
                <li className="navBar__links__linksTop__a__li">
                  {link.title}
                  {link.img}
                </li>
              </NavLink>
            ))}
            <img width={20} src="./assets/icone_connexion.png" alt="icone's connexion" />
          </div>

          <div className="navBar__links__linksBottom">
            {navLinks_bottom.map((link) => (
              <NavLink
                className="navBar__links__linksBottom__a"
                key={link.id}
                to={link.path}>
                <li className="navBar__links__linksBottom__a__li">{link.title}</li>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="app__navBar">
        <nav className="app__navBar__nav">
          <div className="app__navBar__nav__linksTop">
            <NavLink className="app__navBar__nav__linksTop__link" to="/about">
              Qui sommes nous ?
            </NavLink>
            <NavLink className="app__navBar__nav__linksTop__link" to="/events">
              Évènements
            </NavLink>
            <NavLink className="app__navBar__nav__linksTop__link" to="/contact">
              Contact
            </NavLink> */}
      {/* <NavLink to="/click">Click</NavLink>
            {admin === true && <a href="http://localhost:3001/">Admin panel</a>}
            {id === 0 ? (
              <NavLink className="app__navBar__nav__linksTop__link" to="/login">
                Connexion
              </NavLink>
            ) : (
              <button className="logout" onClick={() => logout()}>
                Se déconnecter
              </button>
            )}
      </div>
        </nav>
      </div> */}
    </div>
  );
};

export default NavBar;
