import React from 'react';
import { NotToggleProps } from '../types';

const NotToggle: React.FC<NotToggleProps> = ({ className, handleOnChange, title, checked }) => {
const onChange = (e:any) => handleOnChange(e.target.checked)
  return (
    <label className={className} title={title}>
      <input
        role="checkbox"
        aria-checked={!!checked}
        type="checkbox"
        onChange={onChange}
        checked={!!checked}
      />
      Not
    </label>
  );
};

NotToggle.displayName = 'NotToggle';

export default NotToggle;
