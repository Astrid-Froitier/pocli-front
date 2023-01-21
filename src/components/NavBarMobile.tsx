import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, NavLink, useNavigate } from 'react-router-dom';

import { navLinks_bottom, navLinks_top, navLinks_topConnected } from '../../data/links';
import CurrentUserContext from '../contexts/CurrentUser';
import Icon from './Icon';

const NavBarMobile = () => {
  // state
  const [isOpen, setIsOpen] = useState(false);
  // function
  const { user, logout } = useContext(CurrentUserContext);
  const navigate: NavigateFunction = useNavigate();

  function redirectHome() {
    navigate('/');
  }
  const handleLogout = () => {
    logout();
    redirectHome();
    setIsOpen(!isOpen);
  };

  const showDialog = () => {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const screenHeight = screen.height;
    const finalScroll = parseInt(scrollY) - screenHeight + 100;
    console.log(finalScroll);

    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${finalScroll}px`;
  };
  const closeDialog = () => {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });
  };

  // useEffect permettant d'empêcher le scroll sur Y suivant l'état de modalOnOff
  useEffect(() => {
    {
      isOpen ? showDialog() : closeDialog();
    }
  }, [isOpen]);

  return (
    <div className="navBarMobile">
      {isOpen ? (
        <div className="navBarMobile">
          <div className="navBarMobile__banner">
            <NavLink
              to="/"
              className="navBarMobile__banner__img"
              onClick={handleClick}
              onKeyDown={handleClick}
              role="button"
              tabIndex={0}>
              <img src="/assets/pocli.png" alt="logo pocli" />
            </NavLink>
            <div
              className="navBarMobile__banner__button"
              onClick={handleClick}
              onKeyDown={handleClick}
              role="button"
              tabIndex={0}>
              <Icon name="xmark" width="25px" color="#3d79af" />
            </div>
          </div>
          <div className="navBarMobile__links">
            <div className="navBarMobile__links__linksBottom">
              {navLinks_bottom.map((link) => (
                <NavLink
                  onClick={handleClick}
                  onKeyDown={handleClick}
                  className="navBarMobile__links__linksBottom__a"
                  key={link.id}
                  to={link.path}>
                  <li className="navBarMobile__links__linksBottom__a__li">
                    {link.title}
                  </li>
                </NavLink>
              ))}
            </div>
            <div className="navBarMobile__links__linksTop">
              {user.id === 0
                ? navLinks_top.map((link) => (
                    <NavLink
                      onClick={handleClick}
                      onKeyDown={handleClick}
                      className="navBarMobile__links__linksTop__a"
                      key={link.id}
                      to={link.path}>
                      <li className="navBarMobile__links__linksTop__a__li">
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
                        onClick={handleClick}
                        onKeyDown={handleClick}
                        className="navBarMobile__links__linksTop__a"
                        key={link.id}
                        to={link.path}>
                        <li className="navBarMobile__links__linksTop__a__liFamily">
                          Famille {user.name}
                        </li>
                      </NavLink>
                    ) : link.id === 5 ? (
                      <div
                        onKeyDown={handleLogout}
                        role="button"
                        tabIndex={0}
                        className="navBarMobile__links__linksTop__a"
                        onClick={handleLogout}
                        key={link.id}>
                        <li className="navBarMobile__links__linksTop__a__li">
                          {link.title}
                          <Icon name="disconnection" height="30px" color="#af3d3d" />
                        </li>
                      </div>
                    ) : (
                      <NavLink
                        onClick={handleClick}
                        onKeyDown={handleClick}
                        className="navBarMobile__links__linksTop__a"
                        key={link.id}
                        to={link.path}>
                        <li className="navBarMobile__links__linksTop__a__li">
                          {link.title}
                        </li>
                      </NavLink>
                    ),
                  )}
            </div>
          </div>
        </div>
      ) : (
        <div className="navBarMobile__banner">
          <div className="navBarMobile__banner__img">
            <NavLink to="/" className="navBarMobile__banner__img">
              <img src="/assets/pocli.png" alt="logo pocli" width={90} height={60} />
            </NavLink>
          </div>
          <div
            className="navBarMobile__banner__button"
            onClick={handleClick}
            onKeyDown={handleClick}
            role="button"
            tabIndex={0}>
            <Icon name="bars" width="25px" color="#3d79af" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarMobile;
