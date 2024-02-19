import { State } from 'country-state-city';
import { useMemo } from 'react';
import { SELECT_OPTION } from '../constants/messages';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

export default function StateInput({
	value,
	handleChange,
	country,
	isReadOnly = false,
	isClearable = false,
}) {
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const statesOpt = useMemo(() => {
		if (country) {
			return State.getStatesOfCountry(country.value);
		} else {
			return [];
		}
	}, [country]);

	if (isReadOnly) {
		return (
			<div className="form-icon right">
				<div
					className={`form-control`}
					style={{ minHeight: '34px', backgroundColor: '#eff2f7' }}
				>
					{statesOpt?.find((it) => it.isoCode === value?.value)
						?.name ?? value?.label}
				</div>
			</div>
		);
	}

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
			isClearable={isClearable}
			placeholder={tMessage(SELECT_OPTION)}
		/>
	);
}
