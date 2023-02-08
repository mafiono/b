import { ModalType } from '../../store/modal/types';

export type ModalState = {
  active: boolean;
  current?: ModalType;
};
