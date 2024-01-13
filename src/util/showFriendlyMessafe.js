const {
	ERR_BAD_REQUEST,
	ERR_BAD_RESPONSE,
	WRONG_CREDENTIALS,
} = require('../common/messages');

const showFriendlyMessafe = (serverCode) => {
	switch (serverCode) {
		case 'ERR_BAD_REQUEST':
			return ERR_BAD_REQUEST;
		case 'ERR_BAD_RESPONSE':
			return ERR_BAD_RESPONSE;
		case 404:
			return WRONG_CREDENTIALS;
		default:
			return serverCode;
	}
};

export default showFriendlyMessafe;
