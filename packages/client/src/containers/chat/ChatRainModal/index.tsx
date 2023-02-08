import React, { FC, useCallback } from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { ChatRainForm } from '../../../components/chat/ChatRainForm';
import {
  ChatRainFormikValues,
  chatRainInitialValues,
  useChatRainFormik,
} from '../../../hooks/formik/useChatRainFormik';
import { ModalComponentProps } from '../../../components/modal/Modal';
import { useTranslation } from '../../../i18n';
import styles from '../ChatTippingModal/styles.module.scss';
import { HocModal } from '../../../components/modal/HocModal';
import { chatSendRain } from '../../../store/chat/actionCreators';
import { ChatRainCallbackErrors } from '../../../utils/api/transforms';
import { useOnLogout } from '../../../hooks/useOnLogout';
import { useUser } from '../../../hooks/useUser';
import { useChatMinRainAmount } from '../../../hooks/money/useChatMinRainAmount';

interface IProps extends ModalComponentProps {}

const Title = () => {
  const { t } = useTranslation('main');

  return (
    <div className={styles.title}>
      <FontIcon name={FontIconName.Water} size={24} />
      <span>{t('Rain')}</span>
    </div>
  );
};

const ChatRainModal: FC<IProps> = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('main');
  const { showErrorToast, hideToast } = useToasts();

  useOnLogout(onCloseModal);

  const onSend = useCallback(
    (
      values: ChatRainFormikValues,
      {
        resetForm,
        setErrors,
        setSubmitting,
      }: FormikHelpers<ChatRainFormikValues>,
    ) => {
      hideToast();

      const cb = (e?: ChatRainCallbackErrors) => {
        setSubmitting(false);

        if (e) {
          if (e.message) {
            showErrorToast(e.message, t('Error'));
          }

          if (e.fields) {
            setErrors(e.fields);
          }

          return;
        }

        resetForm();
      };

      dispatch(chatSendRain(values, cb));
    },
    [dispatch, showErrorToast, hideToast],
  );

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
  } = useChatRainFormik(chatRainInitialValues, onSend);
  const { balances } = useUser();

  const min = useChatMinRainAmount(values.coin);

  return (
    <HocModal onClose={onCloseModal} title={<Title />}>
      <ChatRainForm
        coin={values.coin}
        balances={balances}
        amount={values.amount}
        min={min}
        message={values.message}
        persons={values.persons}
        touched={touched}
        errors={errors}
        isLoading={isSubmitting}
        onTouchAmount={handleBlur('amount')}
        onTouchPersons={handleBlur('persons')}
        onTouchMessage={handleBlur('message')}
        onSubmit={handleSubmit}
        onChangeCoin={handleChange('coin')}
        onChangeAmount={handleChange('amount')}
        onChangeMessage={handleChange('message')}
        onChangePersons={handleChange('persons')}
      />
    </HocModal>
  );
};

export { ChatRainModal };
