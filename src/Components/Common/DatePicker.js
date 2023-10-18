import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

const DatePicker = ({
	date,
	name = 'date',
	onChangeDate,
	dateFormat = 'd/m/Y',
	options,
	placeholder = '',
	className = 'form-control',
	element,
	onOpen = () => {},
	onClose = () => {},
}) => {
	return (
		<Flatpickr
			name={name}
			id="datepicker-publish-input"
			className={className}
			placeholder={placeholder ? placeholder : 'dd/MM/YYYY'}
			options={{
				...options,
				altInput: true,
				altFormat: dateFormat,
				dateFormat: dateFormat,
				locale: Spanish,
			}}
			value={date}
			onChange={(date) => onChangeDate(date, element)}
			onOpen={onOpen}
			onClose={onClose}
		/>
	);
};

export default DatePicker;
