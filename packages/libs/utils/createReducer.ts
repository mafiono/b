import type { Action } from 'redux';
import { ActionFn } from '../types/redux';

const createReducer = <T>(
  initialState: T,
  handlers: Record<string, ActionFn<T, any>>,
) => (state = initialState, action: Action<string> & any) =>
    (Object.prototype.hasOwnProperty.call(handlers, action.type)
      ? handlers[action.type](state, action)
      : state);

export default createReducer;
