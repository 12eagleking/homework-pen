import React from 'react';

import { Props, Option } from '../MultiCheck';
import CheckOption from '../CheckOption';
import useOptionsCheck from '../../hooks/useOptionsCheck';

export type OptionListProps = Omit<Props, 'label'>;

const allOption: Option = {
  label: 'Select All',
  value: 'all',
};

const OptionList: React.FunctionComponent<OptionListProps> = (props) => {
  const {
    selectAllCheckStatus,
    handleSelectAllChange,
    otherCheckedValues,
    handleOtherChange,
  } = useOptionsCheck(props);

  return (
    <div
      className="OptionsContainer"
      style={{
        columnCount: props.columns || 1,
      }}
    >
      {/* check option `Select All` */
      props.options.length ? (
        <CheckOption
          key={allOption.value}
          label={allOption.label}
          value={allOption.value}
          checked={selectAllCheckStatus}
          onChange={handleSelectAllChange}
        />
      ) : null}
      {/* other check options */
      props.options.map(({ label, value }) => {
        const checked = otherCheckedValues.some((it) => it === value);
        return (
          <CheckOption
            key={value}
            label={label}
            value={value}
            checked={checked}
            onChange={handleOtherChange}
          />
        );
      })}
    </div>
  );
};

export default OptionList;
