import React, { useState } from 'react';

import { OptionListProps } from '../MultiCheck/OptionList';
import { CheckedOptionProps } from '../MultiCheck/CheckOption';

function useOptionsCheck(props: OptionListProps) {
  const initialCheckedValues = props.values || [];
  const [checkedValues, setCheckedValues] = useState(initialCheckedValues);

  const initialSelectAllCheckStatus = props.options.every((option) =>
    checkedValues.some((value) => option.value === value)
  );
  const [selectAllCheckStatus, setSelectAllCheckStatus] = useState(
    initialSelectAllCheckStatus
  );

  // select all onChange handler
  const handleSelectAllChange: CheckedOptionProps['onChange'] = (e) => {
    setSelectAllCheckStatus(e.checked);
    const currentCheckedValues = e.checked
      ? props.options.map((option) => option.value)
      : [];
    setCheckedValues(currentCheckedValues);

    const selectedOptions = props.options.filter((option) =>
      currentCheckedValues.some((value) => value === option.value)
    );
    props.onChange && props.onChange(selectedOptions);
  };

  // other options onChange handler
  const handleChange: CheckedOptionProps['onChange'] = (e) => {
    function getCheckValues(checked: boolean, value: string): string[] {
      if (checked) {
        return props.options
          .filter(
            (option) =>
              checkedValues.some((value) => value === option.value) ||
              option.value === e.value
          )
          .map((it) => it.value);
      } else {
        return checkedValues.filter((it) => it !== value);
      }
    }
    const currentCheckedValues = getCheckValues(e.checked, e.value);
    setCheckedValues(currentCheckedValues);

    const selectAllChecked = props.options.every((option) =>
      currentCheckedValues.some((value) => value === option.value)
    );
    setSelectAllCheckStatus(selectAllChecked);

    const selectedOptions = props.options.filter((option) =>
      currentCheckedValues.some((value) => value === option.value)
    );
    props.onChange && props.onChange(selectedOptions);
  };

  return {
    selectAllCheckStatus,
    handleSelectAllChange,
    otherCheckedValues: checkedValues,
    handleOtherChange: handleChange,
  };
}

export default useOptionsCheck;
