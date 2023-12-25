import moment from 'moment';

export const handleFormatDate2 = (date: string) => {
    // 2023-12-23 to 23 Dec 2023
  const formattedDate = moment(date).format('DD MMM YYYY');
  return formattedDate;
};
