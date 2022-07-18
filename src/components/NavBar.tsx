import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { navLinks_bottom, navLinks_top, navLinks_topConnected } from '../../data/links';
import CurrentUserContext from '../contexts/CurrentUser';
import Icon from './Icon';

const NavBar = () => {
  const { user, logout } = useContext(CurrentUserContext);
  const navigate: NavigateFunction = useNavigate();

  function redirectHome() {
    navigate('/');
  }
  const handleLogout = () => {
    logout();
    redirectHome();
  };
  return (
    <div className="navBar">
      <div className="navBar__alert">Message d&apos;alerte</div>
      <div className="navBar__box">
        <div className="navBar__box__logo">
          <NavLink to="/">
            <img
              className="navBar__box__logo__img"
              width={140}
              src="./assets/pocli.png"
              alt="pocli's logo"
            />
          </NavLink>
        </div>
        <div className="navBar__box__links">
          <div className="navBar__box__links__linksTop">
            {user.id === 0
              ? navLinks_top.map((link) => (
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
                ))
              : navLinks_topConnected.map((link) =>
                  link.id === 4 ? (
                    <NavLink
                      className="navBar__box__links__linksTop__a"
                      key={link.id}
                      to={link.path}>
                      <li className="navBar__box__links__linksTop__a__liFamily">
                        Famille {user.name}
                      </li>
                    </NavLink>
                  ) : link.id === 5 ? (
                    <div
                      onKeyDown={handleLogout}
                      role="button"
                      tabIndex={0}
                      className="navBar__box__links__linksTop__a"
                      onClick={handleLogout}
                      key={link.id}>
                      <li className="navBar__box__links__linksTop__a__li">
                        {link.title}
                        <Icon name="disconnection" height="30px" color="#af3d3d" />
                      </li>
                    </div>
                  ) : (
                    <NavLink
                      className="navBar__box__links__linksTop__a"
                      key={link.id}
                      to={link.path}>
                      <li className="navBar__box__links__linksTop__a__li">
                        {link.title}
                      </li>
                    </NavLink>
                  ),
                )}
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
