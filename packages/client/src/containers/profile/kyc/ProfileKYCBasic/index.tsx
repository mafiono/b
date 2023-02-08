import React, { FC } from 'react';
import ProfileKYCBasicForm from '../../../../components/profile/ProfileKYCBasicForm';
import { useProfileBasicFormik } from '../../../../hooks/formik/useProfileKYCBasicForm';

const ProfileKYCBasic: FC = () => {
  const {
    formik: {
      values,
      handleSubmit,
      handleChange,
      errors,
      touched,
      handleBlur,
    },
    variants,
    onSearch,
    onChangeCountry,
    country,
    isLoading,
  } = useProfileBasicFormik();

  return (
    <ProfileKYCBasicForm
      values={values}
      errors={errors}
      touched={touched}
      countryOptions={variants}
      onSubmit={handleSubmit}
      onNameChange={handleChange('name')}
      onSurnameChange={handleChange('surname')}
      onDateChange={handleChange('date')}
      onZipCodeChange={handleChange('zipCode')}
      onStreetChange={handleChange('street')}
      onCityChange={handleChange('city')}
      onAreaChange={handleChange('area')}
      onCountryChange={onChangeCountry}
      onGenderChange={handleChange('gender')}
      onCountrySearch={onSearch}
      onTouchName={handleBlur('name')}
      onTouchSurname={handleBlur('surname')}
      onTouchDate={handleBlur('date')}
      onTouchZipCode={handleBlur('zipCode')}
      onTouchStreet={handleBlur('street')}
      onTouchCity={handleBlur('city')}
      onTouchCountry={handleBlur('country')}
      onTouchArea={handleBlur('area')}
      countryValue={country}
      loading={isLoading}
    />
  );
};

export default ProfileKYCBasic;
