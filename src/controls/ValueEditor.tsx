import React from 'react';
import { ValueEditorProps } from '../types';

const ValueEditor: React.FC<ValueEditorProps> = ({
  operator,
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  values
}) => {
  if (operator === 'null' || operator === 'notNull') {
    return null;
  }
  const onSelectChange = (e:any) => handleOnChange(e.target.value);
  const onCheckboxChange = (e:any) => handleOnChange(e.target.checked);
  switch (type) {
    case 'select':
      return (
        <select
          className={className}
          title={title}
          onBlur={onSelectChange}
          value={value}>
          {values!.map((v) => {
            const isSelected = v.name == value;
            return (
            <option role="option" key={v.name} value={v.name} aria-selected={isSelected} >
              {v.label}
            </option>
          )})}
        </select>
      );

    case 'checkbox':
      return (
        <input
          role="checkbox"
          type="checkbox"
          className={className}
          title={title}
          onChange={onCheckboxChange}
          aria-checked={!!value}
          checked={!!value}
        />
      );

    case 'radio':
      return (
        <span className={className} title={title}>
          {values!.map((v) => {
          const isChecked =   value === v.name;
             return (
            <label key={v.name}>
              <input
                type="radio"
                value={v.name}
                aria-checked={isChecked}
                checked={isChecked}
                onChange={onSelectChange}
              />
              {v.label}
            </label>
          )})}
        </span>
      );

    default:
      return (
        <input
          type={inputType || 'text'}
          value={value}
          title={title}
          className={className}
          onChange={onSelectChange}
        />
      );
  }
};

ValueEditor.displayName = 'ValueEditor';

export default ValueEditor;
