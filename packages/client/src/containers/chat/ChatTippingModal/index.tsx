import React, { FC } from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { ChatTippingForm } from '../../../components/chat/ChatTippingForm';
import { chatTippingInitialValues, useChatTippingFormik } from '../../../hooks/formik/useChatTippingFormik';
import { HocModal } from '../../../components/modal/HocModal';
import { ModalComponentProps } from '../../../components/modal/Modal';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';
import { useOnLogout } from '../../../hooks/useOnLogout';

interface IProps extends ModalComponentProps {}

const Title = () => {
  const { t } = useTranslation('main');

  return (
    <div className={styles.title}>
      <FontIcon name={FontIconName.Bitcoin} size={24} />
      <span>{t('Tip')}</span>
    </div>
  );
};

const ChatTippingModal: FC<IProps> = ({ onCloseModal }) => {
  useOnLogout(onCloseModal);

  const {
    formik: {
      handleSubmit,
      handleChange,
      values,
      touched,
      errors,
      handleBlur,
    },
    min,
    balances,
    excludeUser,
    onChangePrivate,
  } = useChatTippingFormik(chatTippingInitialValues);

  return (
    <HocModal onClose={onCloseModal} title={<Title />}>
      <ChatTippingForm
        coin={values.coin}
        amount={values.amount}
        min={min}
        balance={balances[values.coin] || 0}
        recipientLabel={values.recipientLabel}
        recipientValue={values.recipientValue}
        isPrivate={values.isPrivate}
        touched={touched}
        errors={errors}
        excludeUser={excludeUser}
        onTouchCoin={handleBlur('coin')}
        onTouchAmount={handleBlur('amount')}
        onTouchRecipient={handleBlur('recipient')}
        onSubmit={handleSubmit}
        onRecipientLabelChange={handleChange('recipientLabel')}
        onRecipientValueChange={handleChange('recipientValue')}
        onChangeCoin={handleChange('coin')}
        onChangeAmount={handleChange('amount')}
        onChangePrivate={onChangePrivate}
      />
    </HocModal>
  );
};

export { ChatTippingModal };
