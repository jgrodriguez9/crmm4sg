import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function BasicModal({
	open,
	setOpen,
	title,
	children = null,
	size = 'sm',
	classBody = 'py-2 px-5',
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
			<ModalHeader toggle={onCloseClick} className="modal-title">
				{title}
			</ModalHeader>
			<hr />
			<ModalBody className={classBody}>{children}</ModalBody>
		</Modal>
	);
}
