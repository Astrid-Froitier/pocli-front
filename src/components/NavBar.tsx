import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks_top, navLinks_bottom } from '../../data/links';
// import CurrentUserContext from '../contexts/CurrentUser';
import Icon from './Icon';

const NavBar = () => {
  // const { id, logout, admin } = useContext(CurrentUserContext);
  return (
    <div className="navBar">
      <div className="navBar__alert">Message d&apos;alerte</div>
      <div className="navBar__box">
        <div className="navBar__box__logo">
          <NavLink to="/">
            <img width={140} src="./assets/pocli.png" alt="pocli's logo" />
          </NavLink>
        </div>
        <div className="navBar__box__links">
          <div className="navBar__box__links__linksTop">
            {navLinks_top.map((link) => (
              <NavLink
                className="navBar__box__links__linksTop__a"
                key={link.id}
                to={link.path}>
                <li className="navBar__box__links__linksTop__a__li">
                  {link.title}
                  {link.title === 'Connexion' && (
                    <Icon name="user" height="30px" color="#af3d3d" />
                  )}
                </li>
              </NavLink>
            ))}
          </div>

          <div className="navBar__box__links__linksBottom">
            {navLinks_bottom.map((link) => (
              <NavLink
                className="navBar__box__links__linksBottom__a"
                key={link.id}
                to={link.path}>
                <li className="navBar__box__links__linksBottom__a__li">{link.title}</li>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
