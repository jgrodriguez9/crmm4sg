import moment from 'moment/moment';

const months = [
	{ value: 1, label: 'Enero' },
	{ value: 2, label: 'Febrero' },
	{ value: 3, label: 'Marzo' },
	{ value: 4, label: 'Abril' },
	{ value: 5, label: 'Mayo' },
	{ value: 6, label: 'Junio' },
	{ value: 7, label: 'Julio' },
	{ value: 8, label: 'Agosto' },
	{ value: 9, label: 'Septiembre' },
	{ value: 10, label: 'Octubre' },
	{ value: 11, label: 'Noviembre' },
	{ value: 12, label: 'Diciembre' },
];

const years = () => {
	const currentYear = moment().format('YYYY');
	const arrayYears = [];
	const firstYear = parseInt(currentYear) - 5;
	let i = firstYear;
	while (i <= parseInt(currentYear)) {
		arrayYears.push({ value: i, label: i });
		i++;
	}

	return arrayYears;
};

export { months, years };
