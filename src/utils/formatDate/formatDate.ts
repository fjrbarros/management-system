export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateFormatted = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${dateFormatted}/${formattedMonth}/${date.getFullYear()}`;

  return formattedDate;
};
