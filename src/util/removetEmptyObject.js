const removetEmptyObject = (obj) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, v]) => v != null && v !== '')
	);
};

export default removetEmptyObject;
