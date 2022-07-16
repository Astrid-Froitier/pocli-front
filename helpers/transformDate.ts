const transformDate = (date: string) => {
  const dateArray = date.split('T')[0].split('-');
  return dateArray.sort((a, b) => dateArray.indexOf(b) - dateArray.indexOf(a)).join('/');
};

export default transformDate;
