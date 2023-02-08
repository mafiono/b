import { shallowEqual, useSelector } from 'react-redux';
import { State } from '../types/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useShallowSelector = <T extends (state: State) => any>(selector: T):
ReturnType<T> => useSelector(selector, shallowEqual);

export default useShallowSelector;
