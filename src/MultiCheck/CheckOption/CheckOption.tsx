import React from 'react';

import { Option } from '../MultiCheck'; 

export interface CheckedOptionProps extends Option {
  checked: boolean;
  onChange?: (e: {checked: boolean, value: string}) => void;
}

const CheckOption: React.FunctionComponent<CheckedOptionProps> = (props): JSX.Element => {
  const handleChange = (e: React.ChangeEvent) => {
    props.onChange && props.onChange({checked: !props.checked, value: props.value});
  }

  return <div className="CheckOption">
    <input type="checkbox" checked={props.checked} value={props.value} onChange={handleChange} />{props.label}
  </div>
}

export default CheckOption;
