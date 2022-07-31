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
      <div className="footerContainer__footerNav">
        <div className="footerContainer__footerNav__box">
          <div className="footerContainer__footerNav__box__footerLinksTop">
            <span>Pocli</span>
            {footerLinks_pocli &&
              footerLinks_pocli.map((link) => (
                <NavLink key={link.id} to={link.path}>
                  <li>{link.title}</li>
                </NavLink>
              ))}
          </div>
          <div className="footerContainer__footerNav__box__footerLinksBottom">
            <span>Pôles d&apos;activité</span>
            {navLinks_bottom &&
              navLinks_bottom.map((link) => (
                <NavLink key={link.id} to={link.path}>
                  <li>{link.title}</li>
                </NavLink>
              ))}
          </div>
          <div className="footerContainer__footerNav__box__social">
            <span>Retrouvez-nous sur&nbsp;:</span>
            <a
              href="https://www.facebook.com/Pocli-250879415353500/?ti=as"
              target="_blank"
              rel="noreferrer">
              <Icon name="facebook" width="50px" height="40px" color="white" />
            </a>
          </div>
        </div>
      </div>

      <div className="footerContainer__legalInformations">
        <div className="footerContainer__legalInformations__box">
          <div className="footerContainer__legalInformations__box__pocli">
            <span>
              Pocli - POur Créer des LIens - 4&nbsp;Ribeyreau,&nbsp;33420&nbsp;Espiet
            </span>
          </div>
          <div className="footerContainer__legalInformations__box__privacy">
            {footerLinks_mention &&
              footerLinks_mention.map((link) => (
                <NavLink key={link.id} to={link.path}>
                  <li>{link.title}</li>
                </NavLink>
              ))}
          </div>
        </div>
        <div className="footerContainer__legalInformations__siret">
          <span>Siret&nbsp;: 508 213 808 00027</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
