import { Col, Modal, ModalBody, Row } from 'reactstrap';
import {
	DELETE_QUESTION,
	DELETE_QUESTION_CONFIRMATION,
} from '../constants/messages';
import ButtonsLoader from '../Loader/ButtonsLoader';

export default function DeleteModal({
	handleDelete,
	show,
	setShow,
	isDeleting,
}) {
	const onCloseClick = () => {
		setShow(false);
	};

	return (
		<Modal
			isOpen={show}
			toggle={onCloseClick}
			centered={true}
			backdrop={'static'}
			keyboard={false}
			className="overflow-hidden"
		>
			<ModalBody className="py-3 px-5">
				<Row>
					<Col lg={12}>
						<div className="text-center">
							<i
								className="mdi mdi-alert-circle-outline"
								style={{ fontSize: '9em', color: 'orange' }}
							/>
							<h2>{DELETE_QUESTION}</h2>
							<h4>{DELETE_QUESTION_CONFIRMATION}</h4>
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="mt-3 d-flex justify-content-center">
						{isDeleting ? (
							<ButtonsLoader
								buttons={[
									{
										text: '¡Sí, eliminarlo!',
										color: 'danger',
										className: 'btn-lg ms-2',
										loader: true,
									},
									{
										text: 'Cancelar',
										color: 'light',
										className: 'btn-lg ms-2',
										loader: false,
									},
								]}
							/>
						) : (
							<div className="text-center mt-3">
								<button
									type="button"
									className="btn btn-danger btn-lg ms-2"
									onClick={handleDelete}
								>
									¡Sí, eliminarlo!
								</button>
								<button
									type="button"
									className="btn btn-light btn-lg ms-2"
									onClick={onCloseClick}
								>
									Cancelar
								</button>
							</div>
						)}
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);
}
