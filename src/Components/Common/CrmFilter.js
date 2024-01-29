import React, { useState } from 'react';
import {
	Offcanvas,
	OffcanvasHeader,
	OffcanvasBody,
	Label,
	Input,
	Row,
	Col,
	Button,
} from 'reactstrap';
import SelectAsync from './SelectAsync';
import { getSegmentPaginate } from '../../helpers/catalogues/segment';
import { getCallCenterByUser } from '../../helpers/catalogues/call_center';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import useUser from '../../hooks/useUser';
import Select from 'react-select';
import { SELECT_OPTION } from '../constants/messages';
import { Country } from 'country-state-city';
import StateInput from '../Controller/StateInput';

const CrmFilter = ({
	show,
	onCloseClick,
	query,
	setQuery,
	buscar,
	dataSelect,
	setDataSelect,
	onCleanFilter,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.crmFilter',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const user = useUser();
	//getCallCenter
	const { data: callCenterOpt } = useQuery(
		['getCallCenterByUser'],
		() => getCallCenterByUser(user?.usuario),
		{
			enabled: user?.usuario !== undefined,
			select: (data) =>
				data.data?.list.map((item) => ({
					value: item.id,
					label: item.name,
				})) ?? [],
		}
	);

	return (
		<Offcanvas
			direction="end"
			isOpen={show}
			id="filter-canvas"
			toggle={onCloseClick}
			scrollable={true}
		>
			<OffcanvasHeader className="bg-light" toggle={onCloseClick}>
				{t('filters')}
			</OffcanvasHeader>
			<div className="d-flex flex-column justify-content-end h-100">
				<OffcanvasBody className="mb-6">
					<Row>
						<Col xs="12" md="4">
							<div className="mb-3">
								<Label
									htmlFor="booking"
									className="form-label text-muted text-uppercase fw-semibold mb-0"
								>
									Booking
								</Label>
								<Input
									className="form-control"
									type="text"
									id="booking"
									value={query.booking}
									onChange={(e) =>
										setQuery((prev) => ({
											...prev,
											booking: e.target.value,
										}))
									}
								/>
							</div>
						</Col>
						<Col xs="12" md="4">
							<div className="mb-2">
								<Label
									htmlFor="certifiateNumber"
									className="form-label text-muted mb-0"
								>
									{t('certificate')}
								</Label>
								<Input
									className="form-control"
									type="text"
									id="certifiateNumber"
									value={query.certifiateNumber}
									onChange={(e) =>
										setQuery((prev) => ({
											...prev,
											certifiateNumber: e.target.value,
										}))
									}
								/>
							</div>
						</Col>
						<Col xs="12" md="4">
							<div className="mb-3">
								<Label
									htmlFor="contract"
									className="form-label text-muted text-uppercase fw-semibold mb-0"
								>
									{t('contract')}
								</Label>
								<Input
									className="form-control"
									type="text"
									id="contract"
									value={query.contract}
									onChange={(e) =>
										setQuery((prev) => ({
											...prev,
											contract: e.target.value,
										}))
									}
								/>
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs="12" md="4">
							<div className="mb-2">
								<Label
									htmlFor="call-center"
									className="form-label text-muted mb-0"
								>
									Call Center
								</Label>
								<Select
									id="hotel"
									className="mb-0"
									value={dataSelect.callCenterModel}
									onChange={(value) => {
										setQuery((prev) => ({
											...prev,
											callCenter: value?.value ?? '',
										}));
										setDataSelect((prev) => ({
											...prev,
											callCenterModel: value,
										}));
									}}
									options={callCenterOpt}
									placeholder={tMessage(SELECT_OPTION)}
								/>
							</div>
						</Col>
						<Col xs="12" md="4">
							<div className="mb-3">
								<Label
									htmlFor="segmento-select"
									className="form-label text-muted text-uppercase fw-semibold mb-0"
								>
									{t('segment')}
								</Label>
								<SelectAsync
									fnFilter={getSegmentPaginate}
									query={'?page=1&max=10'}
									keyCompare={'name'}
									inputId="segmento-select"
									value={dataSelect.segmentModel}
									onChange={(value) => {
										setQuery((prev) => ({
											...prev,
											segment: value?.value ?? '',
										}));
										setDataSelect((prev) => ({
											...prev,
											segmentModel: value,
										}));
									}}
								/>
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs="12" md="4">
							<div className="mb-3">
								<Label
									htmlFor="nombre"
									className="form-label text-muted text-uppercase fw-semibold mb-0"
								>
									{t('name')}
								</Label>
								<Input
									className="form-control"
									type="text"
									id="nombre"
									value={query.firstName}
									onChange={(e) =>
										setQuery((prev) => ({
											...prev,
											firstName: e.target.value,
										}))
									}
								/>
							</div>
						</Col>
						<Col xs="12" md="4">
							<div className="mb-2">
								<Label
									htmlFor="apellido"
									className="form-label text-muted mb-0"
								>
									{t('lastName')}
								</Label>
								<Input
									className="form-control"
									type="text"
									id="apellido"
									value={query.lastName}
									onChange={(e) =>
										setQuery((prev) => ({
											...prev,
											lastName: e.target.value,
										}))
									}
								/>
							</div>
						</Col>
						<Col xs="12" md="4">
							<div className="mb-3">
								<Label
									htmlFor="telefono"
									className="form-label text-muted text-uppercase fw-semibold mb-0"
								>
									{t('phone')}
								</Label>
								<Input
									className="form-control"
									type="text"
									id="telefono"
									value={query.movil}
									onChange={(e) =>
										setQuery((prev) => ({
											...prev,
											movil: e.target.value,
										}))
									}
								/>
							</div>
						</Col>
						<Col xs="12" md="4">
							<div className="mb-3">
								<Label
									htmlFor="pais"
									className="form-label text-muted text-uppercase fw-semibold mb-0"
								>
									{t('country')}
								</Label>
								<Select
									value={dataSelect.countryModel}
									onChange={(value) => {
										setQuery((prev) => ({
											...prev,
											country: value?.value ?? '',
										}));
										setDataSelect((prev) => ({
											...prev,
											countryModel: value,
										}));

										setQuery((prev) => ({
											...prev,
											state: '',
										}));
										setDataSelect((prev) => ({
											...prev,
											stateModel: null,
										}));
									}}
									options={Country.getAllCountries().map(
										(it) => ({
											label: it.name,
											value: it.isoCode,
										})
									)}
									isClearable
									classNamePrefix="select2-selection"
									placeholder={tMessage(SELECT_OPTION)}
								/>
							</div>
						</Col>
						<Col xs="12" md="4">
							<div className="mb-3">
								<Label
									htmlFor="estado"
									className="form-label text-muted text-uppercase fw-semibold mb-0"
								>
									{t('state')}
								</Label>
								<StateInput
									value={dataSelect.stateModel}
									handleChange={(value) => {
										setQuery((prev) => ({
											...prev,
											state: value?.value ?? '',
										}));
										setDataSelect((prev) => ({
											...prev,
											stateModel: value,
										}));
									}}
									isClearable
									country={dataSelect.countryModel}
								/>
							</div>
						</Col>
						<Col xs="12" md="4">
							<div className="mb-3">
								<Label
									htmlFor="telefono"
									className="form-label text-muted text-uppercase fw-semibold mb-0"
								>
									{t('email')}
								</Label>
								<Input
									className="form-control"
									type="text"
									id="telefono"
									value={query.email}
									onChange={(e) =>
										setQuery((prev) => ({
											...prev,
											email: e.target.value,
										}))
									}
								/>
							</div>
						</Col>
					</Row>
				</OffcanvasBody>
				<div className="py-3 px-3 border position-sticky bottom-0 w-100 bg-light ">
					<div className="d-flex align-items-center">
						<div className="pe-2">
							<Button
								color="success"
								type="submit"
								size="sm"
								className="fw-500"
								onClick={buscar}
							>
								{t('search')}
							</Button>
						</div>
						<div>
							<Button
								color="danger"
								outline
								type="button"
								size="sm"
								className="fw-500"
								onClick={onCleanFilter}
							>
								{t('cleanFilters')}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Offcanvas>
	);
};

export default CrmFilter;
