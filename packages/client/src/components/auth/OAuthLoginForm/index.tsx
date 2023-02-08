import React, { ChangeEventHandler, FC, FormEventHandler } from 'react';
import {
  Button,
  Checkbox, Link,
} from '@betnomi/libs/components';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { useTranslation } from '../../../i18n';
import { FontIcon, FontIconName } from '../../../../../libs/components/FontIcon';
import styles from './styles.module.scss';

type InputName = 'login' | 'terms';

interface Props {
  login: string;
  terms: boolean;
  errors: Partial<Record<InputName, string>>;
  touched: Partial<Record<InputName, boolean>>;
  isLoading?: boolean;

  onSubmit: FormEventHandler<HTMLFormElement>;
  onLoginChange: ChangeEventHandler<HTMLInputElement>;
  onBlurLogin: ChangeEventHandler<HTMLInputElement>;
  onTermsChange: (e: boolean) => void;
}

const OAuthLoginForm: FC<Props> = ({
  terms,
  onSubmit,
  login,
  errors,
  touched,
  isLoading,
  onBlurLogin,
  onLoginChange,
  onTermsChange,
}) => {
  const { t } = useTranslation('main');

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <TextInput
        onChange={onLoginChange}
        hasError={!!(touched.login && errors.login)}
        onBlur={onBlurLogin}
        value={login}
        left={<FontIcon name={FontIconName.User} size={16} />}
        placeholder={t('Username')}
      />

      <div className={styles.terms}>
        <Checkbox 
          checked={terms}
          onCheck={onTermsChange}
          className={styles.terms_checkbox}
          hasError={!!(errors.terms && touched.terms)}
        >
          <div className={styles.terms_text}>
            {t('I agree to all')}
            {' '}
            <Link to={process.env.REACT_APP_TERMS_URL || '#'} className={styles.terms_link} stopPropagation>{t('Terms & Conditions')}</Link>
            {' '}
            {t('and I am over 18 years of age')}
          </div>
        </Checkbox>
      </div>
      
      <Button type="submit" isLoading={isLoading}>
        {t('OK')}
      </Button>
    </form>
  );
};

export { OAuthLoginForm };
