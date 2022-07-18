import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
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
  };
  // debug

  return (
    <div className="navBarMobile">
      {isOpen ? (
        <div className="navBarMobile">
          <div className="navBarMobile__banner">
            <NavLink to="/" className="navBarMobile__banner__img">
              <img
                src="../../public/assets/pocli.png"
                alt="logo pocli"
                width={140}
                height={100}
              />
            </NavLink>
            {isOpen ? (
              <AiOutlineClose
                className="navBarMobile__banner__button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={() => setIsOpen(!isOpen)}
                role="presentation"
                area-hidden="true"
              />
            ) : (
              ''
            )}
          </div>
          <div className="navBarMobile__links">
            <div className="navBarMobile__links__linksBottom">
              {navLinks_bottom.map((link) => (
                <NavLink
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
                        className="navBarMobile__links__linksTop__a__liFamily"
                        key={link.id}
                        to={link.path}>
                        <li className="">Famille {user.name}</li>
                      </NavLink>
                    ) : link.id === 5 ? (
                      <div
                        onKeyDown={handleLogout}
                        role="button"
                        tabIndex={0}
                        className="navBarMobile__links__linksTop__a"
                        onClick={handleLogout}
                        key={link.id}>
                        <li className="">
                          {link.title}
                          <Icon name="disconnection" height="30px" color="#af3d3d" />
                        </li>
                      </div>
                    ) : (
                      <NavLink className="" key={link.id} to={link.path}>
                        <li className="">{link.title}</li>
                      </NavLink>
                    ),
                  )}
            </div>
          </div>
        </div>
      ) : (
        <div className="navBarMobile__banner">
          <div className="navBarMobile__banner__img">
            <img
              src="../../public/assets/pocli.png"
              alt="logo pocli"
              width={140}
              height={100}
            />
          </div>
          <GiHamburgerMenu
            className="navBarMobile__banner__button"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={() => setIsOpen(!isOpen)}
            role="presentation"
            area-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default NavBarMobile;
