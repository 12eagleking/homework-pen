import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import OptionList, { OptionListProps } from './OptionList';

describe('OptionList', () => {
  describe('initialize', () => {
    afterEach(cleanup);

    it('render empty list, when options is empty', () => {
      const props: OptionListProps = {
        options: [],
      };
      const { container } = render(<OptionList {...props} />);
      const checkOption = container.querySelector('.OptionsContainer > .CheckOption');
      expect(checkOption).not.toBeInTheDocument();
    });

    it('render non-empty list, when options is not empty and not all option selected', () => {
      const props: OptionListProps = {
        options: [
          {label: 'aaa', value: '1',},
          {label: 'bbb', value: '2',},
        ],
        values: ['1'],
      };
      const { container } = render(<OptionList {...props} />);
      const checkOptionList = container.querySelectorAll('.OptionsContainer > .CheckOption');
      expect(checkOptionList.length).toBe(1 + props.options.length);
      expect(container.querySelector(`input[type='checkbox'][value='1']`)).toBeChecked();
    });

    it('render non-empty list, when options is not empty and all options selected', () => {
      const props: OptionListProps = {
        options: [
          {label: 'aaa', value: '1',},
          {label: 'bbb', value: '2',},
        ],
        values: ['1', '2'],
      };
      const { container } = render(<OptionList {...props} />);
      const checkOptionList = container.querySelectorAll('.OptionsContainer > .CheckOption');
      expect(checkOptionList.length).toBe(1 + props.options.length);
      ['all', '1', '2'].forEach(value => {
        expect(container.querySelector(`input[type='checkbox'][value='${value}']`)).toBeChecked();
      })
    });
  });

  // describe('', () => {});
});