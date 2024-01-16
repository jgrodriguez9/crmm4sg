import { Alert } from 'reactstrap';

const AlertMessage = ({
	message,
	color = 'danger',
	textColor = 'text-danger',
}) => {
	return (
		<Alert color={color}>
			<p className={`m-0 ${textColor}`}>{message}</p>
		</Alert>
	);
};

export default AlertMessage;
