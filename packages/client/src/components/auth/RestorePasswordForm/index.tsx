import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { TextInput } from '@betnomi/libs/components/TextInput';
import Button from '@betnomi/libs/components/Button';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { FormikErrors, FormikTouched } from 'formik';
import { RestorePasswordValues } from '../../../hooks/formik/useRestorePasswordFormik';
import styles from './styles.module.scss';

interface IProps {
  loading?: boolean;
  errors: FormikErrors<RestorePasswordValues>;
  touched: FormikTouched<RestorePasswordValues>;
  values: RestorePasswordValues;

  onSubmit: FormEventHandler<HTMLFormElement>;
  onUserChange: ChangeEventHandler<HTMLInputElement>;
  handleBlurUser: ChangeEventHandler<HTMLInputElement>;
}

export const RestorePasswordForm: React.FC<IProps> = ({
  onSubmit, errors, touched, values, onUserChange, loading,
}) => {
  const { t } = useTranslation('main');

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.input_out}>
        <TextInput 
          value={values.username} 
          onChange={onUserChange}
          left={<FontIcon name={FontIconName.User} size={16} />}
          placeholder={t('Username or Email')}
          hasError={!!(errors.username && touched.username)}
        />
      </div>
      <Button
        type="submit"
        className={styles.submit_button}
        isLoading={loading}
      >
        {t('Resend password')}
      </Button>
    </form>
  );
};
