import './MultiCheck.css';

import React, {useState} from 'react';

export type Option = {
  label: string,
  value: string
}

interface CheckedOptionProps extends Option {
  checked: boolean;
  onChange?: (e: {checked: boolean, value: string}) => void;
}

const CheckOption: React.FunctionComponent<CheckedOptionProps> = (props): JSX.Element => {
  const handleChange = (e: React.ChangeEvent) => {
    // e.preventDefault();
    props.onChange && props.onChange({checked: !props.checked, value: props.value});
  }

  return <div className="CheckOption">
    <input type="checkbox" checked={props.checked} value={props.value} onChange={handleChange} />{props.label}
  </div>
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values?: string[]
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const allOption: Option = {
    label: 'Select All',
    value: 'all',
  };
  
  // selcect all check status
  const initialCheckedValues = props.values || [];
  const [checkedValues, setCheckedValues] = useState(initialCheckedValues);

  const initialSelectAllCheckStatus = props.options.every(option => checkedValues.some(value => option.value === value));
  const [selectAllCheckStatus, setSelectAllCheckStatus] = useState(initialSelectAllCheckStatus);

  // select all onChange handler
  const handleSelectAllChange: CheckedOptionProps['onChange'] = (e) => {
    setSelectAllCheckStatus(e.checked);
    const currentCheckedValues = e.checked ? props.options.map(option => option.value) : [];
    setCheckedValues(currentCheckedValues);

    const selectedOptions = props.options.filter(option => currentCheckedValues.some(value => value === option.value));
    props.onChange && props.onChange(selectedOptions);
  }

  // other options onChange handler
  const handleChange: CheckedOptionProps['onChange'] = e => {
    function getCheckValues(checked: boolean, value: string): string[] {
      if (checked) {
        return props.options.filter(option => checkedValues.some(value => value === option.value) || option.value === e.value).map(it => it.value);
      } else {
        return checkedValues.filter(it => it !== value);
      }
    }
    const currentCheckedValues = getCheckValues(e.checked, e.value);
    setCheckedValues(currentCheckedValues);

    const selectAllChecked = props.options.every(option => currentCheckedValues.some(value => value === option.value));
    setSelectAllCheckStatus(selectAllChecked);

    const selectedOptions = props.options.filter(option => currentCheckedValues.some(value => value === option.value));
    props.onChange && props.onChange(selectedOptions);
  }

  return <div className='MultiCheck'>
    {props.label ? <label>{props.label}</label> : null}
    <div className="OptionsContainer" style={{
      columnCount: props.columns || 1,
    }}>
      {
        props.options.length ? <CheckOption
          key={allOption.value}
          label={allOption.label} 
          value={allOption.value}
          checked={selectAllCheckStatus}
          onChange={handleSelectAllChange}
        /> : null
      }
      {/* TODO */
        props.options.map(({label, value}) => {
          const checked = checkedValues.some((it) => it === value);
          return <CheckOption
            key={value}
            label={label}
            value={value}
            checked={checked}
            onChange={handleChange}
          />
        })
      }
    </div>
  </div>
}

export default MultiCheck;
