import { Badge, Col, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import AlertMessage from '../../../../Common/AlertMessage';
import {
	getClassSMSStatus,
	getIconClassSMSStatus,
	getParseText,
} from '../../../../../util/getClassSMSStatus';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../../../common/globalsProp';

const TableSMS = ({ items }) => {
	return (
		<Row>
			<Col>
				<SimpleBar style={{ maxHeight: '420px' }} className="p-3 pt-0">
					<div className="acitivity-timeline acitivity-main">
						{items.length === 0 && (
							<AlertMessage
								message={'No hay información disponible'}
								color="info"
								textColor=""
							/>
						)}
						{items.map((item, idx) => (
							<div
								className="acitivity-item pb-3 d-flex"
								key={`message-${idx}`}
							>
								<div className="flex-shrink-0 avatar-xs acitivity-avatar">
									<div
										className={`avatar-title rounded-circle ${getClassSMSStatus(
											item.estatus
										)}`}
									>
										<i
											className={getIconClassSMSStatus(
												item.estatus
											)}
										/>
									</div>
								</div>
								<div className="flex-grow-1 ms-3">
									<Badge
										className={`mb-1 ${getClassSMSStatus(
											item.estatus
										)}`}
									>
										{getParseText(item.estatus)}
									</Badge>
									<h6 className="mb-1 lh-base d-flex align-items-center">
										{item.fechaCreacion
											? moment(
													item.fechaCreacion,
													'YYYY-MM-DDTHH:mm'
											  ).format(DATE_TIME_FORMAT)
											: '-'}
									</h6>
									<p className="text-muted mb-1">
										{item.mensaje}
									</p>
									<div className="hstack gap-3">
										<small className="mb-0 text-muted">
											<i className="ri-user-3-fill" />{' '}
											{item.userId}
										</small>
										<div className="vr" />
										<small className="mb-0 text-muted">
											<i className="ri-phone-fill" />{' '}
											{item.numeroTo}
										</small>
									</div>
								</div>
							</div>
						))}
					</div>
				</SimpleBar>
			</Col>
		</Row>
	);
};

export default TableSMS;
