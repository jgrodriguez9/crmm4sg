import moment from 'moment';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Label, Row } from 'reactstrap';
import DatePicker from './DatePicker';
import { useQuery } from 'react-query';
import { getHotelAll } from '../../helpers/catalogues/hotel';
import Select from 'react-select';
import { SELECT_OPTION } from '../constants/messages';
import useAvailability from '../../hooks/useAvailability';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';

function HotelAvailability({ initialDate, finalDate, hotel }) {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.hotelAvailability',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const [loading, setLoading] = useState(false);
	const { url, setUrl, setDateEnd, setDateStart, setHotelId } =
		useAvailability();
	const [iDate, setIDate] = useState(initialDate ?? moment().toDate());
	const [eDate, setEDate] = useState(finalDate ?? moment().toDate());
	const [sHotel, setSHotel] = useState(hotel ? { value: hotel } : null);

	//getHotel
	const { data: hotelOpt } = useQuery(['getHotelAll'], () => getHotelAll(), {
		select: (data) =>
			data.data?.list.map((item) => ({
				value: item.id,
				label: item.name,
			})) ?? [],
	});

	const buscar = () => {
		setLoading(true);
		setUrl(null);
		setTimeout(() => {
			setHotelId(sHotel.value);
			setDateStart(iDate);
			setDateEnd(eDate);
			setLoading(false);
		}, 2000);
	};

	useEffect(() => {
		if (url) {
			document.getElementById('availability').src = url;
		}
	}, [url]);
	return (
		<Row>
			<Col xs="12" md="12">
				<div className="d-flex flex-column flex-md-row mb-2">
					<div className="me-1">
						<Label className="form-label mb-0">
							{t('checkIn')}
						</Label>
						<DatePicker
							date={iDate}
							onChangeDate={(value) => {
								setIDate(value[0]);
							}}
						/>
					</div>
					<div className="me-1">
						<Label className="form-label mb-0">
							{t('checkOut')}
						</Label>
						<DatePicker
							date={eDate}
							onChangeDate={(value) => {
								setEDate(value[0]);
							}}
							options={{
								minDate: iDate
									? moment(iDate).format('DD-MM-YYYY')
									: '',
							}}
						/>
					</div>
					<div className="me-1 flex-grow-1">
						<Label className="form-label mb-0" htmlFor="hotel">
							{t('hotel')}
						</Label>
						<Select
							id="hotel"
							className="mb-0"
							value={
								sHotel
									? {
											value: sHotel.value,
											label:
												hotelOpt?.find(
													(it) =>
														it.value ===
														sHotel.value
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								setSHotel(value);
							}}
							options={hotelOpt}
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
					<div className="align-self-end">
						<Button color="primary" type="button" onClick={buscar}>
							{t('search')}
						</Button>
					</div>
				</div>
			</Col>
			{loading && <Loader />}
			{!url && !loading && (
				<Col xs="12" md="12" className="mt-3">
					<Alert color="secondary" className="border-0 border-0">
						{t('selectSearchCriteria')}
					</Alert>
				</Col>
			)}
			{url && !loading && (
				<Col xs="12" md="12">
					<div
						style={{
							position: 'relative',
							overflow: 'hidden',
							width: '100%',
							paddingTop: '56.25%',
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: '0',
								left: 0,
								bottom: 0,
								right: 0,
								width: '100%',
								height: '100%',
								border: '2px solid #ddd',
							}}
						>
							<iframe
								id="availability"
								title="Disponibilidad de hotel"
								loading="lazy"
								style={{
									width: '1px',
									minWidth: '100%',
									height: '100%',
								}}
							/>
						</div>
					</div>
				</Col>
			)}
		</Row>
	);
}

export default HotelAvailability;
