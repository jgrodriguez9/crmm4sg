import { useState } from 'react';
import { editIconClass } from '../../../constants/icons';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { SELECT_OPTION } from '../../../constants/messages';

const CellAgent = ({ row, value, column, table }) => {
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const [toggle, setToggle] = useState(false);
	const [isHover, setHover] = useState(false);
	const [newAgent, setNewAgent] = useState(null);

	const updateAgent = () => {
		console.log(row);
	};

	return (
		<>
			{!toggle && (
				<div
					className="dropdown-item d-flex justify-content-between align-items-center"
					onMouseOver={() => setHover(true)}
					onMouseOut={() => setHover(false)}
					onClick={() => setToggle(true)}
				>
					<div>{value}</div>
					{isHover && (
						<div>
							<i
								className={`${editIconClass} fs-5 text-primary`}
							/>
						</div>
					)}
				</div>
			)}
			{toggle && (
				<div
					className="dropdown-item d-flex align-items-center"
					style={{ width: '250px' }}
				>
					<div className="input-group">
						<Select
							id="hotel"
							className="mb-0 p-0 form-control-sm"
							value={newAgent}
							onChange={(value) => {
								setNewAgent(value);
							}}
							options={[]}
							placeholder={tMessage(SELECT_OPTION)}
						/>
						<button
							className="btn btn-success btn-sm"
							type="button"
							onClick={updateAgent}
						>
							<i className="ri-check-line" />
						</button>
						<button
							className="btn btn-danger btn-sm"
							type="button"
							onClick={() => {
								setToggle(false);
							}}
						>
							<i className="ri-close-line" />
						</button>
					</div>
				</div>
			)}
		</>
	);

	// return (
	// 	<input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
	// );
};

export default CellAgent;
