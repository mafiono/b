import React, { useCallback } from 'react';
import { LineDivorce } from '@betnomi/libs/components';
import { useDispatch } from 'react-redux';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { showSuccessToast } from '@betnomi/libs/components/Toaster';
import { FormikHelpers } from 'formik';
import { useModal } from 'hooks/useModal';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { AuthErrorTransformResult } from '../../types/store/auth';
import { LoginBanner } from '../../components/auth/LoginBanner';
import { HocModal } from '../../components/modal/HocModal';
import { SignInForm } from '../../components/auth/SignInForm';
import { ModalType } from '../../store/modal/types';
import { ModalSwitcher } from '../../components/modal/ModalSwitcher';
import { authLogin } from '../../store/auth/actionCreators';
import { SignInFormikValues, useSignInFormik } from '../../hooks/formik/useSignInFormik';
import useShallowSelector from '../../hooks/useShallowSelector';
import { selectAuthLogin } from '../../store/auth/selectors';
import { ModalComponentProps } from '../../components/modal/Modal';
import { SocialButtonContainer } from '../SocialButtonContainer';
import styles from './styles.module.scss';

interface IProps extends ModalComponentProps {}

export const SignInModal: React.FC<IProps> = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('main');
  const { isLoading } = useShallowSelector(selectAuthLogin);
  const { showModal } = useModal();
  const { showErrorToast, hideToast } = useToasts();

  const onSubmit = useCallback(
    (
      values: SignInFormikValues,
      { resetForm, setErrors }: FormikHelpers<SignInFormikValues>,
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
        showSuccessToast('', t('Welcome'));
        resetForm();
      };

      dispatch(authLogin(values, callback));
    },
    [isLoading, dispatch, showErrorToast, hideToast],
  );

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
  } = useSignInFormik(
    { username: 'testvnd@test.com', password: 'Password1a' },
    onSubmit,
  );

  return (
    <HocModal
      onClose={onCloseModal}
      title={(
        <span className={styles.label}>
          {t('Welcome back to')}
          <b>
            {' '}
            {t('Betnomi')}
          </b>
        </span>
      )}
    >
      <div className={styles.banner}>
        <LoginBanner />
      </div>
      <SignInForm
        values={values}
        onUserChange={handleChange('username')}
        onPasswordChange={handleChange('password')}
        onSubmit={handleSubmit}
        onRestoreOpen={showModal(ModalType.RestorePassword)}
        handleBlurUser={handleBlur('username')}
        handleBlurPassword={handleBlur('password')}
        errors={errors}
        touched={touched}
        loading={isLoading}
      />
      <LineDivorce text={t('Or sign in with')} />
      <div className={styles.socials_wrap}>
        <SocialButtonContainer signin />
      </div>
      <div className={styles.line_out}>
        <LineDivorce />
      </div>
      <ModalSwitcher
        labelTo={t('Signup')}
        onModalSwitch={showModal(ModalType.SignUp)}
        desc={t("Don't have an account?")}
      />
    </HocModal>
  );
};
