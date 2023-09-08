import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function BasicModal({
	open,
	setOpen,
	title,
	children = null,
	size = 'sm',
}) {
	const onCloseClick = () => {
		setOpen(false);
	};

	return (
		<Modal
			isOpen={open}
			toggle={onCloseClick}
			centered={true}
			backdrop={'static'}
			keyboard={false}
			className="overflow-hidden"
			size={size}
		>
			<ModalHeader toggle={onCloseClick}>
				<h5 className="modal-title">{title}</h5>
			</ModalHeader>
			<hr />
			<ModalBody className="py-2 px-5">{children}</ModalBody>
		</Modal>
	);
}
