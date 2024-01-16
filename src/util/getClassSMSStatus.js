const getIconClassSMSStatus = (smsStatus) => {
	const obj = {
		delivered: 'ri-check-double-fill',
		queued: 'mdi mdi-timer-sand-complete',
		sending: 'ri-send-plane-fil',
		sent: ' ri-check-line',
		failed: 'ri-close-line',
	};

	return obj[smsStatus] || 'ri-questionnaire-line';
};

const getClassSMSStatus = (smsStatus) => {
	const obj = {
		delivered: 'bg-soft-success text-success',
		queued: 'bg-soft-dark text-dark',
		sending: 'bg-soft-primary text-primary',
		sent: 'bg-soft-success text-success',
		failed: 'bg-soft-danger text-danger',
	};

	return obj[smsStatus] || '';
};

const getParseText = (smsStatus) => {
	const obj = {
		delivered: 'Entregado',
		queued: 'En cola',
		sending: 'Enviándolo',
		sent: 'Enviado',
		failed: 'Falló',
	};

	return obj[smsStatus] || smsStatus;
};

export { getIconClassSMSStatus, getClassSMSStatus, getParseText };
