import moment from 'moment';

//format moment
const calcAge = (date) => {
	if (moment().isBefore(date)) {
		return '';
	} else {
		const years = moment().diff(date, 'years', false);
		return years;
	}
};

export default calcAge;
