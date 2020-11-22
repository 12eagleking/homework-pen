import { renderHook, act } from '@testing-library/react-hooks';

import useOptionsCheck from './useOptionsCheck';
describe('useOptionsCheck', () => {
  it('initialization, toggle select all option, toggle other check options', () => {
    // initialization
    const props = {
      options: [
        { label: 'aaa', value: '1' },
        { label: 'bbb', value: '2' },
      ],
    };
    const { result } = renderHook(() => useOptionsCheck(props));
    expect(result.current.selectAllCheckStatus).toBe(false);
    expect(result.current.otherCheckedValues).toEqual([]);

    // toggle select all option to be checked
    act(() => {
      result.current.handleSelectAllChange({ checked: true, value: 'all' });
    });
    expect(result.current.selectAllCheckStatus).toBe(true);
    expect(result.current.otherCheckedValues).toEqual(['1', '2']);

    // // toggle select all option to be unchecked
    act(() => {
      result.current.handleSelectAllChange({ checked: false, value: 'all' });
    });
    expect(result.current.selectAllCheckStatus).toBe(false);
    expect(result.current.otherCheckedValues).toEqual([]);

    // toggle other check options
    act(() => {
      result.current.handleOtherChange({ checked: true, value: '1' });
    });
    expect(result.current.selectAllCheckStatus).toBe(false);
    expect(result.current.otherCheckedValues).toEqual(['1']);

    act(() => {
      result.current.handleOtherChange({ checked: true, value: '2' });
    });
    expect(result.current.selectAllCheckStatus).toBe(true);
    expect(result.current.otherCheckedValues).toEqual(['1', '2']);

    act(() => {
      result.current.handleOtherChange({ checked: false, value: '1' });
    });
    expect(result.current.selectAllCheckStatus).toBe(false);
    expect(result.current.otherCheckedValues).toEqual(['2']);
  });
});
