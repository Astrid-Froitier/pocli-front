import React from 'react';

import IButton from '../interfaces/IButton';

const Button = ({ text }: IButton) => {
  return <div className="buttonContainer">{text}</div>;
};

export default Button;
