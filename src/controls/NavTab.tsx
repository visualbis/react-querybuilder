import React from 'react';
import { ValueSelectorProps } from '../types';

const NavTab: React.FC<ValueSelectorProps> = ({
  className,
  handleOnChange,
  options,
  title,
  value
}) => { 
 const onChange =  (e:any) =>{
    handleOnChange(e.target.value);
 } 
  return (

    <span className={className} title={title}>
    {options!.map((v) => {
    const isChecked =   value === v.name;
       return (
      <label key={v.name}>
        <input
          type="radio"
          value={v.name}
          aria-checked={isChecked}
          checked={isChecked}
          onChange={onChange}
        />
        {v.label}
      </label>
    )})}
  </span>

    //   <div className={className}>
    //       {options.map((option) => {
    //   const key = option.id ? `key-${option.id}` : `key-${option.name}`;
    //   const cls =  value == option.name?"combinators active":"combinators";
    //   return (
    //     <input type="button" className={cls} role="button" data-key={option.name} key={option.name} onClick={onChange} value={option.label}/>
    //   );
    // })}
    //   </div>
 
)};

NavTab.displayName = 'NavTab';

export default NavTab;
