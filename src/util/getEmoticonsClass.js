const getEmoticonsClass = (key) => {
	const obj = {
		0: ' ri-emotion-normal-line emoticons-no-contact',
		1: 'ri-emotion-unhappy-line emoticons-molesto',
		2: 'ri-emotion-normal-line emoticons-inconforme',
		3: 'ri-emotion-happy-line emoticons-sin-problem',
		4: 'ri-emotion-line emoticons-satisfied',
		5: 'ri-emotion-laugh-line emoticons-very-satisfied',
	};
	return obj[key] ?? ' ri-question-line text-info';
};
const getBgEmoticonsClass = (key) => {
	const obj = {
		0: '#808080',
		1: '#FF6961',
		2: '#ff8c00',
		3: '#68ca6b',
		4: '#1d9d1c',
		5: '#006400',
	};
	return obj[key] ?? '';
};

export { getEmoticonsClass, getBgEmoticonsClass };
