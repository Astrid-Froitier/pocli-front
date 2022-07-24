const dateNowToDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}/0${month}/${year}`;
};

export default dateNowToDate;
