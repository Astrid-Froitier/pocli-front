import {transformDate} from './transformDate';
const compareDates = (actualDate: string, dateToCompare: string) => {
  const firstDate = actualDate.split('/').map((date) => parseInt(date));
  const secondDate = transformDate(dateToCompare)
    .split('/')
    .map((date) => parseInt(date));
  return firstDate[2] < secondDate[2]
    ? true
    : firstDate[2] <= secondDate[2] && firstDate[1] < secondDate[1]
    ? true
    : firstDate[2] <= secondDate[2] &&
      firstDate[1] <= secondDate[1] &&
      firstDate[0] <= secondDate[0]
    ? true
    : false;
};

export default compareDates;
