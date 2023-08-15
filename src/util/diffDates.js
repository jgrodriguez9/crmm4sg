import moment from 'moment';

const diffDates = (initDate, endDate, type) => {
	if (initDate && endDate && type) {
		const stDate = moment(initDate, 'YYYY-MM-DD');
		const eDate = moment(endDate, 'YYYY-MM-DD');

		return eDate.diff(stDate, type);
	}
	return '';
};

export default diffDates;
