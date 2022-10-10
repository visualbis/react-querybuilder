/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { Autocomplete } from '@visualbi/bifrost-ui/dist/react/forms/Autocomplete';
import { Dropdown } from '@visualbi/bifrost-ui/dist/react/forms/DropDown';
import { ValueEditorProps } from '../types';
import DatePicker from 'react-modern-calendar-datepicker';

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
  const [selectedDay, setSelectedDay] = useState<{day: null | number, month: null | number, year: null | number}>({day: null, month: null, year: null});
  const [isTodaySelected, setTodayDate] = useState(false);

  const onSelectChange = (value: any) => {
    handleOnChange(value.value);
  };
  const onDateChange = (dateObj) => {
    const tDay = dateObj.day;
    const tMonth = dateObj.month;
    const tYear = dateObj.year;
    setSelectedDay(dateObj)
    handleOnChange(tMonth + '/' + tDay + '/' + tYear);
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
      readOnly
      ref={ref}
      placeholder={placeHolder}
      value={selectedDay ? `${((selectedDay as any).month + "/" + (selectedDay as any).day + "/" + (selectedDay as any).year).toString()}` : ''}
      className={className}
    />
  );

  const onTodaysDateChange = (e) => {
    const tDay = new Date().getDate();
    const tMonth = new Date().getMonth() + 1;
    const tYear = new Date().getFullYear();
    setSelectedDay({day: tDay, month: tMonth, year: tYear})
    handleOnChange(tMonth + '/' + tDay + '/' + tYear);
    setTodayDate(e.target.value)
  }

  const renderToday = () => {
    return (
      <label className='calendar-footer-container'>
        <input type='radio' checked={isTodaySelected} onChange={onTodaysDateChange} />
        <span  className='footer-text'>{'Current Date'}</span>
      </label>
    )
  }

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
    case 'date':
      return (
        <div className='chronology-audit'>
        <DatePicker
          value={selectedDay as any}
          onChange={onDateChange}
          renderInput={renderCustomInput} // render a custom input
          shouldHighlightWeekends
          colorPrimary="#0078d4"
          colorPrimaryLight="#0078d41c"
          renderFooter={renderToday}
        />
        </div>
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
