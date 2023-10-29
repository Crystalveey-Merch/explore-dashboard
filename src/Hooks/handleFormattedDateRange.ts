import moment from 'moment';

function handleFormattedDateRange(startDate: moment.MomentInput, endDate: moment.MomentInput) {
    startDate = moment(startDate);
    endDate = moment(endDate);

    const formattedStartDate = startDate.format('Do MMM');
    let formattedEndDate = endDate.format('Do MMM');

    if (!startDate.isSame(endDate, 'month')) {
        formattedEndDate = endDate.format('Do MMM YYYY');
    }

    return `${formattedStartDate} - ${formattedEndDate}`;
}

export default handleFormattedDateRange;
