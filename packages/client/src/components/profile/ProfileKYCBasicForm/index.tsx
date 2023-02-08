import React, {
  ChangeEventHandler, FC, FocusEventHandler, FormEventHandler, useCallback, 
} from 'react';
import cx from 'classnames';
import { TextInput } from '@betnomi/libs/components/TextInput';
import { DateInput } from '@betnomi/libs/components/DateInput';
import { RadioButton } from '@betnomi/libs/components/RadioButton';
import { Button } from '@betnomi/libs/components';
import { FormikErrors, FormikTouched } from 'formik';
import { Autocomplete, Option } from '@betnomi/libs/components/Autocomplete';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { ProfileKYCBasicFormikValues } from '../../../hooks/formik/useProfileKYCBasicForm';
import { Gender } from '../../../constants/gender';
import { useGender } from '../../../hooks/profile/useGender';

export interface GenderItem {
  type: Gender;
  title: string;
}

interface Props {
  values: ProfileKYCBasicFormikValues;
  errors: FormikErrors<ProfileKYCBasicFormikValues>;
  touched: FormikTouched<ProfileKYCBasicFormikValues>;
  countryOptions: Option[];
  countryValue?: Option;
  loading?: boolean;

  onSubmit: FormEventHandler<HTMLFormElement>;

  onNameChange: ChangeEventHandler<HTMLInputElement>;
  onSurnameChange: ChangeEventHandler<HTMLInputElement>;
  onDateChange: (value: string) => void;
  onZipCodeChange: ChangeEventHandler<HTMLInputElement>;
  onStreetChange: ChangeEventHandler<HTMLInputElement>;
  onCityChange: ChangeEventHandler<HTMLInputElement>;
  onAreaChange: ChangeEventHandler<HTMLInputElement>;
  onCountryChange: (value: Option) => void;
  onGenderChange: (value: Gender) => void;

  onCountrySearch: (value: string) => void;

  onTouchName: FocusEventHandler<HTMLInputElement>;
  onTouchSurname: FocusEventHandler<HTMLInputElement>;
  onTouchDate: FocusEventHandler<HTMLInputElement>;
  onTouchZipCode: FocusEventHandler<HTMLInputElement>;
  onTouchStreet: FocusEventHandler<HTMLInputElement>;
  onTouchCity: ChangeEventHandler<HTMLElement>;
  onTouchCountry: ChangeEventHandler<HTMLElement>;
  onTouchArea: ChangeEventHandler<HTMLElement>;
}

const ProfileKYCBasicForm: FC<Props> = ({
  values,
  touched,
  errors,
  onNameChange,
  onSurnameChange,
  onDateChange,
  onZipCodeChange,
  onStreetChange,
  onTouchStreet,
  onTouchDate,
  onTouchName,
  onTouchSurname,
  onTouchZipCode,
  onSubmit,
  loading,
  onCityChange,
  onAreaChange,
  onCountryChange,
  onTouchCity,
  onTouchArea,
  onTouchCountry,
  onGenderChange,
  onCountrySearch,
  countryOptions,
  countryValue,
}) => {
  const { t } = useTranslation('profile');

  const { genderItems } = useGender();

  const radioButtonHandler = useCallback(
    (type: Gender) => (val: boolean) => {
      if (!val) return;
      onGenderChange(type);
    },
    [genderItems],
  );

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.row}>
        <div className={cx(styles.field, styles.margin_bottom)}>
          <TextInput
            hasError={!!(errors.name && touched.name)}
            className={styles.input}
            value={values.name}
            placeholder={t('Name')}
            onChange={onNameChange}
            onBlur={onTouchName}
            disabled={loading}
          />
        </div>
        <div className={styles.field}>
          <TextInput
            hasError={!!(errors.surname && touched.surname)}
            className={styles.input}
            value={values.surname}
            placeholder={t('Surname')}
            onChange={onSurnameChange}
            onBlur={onTouchSurname}
            disabled={loading}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <span className={styles.title}>{t('Birthday')}</span>
          <DateInput
            hasError={!!(errors.date && touched.date)}
            onChange={onDateChange}
            value={values.date}
            onBlur={onTouchDate}
            disabled={loading}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.title}>{t('Gender')}</span>
          <div className={styles.radio_buttons}>
            {genderItems.map((value) => (
              <RadioButton
                key={value.type}
                className={styles.radio_button_margin}
                checked={value.type === values.gender}
                onCheck={radioButtonHandler(value.type)}
                disabled={loading}
              >
                {value.title}
              </RadioButton>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={cx(styles.field, styles.margin_bottom)}>
          <span className={styles.title}>{t('Address')}</span>
          <TextInput
            hasError={!!(errors.street && touched.street)}
            className={styles.input}
            value={values.street}
            onChange={onStreetChange}
            placeholder={t('Street')}
            onBlur={onTouchStreet}
            disabled={loading}
          />
        </div>
        <div className={cx(styles.field, styles.align_items_end)}>
          <TextInput
            className={styles.input}
            hasError={!!(errors.city && touched.city)}
            placeholder={t('City')}
            onChange={onCityChange}
            onBlur={onTouchCity}
            value={values.city}
            disabled={loading}
          />
        </div>
      </div>

      <div className={cx(styles.row, styles.margin_top)}>
        <div className={cx(styles.field, styles.margin_bottom)}>
          <Autocomplete
            value={countryValue}
            hasError={!!(errors.country && touched.country)}
            className={styles.input}
            placeholder={t('Country')}
            onChange={onCountryChange}
            onBlur={onTouchCountry}
            variants={countryOptions}
            onSearch={onCountrySearch}
            disabled={loading}
          />
        </div>
        <div className={styles.field}>
          <TextInput
            value={values.area}
            hasError={!!(errors.area && touched.area)}
            className={styles.input}
            placeholder={t('Area')}
            onChange={onAreaChange}
            onBlur={onTouchArea}
            disabled={loading}
          />
        </div>
      </div>

      <div className={cx(styles.full_width, styles.margin_top)}>
        <TextInput
          hasError={!!(errors.zipCode && touched.zipCode)}
          className={styles.input}
          value={values.zipCode}
          onChange={onZipCodeChange}
          placeholder={t('Zip Code')}
          onBlur={onTouchZipCode}
          disabled={loading}
        />
      </div>

      <Button
        className={styles.submit_button}
        type="submit"
        isLoading={loading}
      >
        {t('Save Changes')}
      </Button>
    </form>
  );
};

export default ProfileKYCBasicForm;
