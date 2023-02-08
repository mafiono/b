import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';
import { keys } from 'ramda';
import { ProfileKYCFileUploadValues, useProfileUploadFilesFormik } from './useProfileKYCFileUploadForm';
import useShallowSelector from '../useShallowSelector';
import { selectProfileBasic, selectProfileIntermediate } from '../../store/profile/selectors';
import { KYCFile } from '../../components/profile/ProfileKYCFileUploadForm';
import { transformProfileStateToKYCFile } from '../../store/profile/transforms';
import { useTranslation } from '../../i18n';
import { KYCFileType } from '../../store/profile/types';
import { ProfileKYCAdvancedError } from '../../types/store/profile';
import {
  profileGetBasic,
  profileGetIntermediate,
  profileSetIntermediate,
  profileUploadIntermediate,
} from '../../store/profile/actionCreators';

const fieldOrder = [
  KYCFileType.ProofOfIdentityFront,
  KYCFileType.ProofOfIdentityBack,
];

export const useProfileKYCIntermediateFormik = () => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const {
    proofOfIdentityBack,
    proofOfIdentityFront,
    isLoading,
    isLoaded,
  } = useShallowSelector(selectProfileIntermediate);
  const basic = useShallowSelector(selectProfileBasic);

  const files = useMemo<KYCFile[]>(
    () => [
      transformProfileStateToKYCFile(
        proofOfIdentityFront,
        t('Proof of Identity (Front)'),
        KYCFileType.ProofOfIdentityFront,
      ),
      transformProfileStateToKYCFile(
        proofOfIdentityBack,
        t('Proof of Identity (Back)'),
        KYCFileType.ProofOfIdentityBack,
      ),
    ],
    [proofOfIdentityFront, proofOfIdentityBack],
  );

  const onSubmit = useCallback(
    (
      values: ProfileKYCFileUploadValues,
      { resetForm, setFieldError }: FormikHelpers<ProfileKYCFileUploadValues>,
    ) => {
      const callback = (e?: ProfileKYCAdvancedError) => {
        if (e?.fields) {
          keys(e.fields).forEach((field) => {
            const index = fieldOrder.indexOf(field);
            if (index < 0) {
              return;
            }

            setFieldError(`files[${index}]`, e.fields![field]);
          });

          return;
        }

        resetForm();
      };

      dispatch(profileUploadIntermediate(values, callback));
    },
    [],
  );

  useEffect(() => {
    dispatch(profileGetBasic());
    dispatch(profileGetIntermediate());

    return () => { dispatch(profileSetIntermediate({ isLoaded: false })); };
  }, [dispatch]);

  return {
    ...useProfileUploadFilesFormik(onSubmit, files),
    isAvailable: !!basic.name,
    isLoading: isLoading || !isLoaded || !basic.isLoaded,
  };
};
