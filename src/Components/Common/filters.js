import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'reactstrap';

export const Filter = ({ column }) => {
	return (
		<div style={{ marginTop: 5 }}>
			{column.canFilter && column.render('Filter')}
		</div>
	);
};

export const DefaultColumnFilter = ({
	column: {
		filterValue,
		setFilter,
		preFilteredRows: { length },
	},
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.filters.defaultColumnFilter',
	});
	return (
		<Input
			value={filterValue || ''}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
			placeholder={`${t('search')} (${length}) ...`}
		/>
	);
};

export const SelectColumnFilter = ({
	column: { filterValue, setFilter, preFilteredRows, id },
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.filters.selectColumnFilter',
	});
	const options = React.useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	return (
		<select
			id="custom-select"
			className="form-select"
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
		>
			<option value="">{t('all')}</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};
