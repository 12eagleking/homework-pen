import React, { useState } from 'react';

import { Props, Option } from '../MultiCheck';
import CheckOption, { CheckedOptionProps } from '../CheckOption';

type OptionListProps = Omit<Props, 'label'>

const allOption: Option = {
  label: 'Select All',
  value: 'all',
};

const OptionList: React.FunctionComponent<OptionListProps> = (props) => {
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

  return <div className="OptionsContainer" style={{
    columnCount: props.columns || 1,
  }}>
    {/* check option `Select All` */
      props.options.length ? <CheckOption
        key={allOption.value}
        label={allOption.label} 
        value={allOption.value}
        checked={selectAllCheckStatus}
        onChange={handleSelectAllChange}
      /> : null
    }
    {/* other check options */
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
};

export default OptionList;