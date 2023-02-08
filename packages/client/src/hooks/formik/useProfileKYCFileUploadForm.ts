import { object, string } from 'yup';
import { FormikConfig, useFormik } from 'formik';
import { useCallback, useMemo, useRef } from 'react';
import { FileStatus } from '@betnomi/libs/constants/fileStatus';
import { useDispatch } from 'react-redux';
import { KYCFile } from '../../components/profile/ProfileKYCFileUploadForm';
import { readFile } from '../../utils/readFile';
import { emptyProfileFileState } from '../../store/profile/constants';
import { transformProfileStateToKYCFile } from '../../store/profile/transforms';
import { profileDropKYCFile } from '../../store/profile/actionCreators';

type Config = FormikConfig<ProfileKYCFileUploadValues>;

export interface ProfileKYCFileUploadValues {
  files: KYCFile[];
}

const validationSchema = object().shape({
  firstFileBase64: string().optional(),
  secondFileBase64: string().optional(),
});

export const useProfileUploadFilesFormik = (
  onSubmit: Config['onSubmit'],
  files: KYCFile[],
) => {
  const dispatch = useDispatch();
  const initValues = useRef({ files });
  const formik = useFormik<ProfileKYCFileUploadValues>({
    initialValues: initValues.current,
    onSubmit,
    validationSchema,
  });

  const resetFile = useCallback((file: KYCFile) => {
    formik.setFieldValue(
      `files[${files.indexOf(file)}]`,
      transformProfileStateToKYCFile(
        emptyProfileFileState,
        file.label,
        file.kycFileType,
      ),
    );
  }, [files, formik.setFieldValue]);

  const clearFile = useCallback(
    (index: number) => () => {
      const file = files[index];

      switch (file?.status) {
        case FileStatus.New:
          resetFile(file);
          break;
        case FileStatus.Rejected:
          resetFile(file);
          dispatch(profileDropKYCFile(file.kycFileType));
          break;
        default:
      }
    },
    [formik.handleChange, dispatch, resetFile],
  );

  const uploadFile = useCallback(
    (index: number) => (file: File) => {
      readFile(file).then((value) => {
        formik.setFieldValue(
          `files[${index}]`,
          {
            label: files[index].label,
            status: FileStatus.New,
            value,
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            kycFileType: files[index].kycFileType,
          } as KYCFile,
          true,
        );
      });
    },
    [formik.setFieldValue],
  );

  const hasUpdates = useMemo(
    () => formik.values.files.some((file) => file.value),
    [formik.values.files],
  );

  return {
    formik,
    clearFile,
    uploadFile,
    files,
    hasUpdates,
  };
};
