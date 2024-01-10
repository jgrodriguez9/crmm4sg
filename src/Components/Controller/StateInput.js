import { State } from 'country-state-city';
import { useMemo } from 'react';
import { SELECT_OPTION } from '../constants/messages';
import Select from 'react-select';

export default function StateInput({ value, handleChange, country }) {
	const statesOpt = useMemo(() => {
		if (country) {
			return State.getStatesOfCountry(country.value);
		} else {
			return [];
		}
	}, [country]);

	return (
		<Select
			value={
				value
					? {
							value: value.value,
							label:
								statesOpt.find(
									(it) => it.isoCode === value.value
								)?.name ?? value.label,
					  }
					: null
			}
			onChange={(value) => handleChange(value)}
			options={statesOpt.map((s) => ({
				label: s.name,
				value: s.isoCode,
			}))}
			classNamePrefix="select2-selection"
			placeholder={SELECT_OPTION}
		/>
	);
}
