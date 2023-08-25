import ReactApexChart from 'react-apexcharts';
import getChartColorsArray from '../Common/ChartsDynamicColor';

const SemiCircularRadial = ({ dataColors, title }) => {
	var chartStorkeRadialbarColors = getChartColorsArray(dataColors);
	const series = [76];
	var options = {
		chart: {
			type: 'radialBar',
			height: 350,
			offsetY: -20,
			sparkline: {
				enabled: true,
			},
		},
		plotOptions: {
			radialBar: {
				startAngle: -90,
				endAngle: 90,
				track: {
					background: '#e7e7e7',
					strokeWidth: '97%',
					margin: 5, // margin is in pixels
					dropShadow: {
						enabled: true,
						top: 2,
						left: 0,
						color: '#999',
						opacity: 1,
						blur: 2,
					},
				},
				dataLabels: {
					name: {
						show: false,
					},
					value: {
						offsetY: -2,
						fontSize: '22px',
					},
				},
			},
		},
		grid: {
			padding: {
				top: -10,
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				shadeIntensity: 0.4,
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 50, 53, 91],
			},
		},
		labels: ['Average Results'],
		colors: chartStorkeRadialbarColors,
	};
	return (
		<div className="d-flex flex-column">
			<div>
				<ReactApexChart
					dir="ltr"
					className="apex-charts fw-medium"
					series={series}
					options={options}
					type="radialBar"
					height={328.7}
				/>
			</div>
			<div>
				<h3 className="m-0 text-center">{title}</h3>
			</div>
		</div>
	);
};

export default SemiCircularRadial;
