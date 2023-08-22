import phoneRing from '../../../../assets/images/gif/phoneRing.gif';

const ClickToCallAlert = ({ closeToast, toastProps }) => (
	<div>
		<div className="d-flex align-items-center mb-3 justify-content-between">
			<div className="me-3">
				<h5 className="m-0">LLamando</h5>
			</div>
			<div>
				<img
					src={phoneRing}
					alt="LLamando"
					className="rounded"
					height={62}
					width={62}
				/>
			</div>
		</div>
		<hr />
		<button
			onClick={closeToast}
			className="btn btn-sm btn-danger btn-outline"
		>
			Colgar
		</button>
	</div>
);

export default ClickToCallAlert;
