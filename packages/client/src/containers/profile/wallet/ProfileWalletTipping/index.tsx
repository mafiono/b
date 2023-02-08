import React, { FC } from 'react';
import { ChatTippingForm } from '../../../../components/chat/ChatTippingForm';
import { chatTippingInitialValues, useChatTippingFormik } from '../../../../hooks/formik/useChatTippingFormik';
import styles from './styles.module.scss';

interface Props {
}

const ProfileWalletTipping: FC<Props> = () => {
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
      formClassName={styles.form}
      amountClassName={styles.amount}
      submitClassName={styles.submit}
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
  );
};

export { ProfileWalletTipping };
