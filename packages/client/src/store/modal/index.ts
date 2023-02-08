import createReducer from '@betnomi/libs/utils/createReducer';
import { ModalState } from '../../types/store/modal';
import { modalHandlers } from './handlers';

export const modalInitialState: Readonly<ModalState> = {
  active: false,
  current: undefined,
};

export default createReducer(modalInitialState, modalHandlers);
