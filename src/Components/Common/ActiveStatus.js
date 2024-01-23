const ActiveStatus = ({ active }) =>
	active ? (
		<i className="ri-check-line bg-soft-success text-success p-1 rounded-circle" />
	) : (
		<i className="ri-close-line  bg-soft-danger text-danger p-1 rounded-circle" />
	);

export default ActiveStatus;
