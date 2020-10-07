import React from 'react';
import { ValueSelectorProps } from '../types';

const ValueSelector: React.FC<ValueSelectorProps> = ({
  className,
  handleOnChange,
  options,
  title,
  value
}) => { 
 const onChange =  (e:any) => handleOnChange(e.target.value)
  return (
  <select
    className={className}
    value={value}
    title={title}
    onChange={onChange}
    onBlur={onChange}>
    {options.map((option) => {
      const key = option.id ? `key-${option.id}` : `key-${option.name}`;
      const isSelected =  value == option.name;
      const prefix = option.type === "number"? "Σ ":"";
      return (
        <option role="option" key={key} value={option.name} aria-selected={isSelected}>
          {prefix + option.label}
        </option>
      );
    })}
  </select>
)};

ValueSelector.displayName = 'ValueSelector';

export default ValueSelector;
