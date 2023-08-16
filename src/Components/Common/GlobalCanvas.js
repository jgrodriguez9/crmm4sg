import React from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const GlobalCanvas = ({
	title,
	show,
	onCloseClick,
	children = null,
	fullWidth = true,
}) => {
	return (
		<Offcanvas
			direction="end"
			isOpen={show}
			id="offcanvasWithBackdrop"
			toggle={onCloseClick}
			style={fullWidth ? { width: '100%' } : {}}
		>
			<OffcanvasHeader
				className="bg-gradient bg-primary canvas-title"
				toggle={onCloseClick}
			>
				{title}
			</OffcanvasHeader>
			<OffcanvasBody className="p-0 overflow-hidden">
				<SimpleBar style={{ height: '100vh' }}>
					<div className="py-5">{children}</div>
				</SimpleBar>
			</OffcanvasBody>
		</Offcanvas>
	);
};

export default React.memo(GlobalCanvas);
