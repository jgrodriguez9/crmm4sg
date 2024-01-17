export const existsRole = (roles, rolesToCheck) => {
	if (!rolesToCheck) return true;
	if (!roles) return true;
	let hasAccess = false;
	roles.every((r) => {
		if (rolesToCheck.includes(r)) {
			hasAccess = true;
		}
	});
	return hasAccess;
};
