import React from 'react';
import { NavLink } from 'react-router-dom';

import navLinks_bottom from '../../data/navLinks_bottom';
import navLinks_top from '../../data/navLinks_top';

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerContainer__footerLinks">
        <div className="footerContainer__footerLinks__footerLinksTop">
          <h4>Pocli</h4>
          {navLinks_top &&
            navLinks_top.map((link) => (
              <NavLink
                className="footerContainer__footerLinks__footerLinksTop__a"
                key={link.id}
                to={link.path}>
                <li className="footerContainer__footerLinks__footerLinksTop__a__li">
                  {link.title}
                  {link.img}
                </li>
              </NavLink>
            ))}
        </div>
        <div className="footerContainer__footerLinks__footerLinksBottom">
          <h4>Pôles d'activité</h4>
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
          <img className="logoSociaux" alt="logosociaux" />
        </div>
      </div>
      <div className="footerContainer__mention">
        <hr />
        <h6>Pocli - Pour créer des liens - 4 Ribeyreau, 33420 Espiet</h6>
        <h6>Mentions légales - Politique de confidentialité - Politique de cookies. </h6>
      </div>
    </div>
  );
};

export default Footer;
