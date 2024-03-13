import { useState } from 'react';
import { closeIconClass } from '../Components/constants/icons';
import { Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';

function InputTags({ values = '', onChange }) {
	const { t } = useTranslation('translation', {
		keyPrefix: 'controllers.InputTags',
	});
	const [tags, setTags] = useState(
		values === null || values === '' ? [] : values.split(',')
	);
	function handleKeyDown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			const value = e.target.value;
			if (!value.trim()) return;
			const newTags = [...tags, value];
			setTags(newTags);
			onChange(newTags);
			e.target.value = '';
		}
	}

	function removeTag(index) {
		const newTags = tags.filter((el, i) => i !== index);
		setTags(newTags);
		onChange(newTags);
	}

	return (
		<div
			className={`${
				tags.length > 0 ? 'form-control-sm' : ''
			} form-control d-flex align-items-center flex-wrap`}
		>
			{tags.map((tag, index) => (
				<Badge key={index} color="light" className="m-1">
					<div className="d-flex align-items-center">
						<span className="text-dark fs-6">{tag}</span>
						<span>
							<i
								className={`${closeIconClass} text-danger fs-5`}
								onClick={() => removeTag(index)}
							/>
						</span>
					</div>
				</Badge>
			))}
			<input
				onKeyDown={handleKeyDown}
				type="text"
				style={{
					border: 'none',
					outline: 'none',
				}}
				placeholder={t('typeAndEnter')}
			/>
		</div>
	);
}

export default InputTags;
