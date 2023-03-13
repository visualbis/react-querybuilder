import React from 'react';
interface DatePickerComponentProps {
    handleOnChange?: () => void;
    setSelectedDay?: (e: any) => void;
    onDateChange?: (obj: any) => void;
    setCalendar: (v: boolean) => any;
    isTodaySelected?: boolean;
    onTodaysDateChange?: () => void;
    onSelectDateChange?: () => void;
}
declare const DatePickerComponent: React.FC<DatePickerComponentProps>;
export default DatePickerComponent;
