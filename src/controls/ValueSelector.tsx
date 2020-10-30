import React from 'react';

import SelectSearch from 'react-select-search';
import { ValueSelectorProps, Field } from '../types';

const ValueSelector: React.FC<ValueSelectorProps> = ({
  className,
  handleOnChange,
  options,
  title,
  value
}) => { 
 const onChange =  (value:any) =>{ handleOnChange(value)}

 let _options:any[] = options!.map((item)=> {
  const prefix:string = item.type === "number"? "Σ ":"";
   return  {value:item.name, name:prefix+item.label};
  });
 return    (<div className={className}><SelectSearch   options={_options} value={value} placeholder={"Select data field"} onChange={onChange}  autoComplete={"on"}
  /></div>)
};

ValueSelector.displayName = 'ValueSelector';

export default ValueSelector;
