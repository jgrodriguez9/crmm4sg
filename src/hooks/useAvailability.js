import { useEffect, useState } from 'react';
import { getAvailabilityUrl } from '../util/getAvailabilityUrl';

const useAvailability = () => {
	const [url, setUrl] = useState(null);
	const [dateStart, setDateStart] = useState(null);
	const [dateEnd, setDateEnd] = useState(null);
	const [hotelId, setHotelId] = useState(null);

	useEffect(() => {
		const urlBuilded = getAvailabilityUrl(hotelId, dateStart, dateEnd);
		setUrl(urlBuilded);
	}, [hotelId, dateStart, dateEnd]);

	return {
		url,
		setUrl,
		setDateStart,
		setDateEnd,
		setHotelId,
	};
};

export default useAvailability;
