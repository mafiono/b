import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';
import { keys } from 'ramda';
import { FileStatus } from '@betnomi/libs/constants/fileStatus';
import { ProfileKYCFileUploadValues, useProfileUploadFilesFormik } from './useProfileKYCFileUploadForm';
import useShallowSelector from '../useShallowSelector';
import { selectProfileAdvanced, selectProfileBasic, selectProfileIntermediate } from '../../store/profile/selectors';
import { KYCFile } from '../../components/profile/ProfileKYCFileUploadForm';
import { transformProfileStateToKYCFile } from '../../store/profile/transforms';
import { useTranslation } from '../../i18n';
import { KYCFileType } from '../../store/profile/types';
import { ProfileKYCAdvancedError } from '../../types/store/profile';
import {
  profileGetAdvanced,
  profileGetBasic,
  profileGetIntermediate,
  profileSetAdvanced,
  profileUploadAdvanced,
} from '../../store/profile/actionCreators';

const fieldOrder = [KYCFileType.ProofOfAddress, KYCFileType.SourceOfFunds];

export const useProfileKYCAdvancedFormik = () => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const {
    proofOfAddress,
    sourceOfFunds,
    isLoading,
    isLoaded,
  } = useShallowSelector(selectProfileAdvanced);
  const basic = useShallowSelector(selectProfileBasic);
  const intermediate = useShallowSelector(selectProfileIntermediate);

  const files = useMemo<KYCFile[]>(
    () => [
      transformProfileStateToKYCFile(
        proofOfAddress,
        t('Proof of Address'),
        KYCFileType.ProofOfAddress,
      ),
      transformProfileStateToKYCFile(
        sourceOfFunds,
        t('Source of Funds'),
        KYCFileType.SourceOfFunds,
      ),
    ],
    [proofOfAddress, sourceOfFunds],
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

      dispatch(profileUploadAdvanced(values, callback));
    },
    [],
  );

  useEffect(() => {
    dispatch(profileGetBasic());
    dispatch(profileGetIntermediate());
    dispatch(profileGetAdvanced());

    return () => { dispatch(profileSetAdvanced({ isLoaded: false })); };
  }, [dispatch]);

  const isIntermediateApproved =
    intermediate[KYCFileType.ProofOfIdentityBack].status ===
      FileStatus.Approved &&
    intermediate[KYCFileType.ProofOfIdentityFront].status ===
      FileStatus.Approved;

  return {
    ...useProfileUploadFilesFormik(onSubmit, files),
    isAvailable: !!basic.name && isIntermediateApproved,
    isLoading: isLoading || !isLoaded || !basic.isLoaded || !intermediate.isLoaded,
  };
};
