import React from 'react';
import { NavLink } from 'react-router-dom';

import IButton from '../interfaces/IButton';

const Button = ({ text, link = '' }: IButton) => {
  return link ? (
    <NavLink to={link}>
      <div className="buttonContainer">{text}</div>
    </NavLink>
  ) : (
    <div className="buttonContainer">{text}</div>
  );
};

export default Button;
