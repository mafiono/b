import React, { FC, useCallback } from 'react';

import { ModalComponentProps } from '../../../../components/modal/Modal';
import { HocModal } from '../../../../components/modal/HocModal';

import { useTranslation } from '../../../../i18n';
import {TransactionAll} from "../TransactionAll";

interface Props extends ModalComponentProps {
}

export const TransactionFilterModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('profile');

  return (
    <HocModal
      title={<span>{t('Filter')}</span>}
      onClose={onCloseModal}
    >
      <TransactionAll ClassName={'sportBets'}/>
    </HocModal>
  );
};
