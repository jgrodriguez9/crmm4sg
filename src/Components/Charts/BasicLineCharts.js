import ReactApexChart from 'react-apexcharts';
import getChartColorsArray from '../Common/ChartsDynamicColor';

const BasicLineCharts = ({ dataColors }) => {
	var linechartBasicColors = getChartColorsArray(dataColors);
	const series = [
		{
			name: 'Reservas',
			data: [10, 41, 35, 51, 49, 62, 69, 91, 56],
		},
	];
	var options = {
		chart: {
			height: 350,
			type: 'line',
			zoom: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		markers: {
			size: 4,
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'straight',
		},
		colors: linechartBasicColors,
		title: {
			text: '',
			align: 'left',
			style: {
				fontWeight: 500,
			},
		},

		xaxis: {
			categories: [
				'1',
				'2',
				'5',
				'8',
				'12',
				'15',
				'18',
				'20',
				'21',
				'23',
				'25',
				'27',
				'28',
			],
		},
	};
	return (
		<ReactApexChart
			dir="ltr"
			options={options}
			series={series}
			type="line"
			height="350"
			className="apex-charts"
		/>
	);
};

export default BasicLineCharts;
