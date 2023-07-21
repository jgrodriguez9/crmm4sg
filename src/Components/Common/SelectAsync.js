import AsyncSelect from 'react-select/async';
import { colourOptions } from '../../common/data/dumy/asynselect';
import { useRef } from 'react';

const MESSAGE = {
    initial: "Buscar...",
    noOption: "No opciones, intente otra búsqueda",
    networkError: "Error de red, intente más tarde"
  };

const SelectAsync = () => {
    const messageRef = useRef(MESSAGE.noOption);

    const filterColors = (inputValue: string) => {
        return colourOptions.filter((i) =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      };
      
      const promiseOptions = (inputValue: string) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(filterColors(inputValue));
          }, 1000);
        });

    return (
        <AsyncSelect 
            noOptionsMessage={({ inputValue }) =>
                inputValue ? messageRef.current : MESSAGE.initial
            }
            cacheOptions 
            defaultOptions 
            loadOptions={promiseOptions} 
        />
    )
}

export default SelectAsync