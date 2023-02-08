import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileKYCFileUploadForm from '../../../../components/profile/ProfileKYCFileUploadForm';
import { useProfileKYCAdvancedFormik } from '../../../../hooks/formik/useProfileKYCAdvancedFormik';

const ProfileKYCAdvanced:FC = () => {
  const { t } = useTranslation('profile');
  const {
    formik, clearFile, uploadFile, isAvailable, isLoading, hasUpdates,
  } = useProfileKYCAdvancedFormik();

  return (
    <ProfileKYCFileUploadForm
      files={formik.values.files}
      errors={formik.errors.files as string[]}
      infoTitle={t('Profile KYC advanced info title')}
      isLoading={isLoading}
      onSubmit={formik.handleSubmit}
      errorMessage={!isAvailable && !isLoading ? t('Please complete intermediate level verification first') : undefined}
      onFileClear={clearFile}
      onFileUpload={uploadFile}
      disabled={!isAvailable}
      hasUpdates={hasUpdates}
    />
  );
};

export { ProfileKYCAdvanced };
