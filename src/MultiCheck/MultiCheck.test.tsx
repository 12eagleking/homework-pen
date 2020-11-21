import React from 'react';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MultiCheck from './MultiCheck';

// TODO more tests

describe('MultiCheck', () => {
  const testLabel = 'test label';

  describe('initialize', () => {
    afterEach(cleanup);

    it('renders the label if label provided', () => {
      const { container } = render(<MultiCheck label={testLabel} options={[]} />);
      expect(container.querySelector('.MultiCheck > label')).toHaveTextContent(testLabel);
    });
  });

  describe('check list render', () => {
    const options = [
      {label: 'aaa', value: '111',},
      {label: 'bbb', value: '222',},
      {label: 'ccc', value: '333',},
      {label: 'ddd', value: '444',},
      {label: 'eee', value: '555',},
      {label: 'fff', value: '666',},
      {label: 'ggg', value: '777',},
      {label: 'hhh', value: '888',},
      {label: 'iii', value: '999',},
    ]

    afterEach(cleanup);

    it('render an empty check options list if options is empty', () => {
      const { container } = render(<MultiCheck label={testLabel} options={[]} />);
      const checkOption = container.querySelector('.OptionsContainer > .CheckOption');
      expect(checkOption).not.toBeInTheDocument();
    });

    it('render the check options list when options is not empty', () => {
      const { container } = render(<MultiCheck label={testLabel} options={options} />);
      const checkOptions = container.querySelectorAll('.OptionsContainer > .CheckOption');
      
      expect(checkOptions[0]).toHaveTextContent('Select All'); // `Select All` option rendered
      expect(checkOptions.length).toBe(1 + options.length);
    });
  });
});
