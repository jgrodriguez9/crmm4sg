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
}) => {
	return (
		<Flatpickr
			name={name}
			id="datepicker-publish-input"
			className={className}
			placeholder={placeholder}
			options={{
				...options,
				dateFormat: dateFormat,
				locale: Spanish,
			}}
			onChange={(e) => onChangeDate(e)}
			value={date || ''}
		/>
	);
};

export default DatePicker;
