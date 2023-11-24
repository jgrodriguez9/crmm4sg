import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { Input } from 'reactstrap';

const TWO_HUNDRED_MS = 200;

export default function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, TWO_HUNDRED_MS);

	return (
		<div className="position-relative">
			<Input
				type="text"
				className="form-control"
				placeholder="Buscar..."
				id="search-options"
				value={value ?? ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				style={{ paddingLeft: '40px' }}
			/>
			<span className="mdi mdi-magnify search-widget-icon table-global-search"></span>
		</div>
	);
}
