import React, { useEffect, useRef, useState } from 'react';
import {
	Col,
	Dropdown,
	DropdownMenu,
	DropdownToggle,
	Input,
	Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

//SimpleBar
import SimpleBar from 'simplebar-react';
import { EMPTY_LIST } from '../../common/messages';
import useUser from '../../hooks/useUser';
import parseObjectToQueryUrl from '../../util/parseObjectToQueryUrl';
import { useQuery } from 'react-query';
import { helpArticleList } from '../../helpers/configuration/article';
import showFriendlyMessafe from '../../util/showFriendlyMessafe';
import Loader from './Loader';
import moment from 'moment';
import { DATE_FORMAT } from '../../common/globalsProp';

const HelpDropdown = () => {
	const user = useUser();
	let timer = useRef();
	//Dropdown Toggle
	const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
	const toggleNotificationDropdown = () => {
		setIsNotificationDropdown(!isNotificationDropdown);
	};
	const [searchInput, setSearchInput] = useState('');
	const [queryFilter, setQueryFilter] = useState(null);
	useEffect(() => {
		if (user !== null && user !== undefined) {
			timer.current = setTimeout(() => {
				setQueryFilter(
					parseObjectToQueryUrl({
						user: user.username,
						parameter: searchInput,
					})
				);
			}, 300);
		}

		return () => clearTimeout(timer.current);
	}, [user, searchInput]);

	//query to get list clients
	const {
		data: itemsData,
		error: errorItemsQuery,
		isRefetching,
		isSuccess,
		isError,
	} = useQuery(
		['helpArticleList', queryFilter],
		() => helpArticleList(queryFilter),
		{
			keepPreviousData: true,
			enabled: queryFilter !== null,
			select: (result) => result.data.list ?? [],
		}
	);
	const seeDoc = (it) => {
		window.open(it.url, '_blank', 'noopener,noreferrer');
	};
	return (
		<React.Fragment>
			<Dropdown
				isOpen={isNotificationDropdown}
				toggle={toggleNotificationDropdown}
				className="topbar-head-dropdown ms-1 header-item"
			>
				<DropdownToggle
					type="button"
					tag="button"
					className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
				>
					<i className="bx bx-help-circle fs-22"></i>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
					<div className="dropdown-head bg-primary bg-pattern rounded-top">
						<div className="p-3">
							<Row className="align-items-center">
								<Col>
									<h6 className="m-0 fs-16 fw-semibold text-white">
										{' '}
										Ayuda{' '}
									</h6>
								</Col>
							</Row>
						</div>

						<div className="pt-2">
							<Input
								className="form-control rounded-0"
								type="text"
								placeholder="Buscar..."
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
						</div>
					</div>
					<div className="py-2 ps-2">
						<SimpleBar
							style={{ maxHeight: '300px' }}
							className="pe-2"
						>
							{isRefetching && <Loader />}
							{!isRefetching && isError && (
								<p className="text-danger">
									{showFriendlyMessafe(errorItemsQuery?.code)}
									d
								</p>
							)}
							{!isRefetching &&
								isSuccess &&
								itemsData?.length === 0 && <p>{EMPTY_LIST}</p>}
							{!isRefetching &&
								itemsData?.map((item) => (
									<div
										className="text-reset notification-item d-block dropdown-item position-relative cursor-pointer"
										key={`help-${item.id}`}
									>
										<div
											className="d-flex align-items-center justify-content-between border-bottom"
											onClick={() => seeDoc(item)}
										>
											<h6 className="m-0">
												{item.title}
											</h6>
											<small className="text-muted fw-light">
												{moment(
													item.dateCreated,
													'YYYY-MM-DD'
												).format(DATE_FORMAT)}
											</small>
										</div>
										<p className="m-0 fw-lighter text-black-50">
											{item.description.substring(0, 120)}
											...
										</p>
									</div>
								))}
						</SimpleBar>
					</div>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

export default HelpDropdown;
