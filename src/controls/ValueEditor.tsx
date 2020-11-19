import React,{useState} from 'react';
import {Autocomplete} from '@visualbi/bifrost-ui/dist/react/forms/Autocomplete';
import {Dropdown} from '@visualbi/bifrost-ui/dist/react/forms/DropDown';
import { ValueEditorProps } from '../types';

const ValueEditor: React.FC<ValueEditorProps> = ({
  operator,
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  placeHolder,
  values
}) => {
  if (operator === 'null' || operator === 'notNull' || type === "none") {
    return null;
  }

  const onSelectChange = (value:any) => { handleOnChange(value.value)};
  const onTextInputChange = (e:any) => { handleOnChange(e.target.value)};
  const onCheckboxChange = (e:any) => handleOnChange(e.target.checked);
  const  onAutoSuggetionChange = (value:any) => {
      handleOnChange(value);
  };
  let options: any[] = [];
  let selectedOption;
  options = values!.map((item) => {
    if (item.name == value) {
      selectedOption = { value: item.name, label: item.label };
    }
    return { value: item.name, label: item.label };
  });
  switch (type) {
    case 'select':     
      return (( <Dropdown placeholder={placeHolder} className={className} value={selectedOption} options={options} onChange={onSelectChange} />)   );
    case 'autocomplete': 
    return (<Autocomplete scrollPositionSupport={true} placeholder={placeHolder}  options={options} value={value} onChange={onAutoSuggetionChange} className={className}></Autocomplete>)         
   //  return   ( <Select classNamePrefix={"react-select"} placeholder={placeHolder} className={className+" auto-complete"}  value={selectedOption} options={options} onChange={onAutoSuggetionChange} />)   
    case 'checkbox':
      // tslint:disable-next-line: react-a11y-input-elements
      return (<input role="checkbox" type="checkbox" className={className} title={title} onChange={onCheckboxChange} aria-checked={!!value} checked={!!value}/>);
    case 'radio':
      const radioCls = className? className+" radio":"radio";
      return (
        <span className={radioCls} title={title}>
          {values!.map((v) => {
          const isChecked =   value === v.name;
             return (
            <label key={v.name}>
              <input
                type="radio"
                value={v.name}
                aria-checked={isChecked}
                checked={isChecked}
                onChange={onTextInputChange}
              />
              <span className="circle"></span> 
              <span className="radio-title">{v.label}</span>
             
            </label>
          )})}
        </span>
      );
    default:
      return (
        <div className="rule-value-parent">
        <input
          type={inputType || 'text'}
          value={value}
          title={title}
          className={className}
          placeholder={placeHolder}
          onChange={onTextInputChange}
        /></div>
      );
  }
};

ValueEditor.displayName = 'ValueEditor';

export default ValueEditor;
