import React from 'react';
import {Dropdown} from '@visualbi/bifrost-ui/dist/react/forms/DropDown';
import { ValueSelectorProps } from '../types';

const ValueSelector: React.FC<ValueSelectorProps> = ({
  className,
  handleOnChange,
  options,
  title,
  value
}) => {
  const onChange = (value: any) => { handleOnChange(value.value) }
  let selectedValue;
  let _options: any[] = options!.map((item) => {
    const prefix: string = item.type === "number" ? "Σ " : "";
    if (item.name === value) {
      selectedValue = { value: item.name, label: prefix + item.label };
    }
    return { value: item.name, label: prefix + item.label };
  });
  return (<Dropdown classNamePrefix={"react-select"} className={className + " auto-complete"} placeholder={"Select data field"} isSearchable={false} value={selectedValue} options={_options} onChange={onChange} />)
};

ValueSelector.displayName = 'ValueSelector';

export default ValueSelector;
