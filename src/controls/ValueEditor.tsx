/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { Autocomplete } from '@visualbi/bifrost-ui/dist/react/forms/Autocomplete';
import { Dropdown } from '@visualbi/bifrost-ui/dist/react/forms/DropDown';
import { ValueEditorProps } from '../types';
import Calendar from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";

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
  let inputDisabled = false;
  if (operator === 'null' || operator === 'notNull' || type === 'none') {
    type = 'text';
    inputDisabled = true;
    placeHolder = '';
  }
  const [_value, setValue] = useState(value);
  const [selectedDate, setSelectedDate] = useState(null);

  const onSelectChange = (value: any) => {
    handleOnChange(value.value);
  };
  const onDateChange = (e: any) => {
    handleOnChange(e.target.value);
  };
  const onTextInputChange = (e: any) => {
    handleOnChange(e.target.value);
  };
  const onTextAreaChange = (e: any) => {
    setValue(e.target.value);
  };
  const applyTextAreaChange = () => {
    handleOnChange(_value);
  };
  const onCheckboxChange = (e: any) => handleOnChange(e.target.checked);
  const onAutoSuggetionChange = (value: any) => {
    handleOnChange(value);
  };

  const renderCustomInput = ({ ref }) => (
    <input
      role="date"
      type="date"
      readOnly
      ref={ref}
      placeholder={placeHolder}
      value={value ? value : ''}
      className={className}
    />
  );

  let options: any[] = [];
  let selectedOption;
  options = values
    ? values.map((item) => {
        if (item.name == value) {
          selectedOption = { value: item.name, label: item.label };
        }
        return { value: item.name, label: item.label };
      })
    : [];
  switch (type) {
    case 'select':
      return (
        <Dropdown
          placeholder={placeHolder}
          className={className}
          value={selectedOption}
          options={options}
          onChange={onSelectChange}
        />
      );
    case 'autocomplete':
      return (
        <Autocomplete
          scrollPositionSupport={true}
          placeholder={placeHolder}
          options={options}
          value={value}
          onChange={onAutoSuggetionChange}
          className={className}></Autocomplete>
      );
    case 'checkbox':
      // tslint:disable-next-line: react-a11y-input-elements
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
    // case 'date':
    //   return (
    //     <input
    //       role="date"
    //       type={'date'}
    //       placeholder={placeHolder}
    //       className={className}
    //       onChange={onDateChange}
    //       value={value}
    //     />
    //   );
    case 'date':
      return (
        <Calendar
          value={value as any}
          onChange={onDateChange}
          shouldHighlightWeekends
          renderInput={renderCustomInput}
          colorPrimary="#0078d4"
          colorPrimaryLight="#0078d41c"
          calendarPopperPosition={'bottom'}
          inputPlaceholder={className}
        />
      );
    case 'radio':
      {
        const radioCls = className ? `${className} radio` : 'radio';
        return (
          <span className={radioCls} title={title}>
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
                      onChange={onTextInputChange}
                    />
                    <span className="circle"></span>
                    <span className="radio-title">{v.label}</span>
                  </label>
                );
              })}
          </span>
        );
      }
      break;
    case 'textarea':
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
            onBlur={applyTextAreaChange}
          />
        </div>
      );
    default:
      return (
        <div className="rule-value-parent">
          <input
            type={inputType || 'text'}
            value={value}
            title={title}
            disabled={inputDisabled}
            className={className}
            placeholder={placeHolder}
            onChange={onTextInputChange}
          />{' '}
        </div>
      );
  }
};

ValueEditor.displayName = 'ValueEditor';

export default ValueEditor;
