import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { FormikHelpers } from 'formik';
import { authRestorePassword } from 'store/auth/actionCreators';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { HocModal } from '../../components/modal/HocModal';
import { AuthErrorTransformResult } from '../../types/store/auth';
import { RestorePasswordForm } from '../../components/auth/RestorePasswordForm';
import { RestorePasswordValues, useRestorePasswordFormik } from '../../hooks/formik/useRestorePasswordFormik';
import { ModalComponentProps } from '../../components/modal/Modal';
import styles from './styles.module.scss';

interface IProps extends ModalComponentProps {}

export const RestorePasswordModal: React.FC<IProps> = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('main');
  const { showErrorToast, hideToast } = useToasts();

  const onSubmit = useCallback(
    (
      values: RestorePasswordValues,
      { resetForm, setErrors }: FormikHelpers<RestorePasswordValues>,
    ) => {
      hideToast();
      
      const callback = (e?: AuthErrorTransformResult) => {
        if (e) {
          if (e.message) {
            showErrorToast(t(e.message), t('Warning'));
          }
          if (e.fields) {
            setErrors(e.fields);
          }
          return; 
        }
        resetForm();
      };
      dispatch(authRestorePassword(values, callback));
    }, [dispatch, showErrorToast, hideToast],
  );

  const {
    values, handleChange, handleSubmit, errors, touched, handleBlur,
  } = useRestorePasswordFormik(
    { username: '' },
    onSubmit,
  );

  return (
    <HocModal
      onClose={onCloseModal}
      title={(
        <span className={styles.label}>
          {t('Lost your password?')}
        </span>
      )}
    >
      <div className={styles.out}>
        <p className={styles.desc}>
          {t('No worries, just enter the email registered to your Betnomi account and we will send you a password reset link.')}
        </p>
        <RestorePasswordForm
          values={values}
          onUserChange={handleChange('username')}
          handleBlurUser={handleBlur('username')}
          onSubmit={handleSubmit}
          errors={errors}
          touched={touched}
        />
      </div>
    </HocModal>
  );
};
