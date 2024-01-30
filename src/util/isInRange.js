import moment from 'moment';

const isInRange = (currentDate, prevDate, nextDate) => {
	const cDateMoment = moment(currentDate, 'YYYY-MM-DD');
	const pDateMoment = moment(prevDate);
	const nDateMoment = moment(nextDate);
	return (
		cDateMoment.isSameOrAfter(pDateMoment) &&
		cDateMoment.isSameOrBefore(nDateMoment)
	);
};

export default isInRange;
