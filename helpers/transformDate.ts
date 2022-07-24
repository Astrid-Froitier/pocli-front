const transformDate = (date: string) => {
  const dateArray = date.split('T')[0].split('-');
  return dateArray.sort((a, b) => dateArray.indexOf(b) - dateArray.indexOf(a)).join('/');
};

const todaysDateLower = (dateToCompare: string) => {
  const todaysDate = new Date();
  const date = new Date(dateToCompare);

  return todaysDate > date ? false : true;
};

export { transformDate, todaysDateLower };
