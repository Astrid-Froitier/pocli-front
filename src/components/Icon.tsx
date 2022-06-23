import React from 'react';
import IIcon from '../interfaces/IIcon';
import svgs from '../../data/svgs'

const Icon = ({ name, width, height, color, opacity }: IIcon) => {
  return (
    <>
      {svgs.map((svg)=> svg.name === name && (
        <svg
          className="icon"
          width={width}
          height={height}
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={svg.viewBox}>
          <path d={svg.path}/>
        </svg>
      ))}
    </>
  );
};

export default Icon;
