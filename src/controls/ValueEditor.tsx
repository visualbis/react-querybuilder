/* eslint-disable max-lines-per-function */
//tslint:disable:max-line-length
import React, { useState } from 'react';
import { Autocomplete } from '@visualbi/bifrost-ui/dist/react/forms/Autocomplete';
import { Dropdown } from '@visualbi/bifrost-ui/dist/react/forms/DropDown';
import { ValueEditorProps } from '../types';
import DatePickerComponent from './DatePickerComponent';

const renderCustomInput = (props) => {
  const { placeHolder, selectedDay, className, isShowCalendar, setCalendar } = props;
  const formattedValue = selectedDay
    ? `${(selectedDay as any).month}/${(selectedDay as any).day}/${(selectedDay as any).year}`
    : '';

  const onClick = () => {
    if (!isShowCalendar) setCalendar(true);
  };

  return (
    <div role="button" className={`date-input-container`} onClick={onClick}>
      <input
        className={`${className} custom-input-class`}
        readOnly
        placeholder={placeHolder}
        value={formattedValue}
      />
      {isShowCalendar && <DatePickerComponent {...props} />}
    </div>
  );
};

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

const renderNumber = (props) => {
  const { value, title, className, placeHolder, inputDisabled, handleOnChange } = props;
  const onChange = (e) => {
    e.target.value = Math.abs(e.target.value.replace(/[^0-9]/, ''));
    handleOnChange(e.target.value);
  };

  return (
    <div className="rule-value-parent">
      <input
        type="number"
        step={1}
        onInput={onChange}
        value={value}
        title={title}
        disabled={inputDisabled}
        className={className}
        placeholder={placeHolder}
        role="spinbutton"
        aria-valuemin={0}
        aria-valuemax={100000}
        min={0}
        aria-valuenow={1}
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
          );
        })}
    </span>
  );
};

const onDateChange = (dateObj, setSelectedDay, handleOnChange) => {
  setSelectedDay(dateObj);
  handleOnChange(dateObj ? `${dateObj.month}/${dateObj.day}/${dateObj.year}` : null);
};

const onCustomRendererChange = (val, handleOnChange, key = 'id') => {
  handleOnChange({ [key]: val[key], email: val.value });
};

const convertDateObj = (dateString) => {
  if (
    !dateString ||
    typeof dateString !== 'string' ||
    (typeof dateString === 'string' && !dateString.includes('/'))
  )
    return null;
  const d = new Date(dateString);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return {
    day: day,
    month: month,
    year: year
  };
};
const ValueEditor: React.FC<ValueEditorProps> = (props) => {
  const {
    operator,
    value,
    handleOnChange,
    type,
    placeHolder,
    values,
    customRenderer,
    getSelectionKey,
    field,
    valueMeta
  } = props;
  let inputDisabled = false;
  let options: any[] = [];
  let selectedOption;
  let fieldType = type;
  let fieldPlaceHolder = placeHolder;
  if (
    [
      'null',
      'notNull',
      'none',
      'daysInThis',
      'weeksInThis',
      'monthsInThis',
      'yearsInThis'
    ].includes(operator as string) ||
    fieldType === 'none'
  ) {
    fieldType = 'text';
    inputDisabled = true;
    fieldPlaceHolder = '';
  }
  if (operator === 'equals' && field === 'Dates.date') {
    fieldType = 'none';
    inputDisabled = true;
    fieldPlaceHolder = '';
  }
  const [_value, setValue] = useState(value);

  const [selectedDay, setSelectedDay] = useState<null | {
    day: number;
    month: number;
    year: number;
  }>(convertDateObj(value));

  const [isTodaySelected, setTodayDate] = useState<boolean>(false);
  const [isShowCalendar, setCalendar] = useState<boolean>(false);
  const onTextAreaChange = (e: any) => setValue(e.target.value);
  const onTodaysDateChange = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    onDateChange({ day, month, year }, setSelectedDay, handleOnChange);
    setTodayDate(true);
  };

  const onSelectDateChange = () => {
    onDateChange(null, setSelectedDay, handleOnChange);
    setTodayDate(false);
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
    case 'date': {
      const propList = {
        ...props,
        placeHolder: fieldPlaceHolder,
        isShowCalendar,
        setCalendar,
        isTodaySelected,
        onTodaysDateChange,
        onSelectDateChange,
        selectedDay,
        setSelectedDay,
        onDateChange
      };
      return renderCustomInput(propList);
    }
    case 'radio':
      return renderRadio(props);
    // return renderTextArea({ ...props, onTextAreaChange, _value, inputDisabled });
    case 'textarea':
    case 'custom':
    case 'text': {
      const key = (field && getSelectionKey?.(field)) || 'id';
      if (customRenderer)
        return customRenderer({
          ...props,
          onTextAreaChange,
          onChange: (val) => onCustomRendererChange(val, handleOnChange, key)
        });
      return <></>;
    }
    case 'numeric':
      return renderNumber({ ...props, inputDisabled });
    case 'none':
      return <></>;
    default:
      return renderDefault({ ...props, inputDisabled });
  }
};

ValueEditor.displayName = 'ValueEditor';

export default ValueEditor;
