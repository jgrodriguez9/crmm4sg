import { useState } from 'react';
import { editIconClass } from '../../../constants/icons';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import {
	ERROR_SERVER,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../../constants/messages';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useUser from '../../../../hooks/useUser';
import {
	getAgentsBySupervisor,
	updateAgentToClient,
} from '../../../../helpers/customer';
import useRole from '../../../../hooks/useRole';
import Loader from '../../../Common/Loader';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../util/extractMeaningfulMessage';
import { Button } from 'reactstrap';

const CellAgent = ({ row, value, column, table }) => {
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const dispatch = useDispatch();
	const user = useUser();
	const { isAgent } = useRole();
	const queryClient = useQueryClient();
	const [toggle, setToggle] = useState(false);
	const [isHover, setHover] = useState(false);
	const [newAgent, setNewAgent] = useState(null);

	const { mutate: mutateUpdateAgent, isLoading: isUpdating } = useMutation(
		updateAgentToClient,
		{
			onSuccess: (result) => {
				queryClient.refetchQueries({
					queryKey: ['getCustomerPaginate'],
				});
				setToggle(false);
				dispatch(
					addMessage({
						type: 'success',
						message: tMessage(UPDATE_SUCCESS),
					})
				);
			},
			onError: (error) => {
				let message = tMessage(ERROR_SERVER);
				message = extractMeaningfulMessage(error, message);
				dispatch(
					addMessage({
						type: 'error',
						message: message,
					})
				);
			},
		}
	);

	const updateAgent = () => {
		const data = {
			id: row.original.id,
			body: {
				newOwner: newAgent.value,
			},
		};
		mutateUpdateAgent(data);
	};

	//agents by super/manager
	const { data: agentsOpt } = useQuery(
		['getAgentsBySupervisor', user.usuario],
		() => getAgentsBySupervisor(user.usuario),
		{
			enabled: user !== null && !isAgent,
			select: (result) =>
				result.data.list.map((it) => ({
					value: it.id,
					label: it.id,
				})) ?? [],
		}
	);

	return (
		<>
			{!toggle && (
				<div
					className="dropdown-item d-flex justify-content-between align-items-center"
					onMouseOver={() => setHover(true)}
					onMouseOut={() => setHover(false)}
					onClick={() => {
						setNewAgent(null);
						setToggle(true);
					}}
				>
					<div>{value ?? '-'}</div>
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
					{isUpdating && <Loader />}
					{!isUpdating && (
						<div className="input-group">
							<Select
								id="hotel"
								className="mb-0 p-0 form-control-sm"
								value={newAgent}
								onChange={(value) => {
									setNewAgent(value);
								}}
								options={agentsOpt}
								placeholder={tMessage(SELECT_OPTION)}
							/>
							<Button
								size="sm"
								color="success"
								type="button"
								onClick={updateAgent}
								disabled={!newAgent}
							>
								<i className="ri-check-line" />
							</Button>
							<Button
								size="sm"
								color="danger"
								type="button"
								onClick={() => {
									setToggle(false);
								}}
							>
								<i className="ri-close-line" />
							</Button>
						</div>
					)}
				</div>
			)}
		</>
	);

	// return (
	// 	<input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
	// );
};

export default CellAgent;
