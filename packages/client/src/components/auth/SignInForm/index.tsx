import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { TextInput } from '@betnomi/libs/components/TextInput';
import Button from '@betnomi/libs/components/Button';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { FormikErrors, FormikTouched } from 'formik';
import { SignInFormikValues } from '../../../hooks/formik/useSignInFormik';
import styles from './styles.module.scss';

interface IProps {
  loading?: boolean;
  errors: FormikErrors<SignInFormikValues>;
  touched: FormikTouched<SignInFormikValues>;
  values: SignInFormikValues;

  onSubmit: FormEventHandler<HTMLFormElement>;
  onUserChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordChange:ChangeEventHandler<HTMLInputElement>; 
  onRestoreOpen: () => void;
  handleBlurUser: ChangeEventHandler<HTMLInputElement>;
  handleBlurPassword: ChangeEventHandler<HTMLInputElement>;
}
  
export const SignInForm: React.FC<IProps> = ({ onSubmit, values, onUserChange, handleBlurUser, handleBlurPassword,
  onPasswordChange, onRestoreOpen, errors, touched, loading }) => {
  const { t } = useTranslation('main');

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.user}>
        <TextInput 
          value={values.username} 
          onChange={onUserChange}
          onBlur={handleBlurUser}
          left={<FontIcon name={FontIconName.User} size={16} />}
          placeholder={t('Username or Email')}
          hasError={!!(errors.username && touched.username)}
          inputClasses={styles.background}
        />
      </div>
      <div className={styles.password}>
        <TextInput
          type="password"
          value={values.password}
          onChange={onPasswordChange}
          onBlur={handleBlurPassword}
          left={<FontIcon name={FontIconName.Lock} size={16} />}
          placeholder={t('Password')}
          hasError={!!(errors.password && touched.password)}
          inputClasses={styles.background}
        />
      </div>
      <button
        type="button"
        className={styles.restore_button}
        onClick={onRestoreOpen}
      >
        {t("Don't remember your password?")}
      </button>
      <Button type="submit" className={styles.submit_button} isLoading={loading}>{t('Sign In')}</Button>
    </form>
  );
};
