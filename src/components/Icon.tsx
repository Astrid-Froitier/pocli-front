import React from 'react';

import svgs from '../../data/svgs';

interface IconProps {
  name: string;
  width?: string;
  height?: string;
  color?: string;
  opacity?: number;
}

const Icon = ({ name, width, height, color, opacity }: IconProps) => {
  return (
    <>
      {svgs.map(
        (svg, index) =>
          svg.name === name && (
            <svg
              key={index}
              className="icon"
              width={width}
              height={height}
              fill={color}
              opacity={opacity}
              xmlns="http://www.w3.org/2000/svg"
              viewBox={svg.viewBox}>
              <path d={svg.path} />
            </svg>
          ),
      )}
    </>
  );
};

export default Icon;
