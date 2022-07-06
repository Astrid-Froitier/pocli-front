import axios from 'axios';

import IEvent from '../src/interfaces/IEvent';

const getEvents = async ({ setEvents }) => {
  // indispensable quand on veut utiliser async/await dans un useEffect
  let url: string = 'http://localhost:3000/api/events';
  try {
    const { data } = await axios.get<IEvent[]>(url);
    setEvents(data);
  } catch (err) {
    console.error(err);
  }
};

export { getEvents };
