import React, { FC, useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import ReactModal from 'react-modal';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { SignUpTelegramModal } from '../../../containers/auth/SignupTelegramModal';
import { SignUpMetamaskModal } from '../../../containers/auth/SignUpMetamaskModal';
import { RestorePasswordModal } from '../../../containers/RestorePasswordModal';
import { ModalType } from '../../../store/modal/types';
import { SignInModal } from '../../../containers/SignInModal';
import { SignUpModal } from '../../../containers/SignUpModal';
import { ChatRainModal } from '../../../containers/chat/ChatRainModal';
import { ChatTippingModal } from '../../../containers/chat/ChatTippingModal';
import styles from './styles.module.scss';
import { OAuthSignupModal } from '../../../containers/auth/OAuthSignupModal';
import { SelectDateModal } from '../../../containers/profile/SelectDateModal';
import { WithdrawConfirmModal } from '../../../containers/profile/wallet/WithdrawConfirmModal';
import { WithdrawSuccessModal } from '../../../containers/profile/wallet/WithdrawSuccessModal';
import { SportBetsDateModal } from '../../../containers/profile/sportbets/SportBetsDateModal';
import { SportBetsFilterModal } from '../../../containers/profile/sportbets/SportBetsFilterModal';
import { TransactionFilterModal } from '../../../containers/profile/transaction/TransactionFilterModal';
import { GameLiveStatsModal } from '@betnomi/client/src/pages/Game/GameLiveStatsModal';

ReactModal.setAppElement('#root');

export type ModalComponentProps = { 
  onCloseModal: () => void 
};

const modalRenderers: Record<ModalType, FC<ModalComponentProps>> = {
  [ModalType.SignIn]: SignInModal,
  [ModalType.SignUp]: SignUpModal,
  [ModalType.RestorePassword]: RestorePasswordModal,
  [ModalType.ChatRain]: ChatRainModal,
  [ModalType.ChatTipping]: ChatTippingModal,
  [ModalType.OAuthSignup]: OAuthSignupModal,
  [ModalType.SignUpMetamask]: SignUpMetamaskModal,
  [ModalType.SignUpTelegram]: SignUpTelegramModal,
  [ModalType.SelectDate]: SelectDateModal,
  [ModalType.WithdrawalConfirm]: WithdrawConfirmModal,
  [ModalType.WithdrawalSuccess]: WithdrawSuccessModal,
  [ModalType.SportBetsDate]: SportBetsDateModal,
  [ModalType.SportBetsFilter]: SportBetsFilterModal,
  [ModalType.TransactionFilter]: TransactionFilterModal,
  [ModalType.GameLiveStats]: GameLiveStatsModal,
};

interface IProps {}

export const Modal: FC<IProps> = () => {
  const {
    current, active, onCloseModal,
  } = useModal();

  useEffect(() => {
    if (!active) {
      return;
    }

    disablePageScroll();
    return () => enablePageScroll();
  }, [active]);

  if (!active || !current) {
    return null;
  }

  return (
    <ReactModal
      isOpen={active}
      className={styles.modal}
      overlayClassName={styles.modal_overlay}
      shouldCloseOnOverlayClick
      onRequestClose={onCloseModal}
      preventScroll
    >
      {React.createElement(modalRenderers[current], { onCloseModal })}
    </ReactModal>
  );
};
