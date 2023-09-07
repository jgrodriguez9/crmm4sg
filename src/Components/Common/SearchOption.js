import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Alert, Input } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { fecthItems } from '../../pages/Operation/Lead/Util/services';
import Loader from './Loader';
import showFriendlyMessafe from '../../util/showFriendlyMessafe';

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
		['getCustomerByPhone', value],
		() => fecthItems(`max=10&page=1&booking=${value}`),
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
														style={{ width: '60%' }}
													>
														Nombre
													</th>
													<th
														style={{ width: '20%' }}
													>
														País
													</th>
													<th
														style={{ width: '20%' }}
													>
														Estado
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
																	`/client/${it.id}`
																)
															}
															style={{
																cursor: 'pointer',
															}}
														>
															<td>{`${
																it?.firstName ??
																''
															} ${
																it?.lastName ??
																''
															}`}</td>
															<td>
																{it?.country ??
																	''}
															</td>
															<td>
																{it?.state ??
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
