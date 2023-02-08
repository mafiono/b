import React, { FC, useCallback } from 'react';
import { SelectDateForm } from 'components/transaction/SelectDateForm';
import { useDispatch } from 'react-redux';
import { profileSetTransactionAll } from 'store/profile/actionCreators';
import { ModalComponentProps } from '../../../components/modal/Modal';
import { HocModal } from '../../../components/modal/HocModal';
import { useShallowSelector } from '../../../hooks';
import { selectProfileTransactionAll } from '../../../store/profile/selectors';
import { useTranslation } from '../../../i18n';

interface Props extends ModalComponentProps {
}

export const SelectDateModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('main');
  const dispatch = useDispatch();
  const { fromDate, toDate } = useShallowSelector(selectProfileTransactionAll);

  const handleSubmit = useCallback((endTime:string, beginTime: string) => {
    dispatch(profileSetTransactionAll({
      fromDate: new Date(beginTime).getTime(), 
      toDate: new Date(endTime).getTime(), 
    }));
    onCloseModal();
  }, [dispatch, onCloseModal]);

  return (
    <HocModal
      title={<span>{t('Customize time range')}</span>} 
      onClose={onCloseModal}
    >
      <SelectDateForm onSubmit={handleSubmit} fromDate={String(fromDate)} toDate={String(toDate)} />
    </HocModal>
  );
};
