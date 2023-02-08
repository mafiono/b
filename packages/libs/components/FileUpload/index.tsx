import React, {
  FC, MouseEventHandler, useCallback, useMemo, 
} from 'react';
import cx from 'classnames';
import format from 'date-fns/format';
import bytes from 'bytes';
import { useTranslation } from 'react-i18next';
import png from '../../assets/img/fileFormats/png.svg';
import styles from './styles.module.scss';
import { FontIcon, FontIconName } from '../FontIcon';
import { FileStatus, fileStatusNames } from '../../constants/fileStatus';

interface Props {
  onClear: MouseEventHandler;
  onUpload: (file: File) => void;
  fileStatus?: FileStatus;
  acceptedTypes?: string[];
  icon?: React.ReactNode;
  id: string;
  lastModified?: number;
  size?: number;
  name?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
}

const deletableFileStatuses = [FileStatus.Rejected, FileStatus.New];

const FileUpload: FC<Props> = ({
  fileStatus,
  acceptedTypes,
  onUpload,
  onClear,
  icon,
  lastModified,
  size,
  name,
  type,
  error,
  disabled,
}) => {
  const { t } = useTranslation('main');

  const fileInfo = useMemo(() => {
    const date = new Date(lastModified ?? 0);
    const formattedDate = format(date, 'dd MMM, yyyy');
    const formattedTime = format(date, 'HH:mm');

    const fileSize = bytes(size ?? 0);
    return `${formattedDate} at ${formattedTime} - ${fileSize}`;
  }, [size, lastModified]);

  const onChange = useCallback(
    (event) => {
      if (!event.target.files?.length) {
        return;
      }

      onUpload(event.target.files[0]);
    },
    [onUpload],
  );

  const canDelete = useMemo(
    () => fileStatus && deletableFileStatuses.includes(fileStatus),
    [fileStatus],
  );

  return (
    <div className={styles.wrapper}>
      {!name && (
        <div className={styles.button_wrapper}>
          <div className={styles.button}>{t('Choose File')}</div>

          <input
            className={styles.input}
            type="file"
            onChange={onChange}
            accept={acceptedTypes?.join(',')}
            disabled={disabled}
          />

          <div className={styles.no_file}>{t('No file chosen')}</div>
        </div>
      )}

      {!!name && (
        <div className={styles.file_wrapper}>
          {!icon && <img src={png} alt={type} />}
          <div className={styles.file_info_wrapper}>
            <p className={styles.file_name}>{name}</p>
            {error ? (
              <p className={styles.error}>{error}</p>
            ) : (
              <p className={styles.info}>{fileInfo}</p>
            )}
          </div>
        </div>
      )}

      {!!name && (
        <div className={styles.status_wrapper}>
          {fileStatus && (
            <div
              className={cx(
                styles.file_state,
                styles[fileStatus.toLowerCase()],
              )}
            >
              <span>{t(fileStatusNames[fileStatus])}</span>
            </div>
          )}
          {canDelete && (
            <button className={styles.clear_button} onClick={onClear}>
              <FontIcon
                className={styles.close_icon}
                name={FontIconName.Deleted}
                size={24}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
