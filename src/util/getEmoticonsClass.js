const getEmoticonsClass = (key) => {
	const obj = {
		0: ' ri-emotion-normal-line emoticons-no-contact',
		1: 'ri-emotion-unhappy-line emoticons-molesto',
		2: ' ri-emotion-normal-line emoticons-inconforme',
		3: 'ri-emotion-happy-line emoticons-sin-problem',
		4: 'ri-emotion-line emoticons-satisfied',
		5: 'ri-emotion-laugh-line emoticons-very-satisfied',
	};
	return obj[key] ?? ' ri-question-line text-info';
};
const getBgEmoticonsClass = (key) => {
	const obj = {
		0: '#808080',
		1: '#f40000',
		2: '#f49000',
		3: '#bff400',
		4: '#55f400',
		5: '#0cc412',
	};
	return obj[key] ?? '';
};

export { getEmoticonsClass, getBgEmoticonsClass };
