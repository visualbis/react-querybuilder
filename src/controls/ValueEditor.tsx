import React,{useState} from 'react';
import Autosuggest from 'react-autosuggest';
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
  const  onAutoSuggetionChange = (event:any, value:any) => {
      setVal(value.newValue);
      handleOnChange(value.newValue);
  };
  const [val, setVal] = useState(value); 
  const [suggestions, setSuggestions] = useState([] as  any);   
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
        const suggessionInputProps = {value: val?val:"", onChange: onAutoSuggetionChange};       
         const onSuggestionsFetchRequested = (value:any) => {        
          const _values= values && values.length? values.filter(sug => sug.label.toLowerCase().includes(value.value.toLowerCase().trim()) ):[];
          setSuggestions(_values);
         };      
        const getSuggestionName = (suggestion:any)=> {
          return suggestion.label;
        }        
        const renderSuggestion = (suggestion:any) => {
          return (
            <span>{suggestion.label}</span>
          );
        }
        const onClear = ()=> {};
        ;
     return    (<Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onClear}
        getSuggestionValue={getSuggestionName}
        renderSuggestion={renderSuggestion}
        inputProps={suggessionInputProps}
      />)
    
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
