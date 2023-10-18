export default function DisabledInput({ endIcon = null, value }) {
	return (
		<div className="form-icon right">
			<div
				className={`form-control ${endIcon ? 'form-control-icon' : ''}`}
				style={{ minHeight: '34px', backgroundColor: '#eff2f7' }}
			>
				{value}
			</div>
			{endIcon}
		</div>
	);
}
