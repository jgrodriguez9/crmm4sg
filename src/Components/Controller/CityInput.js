import { useMemo } from 'react';
import { SELECT_OPTION } from '../constants/messages';
import { City } from 'country-state-city';
import Select from 'react-select';

export default function CityInput({ value, handleChange, country, state }) {
	const citiesOpt = useMemo(() => {
		if (country && state) {
			return City.getCitiesOfState(country.value, state.value);
		} else {
			return [];
		}
	}, [country, state]);
	return (
		<Select
			value={value}
			onChange={(value) => handleChange(value)}
			options={citiesOpt.map((c) => ({
				label: c.name,
				value: c.isoCode,
			}))}
			classNamePrefix="select2-selection"
			placeholder={SELECT_OPTION}
		/>
	);
}
