import Flatpickr from "react-flatpickr";

const DatePicker = ({
    date,
    name = 'date',
    onChangeDate,
    dateFormat = 'd/m/Y',
    options,
    placeholder = ''
}) => {

    return (
        <Flatpickr
            name={name}
            id="datepicker-publish-input"
            className="form-control"
            placeholder={placeholder}
            options={{                
                ...options,
                dateFormat: dateFormat,
            }}
            onChange={(e) =>onChangeDate(e)}
            value={date || ""}
        />
    )
}

export default DatePicker