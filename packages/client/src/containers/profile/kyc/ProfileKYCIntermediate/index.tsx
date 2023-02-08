import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileKYCFileUploadForm from '../../../../components/profile/ProfileKYCFileUploadForm';
import { useProfileKYCIntermediateFormik } from '../../../../hooks/formik/useProfileIntermediate';

const ProfileKYCIntermediate:FC = () => {
  const { t } = useTranslation('profile');
  const {
    formik, clearFile, uploadFile, isAvailable, isLoading, hasUpdates,
  } = useProfileKYCIntermediateFormik();

  return (
    <ProfileKYCFileUploadForm
      files={formik.values.files}
      errors={formik.errors.files as string[]}
      infoTitle={t('Profile KYC intermediate info title')}
      isLoading={isLoading}
      onSubmit={formik.handleSubmit}
      errorMessage={!isAvailable && !isLoading ? t('Please complete level one verification first') : undefined}
      onFileClear={clearFile}
      onFileUpload={uploadFile}
      disabled={!isAvailable}
      hasUpdates={hasUpdates}
    />
  );
};

export { ProfileKYCIntermediate };
