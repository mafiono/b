import React, { FC, FormEventHandler, ChangeEventHandler } from 'react';
import { TextInput } from '@betnomi/libs/components/TextInput';
import Button from '@betnomi/libs/components/Button';
import { Checkbox, Link, Spoiler } from '@betnomi/libs/components';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import { FormikErrors, FormikTouched } from 'formik';
import { SignUpFormikValues } from '../../../hooks/formik/useSignUpFormik';
import styles from './styles.module.scss';

interface IProps {
  values: SignUpFormikValues;
  errors: FormikErrors<SignUpFormikValues>;
  touched: FormikTouched<SignUpFormikValues>;
  loading?: boolean;
  
  onSubmit: FormEventHandler<HTMLFormElement>;
  onUserChange: (e: string | React.ChangeEvent<any>) => void;
  onEmailChange: (e: string | React.ChangeEvent<any>) => void;
  onPasswordChange: (e: string | React.ChangeEvent<any>) => void;
  onRefferalChange: (e: string | React.ChangeEvent<any>) => void;
  onTermsChange: (e: boolean) => void;
  handleBlurUser: ChangeEventHandler<HTMLInputElement>;
  handleBlurPassword: ChangeEventHandler<HTMLInputElement>;
  handleBlurEmail: ChangeEventHandler<HTMLInputElement>;
}

export const SignUpForm: FC<IProps> = ({ onSubmit,
  values,
  onEmailChange, 
  onPasswordChange, 
  onUserChange,
  onTermsChange,
  onRefferalChange,
  handleBlurUser,
  handleBlurPassword,
  handleBlurEmail,
  errors,
  touched,
  loading }) => {
  const { t } = useTranslation('main');
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.user}>
        <TextInput 
          value={values.username} 
          onChange={onUserChange}
          left={<FontIcon name={FontIconName.User} size={16} />}
          placeholder={t('Username')}
          hasError={!!(errors.username && touched.username)}
          onBlur={handleBlurUser}
          inputClasses={styles.background}
        />
      </div>
      <div className={styles.email}>
        <TextInput 
          value={values.email} 
          onChange={onEmailChange}
          left={<FontIcon name={FontIconName.Email} size={16} />}
          placeholder={t('Email')}
          onBlur={handleBlurEmail}
          hasError={!!(errors.email && touched.email)}
          inputClasses={styles.background}
        />
      </div>
      <div className={styles.password}>
        <TextInput
          type="password"
          value={values.password}
          onChange={onPasswordChange}
          left={<FontIcon name={FontIconName.Lock} size={16} />}
          placeholder={t('Password')}
          hasError={!!(errors.password && touched.password)}
          onBlur={handleBlurPassword}
          inputClasses={styles.background}
        />
      </div>
      <div className={styles.referral}>
        <Spoiler title={<span>{t('Referral/ Promo code (optional)')}</span>}>
          <TextInput
            placeholder={t('Enter your code')}
            onChange={onRefferalChange}
            value={values.referralCode}
          />
        </Spoiler>
      </div>
      <div className={styles.terms}>
        <Checkbox 
          checked={values.terms}
          onCheck={onTermsChange}
          className={styles.terms_checkbox}
          hasError={!!(errors.terms && touched.terms)}
        >
          <div className={styles.terms_text}>
            {t('I agree to all')}
            <Link to={process.env.REACT_APP_TERMS_URL || '#'} className={styles.terms_link} stopPropagation> 
              {' '}
              {t('Terms & Conditions')}
              {' '}
            </Link>
            {t('and I am over 18 years of age')}
          </div>
        </Checkbox>
      </div>
      <Button type="submit" className={styles.submit_button} isLoading={loading}>{t('Sign Up')}</Button>
    </form>
  );
};
