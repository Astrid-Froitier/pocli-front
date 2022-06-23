import React, { useEffect } from 'react';

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <div>Evènements</div>;
};

export default Events;
