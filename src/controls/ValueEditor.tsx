import React,{useState} from 'react';
import Autocomplete from 'react-autocomplete';
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
  const onSelectChange = (e:any) =>  handleOnChange(e.target.value);
  const onCheckboxChange = (e:any) => handleOnChange(e.target.checked);
  const [val, setVal] = useState("");   
  switch (type) {
    case 'select':
      return (
        <select
          className={className}
          title={title}
          onChange={onSelectChange}
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
    case 'autocomplete':
      const shouldItemRender = (state: any, val: string) => { return state.label.toLowerCase().indexOf(val.toLowerCase()) !== -1 };
      const renderItem = (item: any, isHighlighted: boolean) => (
        <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
          {item.label}
        </div>);
      const _values = values ? values : [];
      const getItemValue = (item: any) => { return item.label; };
      const _handelOnChange = (val: any) => {
        setVal(val);
        handleOnChange(val);
      }
      const _onChange = (event: any, val: any) => { setVal(val); }
      return (<div className="autocomplete-wrapper"> <Autocomplete
        value={val}
        items={_values}
        getItemValue={getItemValue}
        shouldItemRender={shouldItemRender}
        renderItem={renderItem}
        onChange={_onChange}
        onSelect={_handelOnChange}
      /></div>)
    case 'checkbox':
      // tslint:disable-next-line: react-a11y-input-elements
      return (<input role="checkbox" type="checkbox" className={className} title={title} onChange={onCheckboxChange} aria-checked={!!value} checked={!!value}/>);
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
