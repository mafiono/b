import React, { FC, FormEventHandler } from 'react';
import FileUpload from '@betnomi/libs/components/FileUpload';
import { Button } from '@betnomi/libs/components';
import { FileStatus } from '@betnomi/libs/constants/fileStatus';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { KYCFileType } from '../../../store/profile/types';

export interface KYCFile {
  label: string;
  status: FileStatus;
  value: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  kycFileType: KYCFileType
}

interface Props {
  infoTitle: string;
  errorMessage?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  files: KYCFile[];
  errors: string[];
  isLoading?: boolean;
  disabled?: boolean;
  hasUpdates?: boolean;
  onFileClear: (index: number) => () => void;
  onFileUpload: (index: number) => (file: File) => void;
}

const acceptedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

const ProfileKYCFileUploadForm: FC<Props> = ({
  files,
  infoTitle,
  onSubmit,
  isLoading,
  errorMessage,
  errors = [],
  disabled,
  hasUpdates,
  onFileClear,
  onFileUpload,
}) => {
  const { t } = useTranslation('profile');

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      {!!errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <p className={styles.info_title}>{infoTitle}</p>

      <div className={styles.file_format_label}>
        <span>
          {t('Following file types are accepted {{types}}', {
            types: '.png, .jpg, .pdf',
          })}
        </span>
      </div>

      <div className={styles.hr} />

      {files.map((file, i) => (
        <div key={file.label}>
          <div className={styles.file_title}>
            <span>{file.label}</span>
          </div>

          <div className={styles.file_wrapper}>
            <FileUpload
              id="first"
              acceptedTypes={acceptedFileTypes}
              onClear={onFileClear(i)}
              onUpload={onFileUpload(i)}
              fileStatus={file.status}
              lastModified={file.lastModified}
              name={file.name}
              size={file.size}
              type={file.type}
              error={t(errors[i])}
              disabled={disabled}
            />
          </div>
        </div>
      ))}

      <Button className={styles.button} type="submit" isLoading={isLoading} disabled={disabled || !hasUpdates}>
        {t('Upload')}
      </Button>
    </form>
  );
};

export default ProfileKYCFileUploadForm;
