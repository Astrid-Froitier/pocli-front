import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  footerLinks_mention,
  footerLinks_pocli,
  navLinks_bottom,
} from '../../data/links';
import Icon from './Icon';

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerContainer__footerLinks">
        <div className="footerContainer__footerLinks__footerLinksTop">
          <h4>Pocli</h4>
          {footerLinks_pocli &&
            footerLinks_pocli.map((link) => (
              <NavLink
                className="footerContainer__footerLinks__footerLinksTop__a"
                key={link.id}
                to={link.path}>
                <li className="footerContainer__footerLinks__footerLinksTop__a__li">
                  {link.title}
                </li>
              </NavLink>
            ))}
        </div>
        <div className="footerContainer__footerLinks__footerLinksBottom">
          <h4>Pôles d&apos;activité</h4>
          {navLinks_bottom &&
            navLinks_bottom.map((link) => (
              <NavLink
                className="footerContainer__footerLinks__footerLinksBottom__a"
                key={link.id}
                to={link.path}>
                <li className="footerContainer__footerLinks__footerLinksBottom__a__li">
                  {link.title}
                </li>
              </NavLink>
            ))}
        </div>
        <div className="footerContainer__footerLinks__logo">
          <h4>Retrouvez nous sur:</h4>
          <Icon name="facebook" width="50px" height="40px" color="white" />
        </div>
      </div>

      <div className="footerContainer__mention">
        <div className="footerContainer__mention__h6">
          <h6>Pocli - Pour créer des liens - 4 Ribeyreau, 33420 Espiet</h6>
          <div className="footerContainer__mention__h6__list">
            {footerLinks_mention &&
              footerLinks_mention.map((link) => (
                <NavLink
                  className="footerContainer__mention__h6__a"
                  key={link.id}
                  to={link.path}>
                  <li className="footerContainer__mention__h6__a__li">{link.title}</li>
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
