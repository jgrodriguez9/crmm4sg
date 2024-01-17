import { useMemo } from 'react';
import { SELECT_OPTION } from '../constants/messages';
import { City } from 'country-state-city';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

export default function CityInput({ value, handleChange, country, state }) {
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
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
				value: c.name,
			}))}
			classNamePrefix="select2-selection"
			placeholder={tMessage(SELECT_OPTION)}
		/>
	);
}
