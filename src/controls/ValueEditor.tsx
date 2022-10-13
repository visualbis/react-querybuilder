import React, { useState } from 'react';
import { Autocomplete } from '@visualbi/bifrost-ui/dist/react/forms/Autocomplete';
import { Dropdown } from '@visualbi/bifrost-ui/dist/react/forms/DropDown';
import { ValueEditorProps } from '../types';
import DatePicker from 'react-modern-calendar-datepicker';

const renderCustomInput = ({ ref, placeHolder, selectedDay, className }) => {
  const formattedValue =
    selectedDay &&
    `${(selectedDay as any).month}/${(selectedDay as any).day}/${(selectedDay as any).year}`;
  return (
    <input
      readOnly
      ref={ref}
      placeholder={placeHolder}
      value={formattedValue}
      className={className}
    />
  );
};

const renderToday = (isTodaySelected, onTodaysDateChange) => (
  <label className="label-container">
    <input
      role="radio"
      type="radio"
      value={''}
      aria-checked={isTodaySelected}
      onChange={onTodaysDateChange}
    />
    <span className="footer-text">{'Current date'}</span>
  </label>
);

const renderDefault = (props) => {
  const { inputType, value, title, className, placeHolder, inputDisabled, handleOnChange } = props;
  const onChange = (e) => handleOnChange(e.target.value);
  return (
    <div className="rule-value-parent">
      <input
        type={inputType || 'text'}
        value={value}
        title={title}
        disabled={inputDisabled}
        className={className}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
};

const renderTextArea = (props) => {
  const { title, inputDisabled, onTextAreaChange, handleOnChange, _value, className } = props;
  const onBlur = () => handleOnChange(_value);
  return (
    <div className="rule-value-parent textarea">
      <textarea
        spellCheck="false"
        value={_value}
        title={title}
        disabled={inputDisabled}
        className={className}
        placeholder="Enter values separated by comma"
        onChange={onTextAreaChange}
        onBlur={onBlur}
      />
    </div>
  );
};

const renderCheckBox = (props) => {
  const { className, title, value, handleOnChange } = props;
  const onChange = (e) => handleOnChange(e.target.checked);
  return (
    <input
      role="checkbox"
      type="checkbox"
      className={className}
      title={title}
      onChange={onChange}
      aria-checked={!!value}
      checked={!!value}
      value={''}
    />
  );
};

const renderSelect = (props) => {
  const { placeHolder, className, selectedOption, options, handleOnChange } = props;
  const onChange = (val) => handleOnChange(val.value);
  return (
    <Dropdown
      placeholder={placeHolder}
      className={className}
      value={selectedOption}
      options={options}
      onChange={onChange}
    />
  );
};

const renderAutoComplete = (props) => {
  const { placeHolder, value, options, handleOnChange, className } = props;
  const onChange = (val) => handleOnChange(val);
  return (
    <Autocomplete
      scrollPositionSupport={true}
      placeholder={placeHolder}
      options={options}
      value={value}
      onChange={onChange}
      className={className}></Autocomplete>
  );
};

const renderRadio = (props) => {
  const { value, handleOnChange, className, title, values } = props;
  const onChange = (e) => handleOnChange(e.target.value);
  
  return (
    <span className={`${className && className} radio`} title={title}>
      {values &&
        values.map((v) => {
          const isChecked = value === v.name;
          return (
            <label key={v.name}>
              <input
                type="radio"
                value={v.name}
                aria-checked={isChecked}
                checked={isChecked}
                onChange={onChange}
              />
              <span className="circle"></span>
              <span className="radio-title">{v.label}</span>
            </label>
          )
        })}
    </span>
  );
};

const renderDatePicker = (props) => {
  const { handleOnChange, selectedDay, setSelectedDay, isTodaySelected, onTodaysDateChange } =
    props;
    const onChange = (d) => onDateChange(d, setSelectedDay, handleOnChange);
    const customInput = (e) =>  renderCustomInput({ ...e, selectedDay, ...props });
    const renderFooter = () =>  renderToday(isTodaySelected, onTodaysDateChange);
  return (
    <div className="date-filter-wrapper">
      <DatePicker
        value={selectedDay as any}
        onChange={onChange}
        renderInput={customInput} // render a custom input
        shouldHighlightWeekends
        colorPrimary="#0078d4"
        colorPrimaryLight="#0078d41c"
        renderFooter={renderFooter}
      />
    </div>
  );
};

const onDateChange = (dateObj, setSelectedDay, handleOnChange) => {
  setSelectedDay(dateObj);
  handleOnChange(`${dateObj.month}/${dateObj.day}/${dateObj.year}`);
};

const ValueEditor: React.FC<ValueEditorProps> = (props) => {
  const { operator, value, handleOnChange, type, placeHolder, values } = props;
  let inputDisabled = false;
  let options: any[] = [];
  let selectedOption;
  let fieldType = type;
  let fieldPlaceHolder = placeHolder;
  if (operator === 'null' || operator === 'notNull' || type === 'none') {
    fieldType = 'text';
    inputDisabled = true;
    fieldPlaceHolder = '';
  }
  const [_value, setValue] = useState(value);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isTodaySelected, setTodayDate] = useState(false);

  const onTextAreaChange = (e: any) => setValue(e.target.value);

  const onTodaysDateChange = (e) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    setSelectedDay({ day, month, year });
    handleOnChange(`${month}/${day}/${year}`);
    setTodayDate(e.target.value);
  };

  options = values
    ? values.map((item) => {
        if (item.name == value) selectedOption = { value: item.name, label: item.label };
        return { value: item.name, label: item.label };
      })
    : [];
  switch (fieldType) {
    case 'select':
      return renderSelect({ ...props, selectedOption, options });
    case 'autocomplete':
      return renderAutoComplete({ ...props, options });
    case 'checkbox':
      return renderCheckBox(props);
    case 'date':
      return renderDatePicker({
        ...props,
        selectedDay,
        setSelectedDay,
        isTodaySelected,
        onTodaysDateChange,
        placeHolder: fieldPlaceHolder
      });
    case 'radio':
      return renderRadio(props);
    case 'textarea':
      return renderTextArea({ ...props, onTextAreaChange, _value, inputDisabled });
    default:
      return renderDefault({ ...props, inputDisabled });
  }
};

ValueEditor.displayName = 'ValueEditor';

export default ValueEditor;
