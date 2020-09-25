import React from 'react';
import { ActionProps } from '../types';

const ActionElement: React.FC<ActionProps> = ({ className, handleOnClick, label, title }) => {
  const onClick = (e:any) => handleOnClick(e);
  return ( 
  <button className={className} title={title} onClick={onClick}>
    {label}
  </button>
)};

ActionElement.displayName = 'ActionElement';

export default ActionElement;
