import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Alert, Input } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import Loader from './Loader';
import showFriendlyMessafe from '../../util/showFriendlyMessafe';
import { filterGlobalCustomer } from '../../helpers/reservation';

const SearchOption = () => {
	const [value, setValue] = useState('');
	let timer = useRef();
	const navigate = useNavigate();

	//query to get list clients
	const {
		data: itemsData,
		error: errorItemsQuery,
		refetch,
		isLoading,
	} = useQuery(
		['filterGlobalCustomer', value],
		async () => {
			const response = await filterGlobalCustomer(value);
			console.log(response);
			return response;
		},
		{
			enabled: false,
		}
	);

	const onChangeData = (value) => {
		setValue(value);
		clearTimeout(timer.current);
		const searchOptions = document.getElementById('search-close-options');
		const dropdown = document.getElementById('search-dropdown');

		timer.current = setTimeout(() => {
			if (value.length > 0) {
				dropdown.classList.add('show');
				searchOptions.classList.remove('d-none');
				refetch();
			} else {
				dropdown.classList.remove('show');
				searchOptions.classList.add('d-none');
			}
		}, 300);
	};

	useEffect(() => {
		const searchOptions = document.getElementById('search-close-options');
		const dropdown = document.getElementById('search-dropdown');
		document.body.addEventListener('click', function (e) {
			if (e.target.getAttribute('id') !== 'search-options') {
				dropdown.classList.remove('show');
				searchOptions.classList.add('d-none');
			}
		});
	}, []);

	const cleanFilters = () => {
		setValue('');
		const searchOptions = document.getElementById('search-close-options');
		const dropdown = document.getElementById('search-dropdown');
		document.body.addEventListener('click', function (e) {
			if (e.target.getAttribute('id') !== 'search-options') {
				dropdown.classList.remove('show');
				searchOptions.classList.add('d-none');
			}
		});
	};

	return (
		<React.Fragment>
			<form className="app-search d-none d-md-block">
				<div className="position-relative">
					<Input
						type="text"
						className="form-control"
						placeholder="Buscar..."
						id="search-options"
						value={value}
						onChange={(e) => {
							onChangeData(e.target.value);
						}}
					/>
					<span className="mdi mdi-magnify search-widget-icon"></span>
					<span
						className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
						id="search-close-options"
						onClick={cleanFilters}
					></span>
				</div>
				<div
					className="dropdown-menu dropdown-menu-lg"
					id="search-dropdown"
					style={{ width: '620px' }}
				>
					<SimpleBar style={{ height: '420px' }}>
						<div className="dropdown-header">
							<h6 className="text-overflow text-muted mb-2 text-uppercase">
								Recent Searches
							</h6>
						</div>

						<div className="px-4 py-3">
							{isLoading && <Loader />}
							{!isLoading && errorItemsQuery && (
								<Alert color="danger" className="mb-0">
									{showFriendlyMessafe(errorItemsQuery?.code)}
								</Alert>
							)}

							{!isLoading &&
								!errorItemsQuery &&
								itemsData?.data?.list.length === 0 && (
									<p>No hay información disponible</p>
								)}
							{!isLoading &&
								!errorItemsQuery &&
								itemsData?.data?.list.length > 0 && (
									<div className="table-responsive table-card">
										<table className="table table-hover table-centered align-middle table-nowrap mb-0">
											<thead>
												<tr>
													<th
														style={{ width: '55%' }}
													>
														Nombre
													</th>
													<th
														style={{ width: '15%' }}
													>
														Certificado
													</th>
													<th
														style={{ width: '15%' }}
													>
														Reservación
													</th>
													<th
														style={{ width: '15%' }}
													>
														Confirmación
													</th>
												</tr>
											</thead>
											<tbody>
												{itemsData.data.list.map(
													(it) => (
														<tr
															key={it.id}
															onClick={(e) =>
																navigate(
																	`/client/${it?.customer?.id}`
																)
															}
															style={{
																cursor: 'pointer',
															}}
														>
															<td>{`${
																it?.customer
																	?.firstName ??
																''
															} ${
																it?.customer
																	?.lastName ??
																''
															}`}</td>
															<td>
																{it?.certificate ??
																	''}
															</td>
															<td>
																{it?.id ?? ''}
															</td>
															<td>
																{it?.confirm ??
																	''}
															</td>
														</tr>
													)
												)}
											</tbody>
										</table>
									</div>
								)}
						</div>
					</SimpleBar>
				</div>
			</form>
		</React.Fragment>
	);
};

export default SearchOption;
