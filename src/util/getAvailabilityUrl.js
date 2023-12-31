import moment from 'moment';
import parseObjectToQueryUrl from './parseObjectToQueryUrl';

const getObjectByHotel = (hotelId, dateStart, dateEnd) => {
	switch (hotelId) {
		case 121:
		case 8:
			return {
				f_i: moment(dateStart).format('DD/MM/YYYY'),
				f_f: moment(dateEnd).format('DD/MM/YYYY'),
				hotelid: hotelId,
			};
		case 2:
		case 1:
		case 9:
			return {
				from: moment(dateStart).format('DD/MM/YYYY'),
				to: moment(dateEnd).format('DD/MM/YYYY'),
				'hotel.id': hotelId,
			};
		default:
			return {
				from: moment(dateStart).format('DD/MM/YYYY'),
				to: moment(dateEnd).format('DD/MM/YYYY'),
				'hotel.id': hotelId,
			};
	}
};
const getUrlByHotel = (hotelId) => {
	switch (hotelId) {
		case 121:
		case 8:
			return process.env.REACT_APP_AVAILABILITY_OCEAN_LAGUNA;
		case 2:
		case 1:
		case 9:
			return process.env.REACT_APP_AVAILABILITY_ROYAL_MARINA_RIO;
		default:
			return process.env.REACT_APP_AVAILABILITY_ROYAL_MARINA_RIO;
	}
};

const getAvailabilityUrl = (hotelId, dateStart, dateEnd) => {
	if (hotelId && dateStart && dateEnd) {
		const url = getUrlByHotel(hotelId);
		const objToQuery = getObjectByHotel(hotelId, dateStart, dateEnd);
		const query = parseObjectToQueryUrl(objToQuery);
		return `${url}&${query}`;
	} else {
		return null;
	}
};

export { getAvailabilityUrl, getUrlByHotel };
