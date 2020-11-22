import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MultiCheck, { Option } from './MultiCheck';

describe('MultiCheck', () => {
  const testLabel = 'test label';
  const options = [
    { label: 'aaa', value: '111' },
    { label: 'bbb', value: '222' },
    { label: 'ccc', value: '333' },
    { label: 'ddd', value: '444' },
    { label: 'eee', value: '555' },
    { label: 'fff', value: '666' },
    { label: 'ggg', value: '777' },
    { label: 'hhh', value: '888' },
    { label: 'iii', value: '999' },
  ];

  describe('initialize', () => {
    afterEach(cleanup);

    it('renders the label if label provided', () => {
      const { container } = render(
        <MultiCheck label={testLabel} options={[]} />
      );
      expect(container.querySelector('.MultiCheck > label')).toHaveTextContent(
        testLabel
      );
    });
  });

  describe('check list render', () => {
    afterEach(cleanup);

    it('render an empty check options list if options is empty', () => {
      const { container } = render(
        <MultiCheck label={testLabel} options={[]} />
      );
      const checkOption = container.querySelector(
        '.OptionsContainer > .CheckOption'
      );
      expect(checkOption).not.toBeInTheDocument();
    });

    it('render the check options list when options is not empty', () => {
      const { container } = render(
        <MultiCheck label={testLabel} options={options} />
      );
      const checkOptions = container.querySelectorAll(
        '.OptionsContainer > .CheckOption'
      );

      expect(checkOptions[0]).toHaveTextContent('Select All'); // `Select All` option rendered
      expect(checkOptions.length).toBe(1 + options.length);
    });
  });

  describe('check list checking operations', () => {
    afterEach(cleanup);

    it('`Select All` check test', () => {
      const { container } = render(
        <MultiCheck label={testLabel} options={options} />
      );

      const checkOptions = container.querySelectorAll(`input[type="checkbox"]`);
      const selectAllEl = checkOptions[0];

      // initial check list options status -- all options unchecked
      checkOptions.forEach((el) => {
        expect(el).not.toBeChecked();
      });

      // `Select All` checked, all other options are checked
      fireEvent.click(selectAllEl);
      checkOptions.forEach((el) => {
        expect(el).toBeChecked();
      });

      // `Select All` unchecked, all other options are unchecked
      fireEvent.click(selectAllEl);
      checkOptions.forEach((el) => {
        expect(el).not.toBeChecked();
      });
    });

    it('if all other options are checked, `Select All` should be checked', () => {
      const options = [
        { label: 'aaa', value: '111' },
        { label: 'bbb', value: '222' },
      ];
      const defaultValues = ['111', '222'];
      const { container } = render(
        <MultiCheck
          label={testLabel}
          options={options}
          values={defaultValues}
        />
      );

      const selectAllEl = container.querySelector(
        `input[type='checkbox'][value='all']`
      );
      const checkOption1 = container.querySelector(
        `input[type='checkbox'][value='${options[0].value}']`
      );
      const checkOption2 = container.querySelector(
        `input[type='checkbox'][value='${options[1].value}']`
      );

      expect(checkOption1).toBeChecked();
      expect(checkOption2).toBeChecked();
      expect(selectAllEl).toBeChecked();

      fireEvent.click(checkOption2!);
      expect(checkOption1).toBeChecked();
      expect(checkOption2).not.toBeChecked();
      expect(selectAllEl).not.toBeChecked();

      fireEvent.click(checkOption2!);
      expect(checkOption1).toBeChecked();
      expect(checkOption2).toBeChecked();
      expect(selectAllEl).toBeChecked();
    });

    it('if any other option are unchecked, `Select All` should be unchecked', () => {
      const options = [
        { label: 'aaa', value: '111' },
        { label: 'bbb', value: '222' },
      ];
      const defaultValues = ['111'];
      const { container } = render(
        <MultiCheck
          label={testLabel}
          options={options}
          values={defaultValues}
        />
      );

      const selectAllEl = container.querySelector(
        `input[type='checkbox'][value='all']`
      );
      const checkOption1 = container.querySelector(
        `input[type='checkbox'][value='${options[0].value}']`
      );
      const checkOption2 = container.querySelector(
        `input[type='checkbox'][value='${options[1].value}']`
      );

      expect(checkOption1).toBeChecked();
      expect(checkOption2).not.toBeChecked();
      expect(selectAllEl).not.toBeChecked();

      fireEvent.click(checkOption2!);
      expect(checkOption1).toBeChecked();
      expect(checkOption2).toBeChecked();
      expect(selectAllEl).toBeChecked();

      fireEvent.click(checkOption1!);
      expect(checkOption1).not.toBeChecked();
      expect(checkOption2).toBeChecked();
      expect(selectAllEl).not.toBeChecked();
    });
  });
});
