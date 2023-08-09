import { useState } from 'react';
import ViewLeadInformation from './LeadInformation/ViewLeadInformation';
import FormLeadInformation from './LeadInformation/FormLeadInformation';

const LeadInformation = ({ data }) => {
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			{editMode ? (
				<FormLeadInformation
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			) : (
				<ViewLeadInformation
					editMode={editMode}
					setEditMode={setEditMode}
					data={data}
				/>
			)}
		</>
	);
};

export default LeadInformation;
