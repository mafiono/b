import React, { FC, useCallback } from 'react';
import { FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { ModalComponentProps } from '../../../components/modal/Modal';
import { HocModal } from '../../../components/modal/HocModal';
import { useTranslation } from '../../../i18n';
import { OAuthLoginForm } from '../../../components/auth/OAuthLoginForm';
import { OAuthLoginFormikValues, useOauthLoginFormik } from '../../../hooks/formik/useOAuthLoginFormik';
import { authSignupTelegram } from '../../../store/auth/actionCreators';

interface Props extends ModalComponentProps {
}

export const SignUpTelegramModal: FC<Props> = ({ onCloseModal }) => {
  const { t } = useTranslation('main');
  const dispatch = useDispatch();
  const { hideToast, showErrorToast } = useToasts();

  const onSend = useCallback(
    (
      values: OAuthLoginFormikValues,
      { resetForm, setErrors, setSubmitting }: FormikHelpers<OAuthLoginFormikValues>,
    ) => {
      hideToast();

      const cb = (e?: string) => {
        setSubmitting(false);

        if (e) {
          showErrorToast(t(e), t('Error'));
          setErrors({ login: e });
          return;
        }

        resetForm();
      };

      dispatch(authSignupTelegram(values, cb));
    },
    [dispatch, showErrorToast, hideToast],
  );

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useOauthLoginFormik({ login: '', terms: false }, onSend);

  const handleTerms = useCallback((v: boolean) => {
    setFieldValue('terms', v);
  }, [values]);

  return (
    <HocModal title={<span>{t('Choose username')}</span>} onClose={onCloseModal}>
      <OAuthLoginForm
        login={values.login}
        errors={errors}
        touched={touched}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
        onLoginChange={handleChange('login')}
        onBlurLogin={handleBlur('login')}
        onTermsChange={handleTerms}
        terms={values.terms}
      />
    </HocModal>
  );
};
