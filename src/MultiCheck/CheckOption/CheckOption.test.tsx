import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CheckOption, { CheckedOptionProps } from './CheckOption';

describe('CheckOption', () => {
  describe('initialize', () => {
    afterEach(cleanup);

    it('renders', () => {
      const props: CheckedOptionProps = {
        label: 'test',
        value: '0',
        checked: true,
      };
      const { container } = render(<CheckOption {...props} />);
      const checkbox = container.querySelector(`input[type='checkbox'][value='${props.value}']`);
      expect(checkbox).toBeChecked();
    });
  });
});