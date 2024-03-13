const classBadgeStatusEmail = (value) => {
	const objBadge = {
		delivery: 'badge-soft-success',
		queque: 'badge-soft-dark',
		fail: 'badge-soft-danger',
	};

	return objBadge[value] || 'light';
};

const parseTextStatusMail = (value) => {
	const objBadge = {
		delivery: 'Entregado',
		queque: 'En cola',
		fail: 'Falló',
	};
	return objBadge[value] || value;
};

export { classBadgeStatusEmail, parseTextStatusMail };
