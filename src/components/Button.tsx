import React from 'react';
import { NavLink } from 'react-router-dom';

interface ButtonProps {
  text: string;
  link?: string;
}

const Button = ({ text, link = '' }: ButtonProps) => {
  return link ? (
    <NavLink to={link}>
      <div className="buttonContainer">{text}</div>
    </NavLink>
  ) : (
    <div className="buttonContainer">{text}</div>
  );
};

export default Button;
