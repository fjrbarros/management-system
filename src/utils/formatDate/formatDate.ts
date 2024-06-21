export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${date.getDate()}/${formattedMonth}/${date.getFullYear()}`;

  return formattedDate;
};
