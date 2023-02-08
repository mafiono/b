import { FormikHelpers, useFormik } from 'formik';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useShallowSelector } from '../index';
import { selectProfileWithdraw } from '../../store/profile/selectors';
import { WithdrawErrorTransformResult } from '../../store/profile/types';
import { profileWithdrawConfirm, profileWithdrawRequestCode } from '../../store/profile/actionCreators';
import { useTranslation } from '../../i18n';

export interface WithdrawConfirmValues {
  emailCode: string;
  googleCode: string;
}

const withdrawConfirmValues: WithdrawConfirmValues = {
  emailCode: '',
  googleCode: '',
};

export const useWithdrawConfirmFormik = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');
  const { showErrorToast, hideToast } = useToasts();
  const {
    coin, fee, address, amount, isLoading, email,
  } = useShallowSelector(
    selectProfileWithdraw,
  );

  const onSubmit = useCallback((vals: WithdrawConfirmValues, {
    resetForm,
    setErrors,
  }: FormikHelpers<WithdrawConfirmValues>) => {
    const callback = (e?: WithdrawErrorTransformResult) => {
      hideToast();

      if (!e) {
        resetForm();
        return;
      }

      if (e?.message) {
        showErrorToast(t(e.message));
      }

      if (e?.fields) {
        setErrors(e.fields);
      }
    };

    dispatch(profileWithdrawConfirm(vals, callback));
  }, [dispatch]);

  const onRequestCode = useCallback(() => {
    dispatch(profileWithdrawRequestCode());
  }, [dispatch]);

  const formik = useFormik<WithdrawConfirmValues>({
    initialValues: withdrawConfirmValues,
    onSubmit,
  });

  return {
    coin,
    fee,
    address,
    amount,
    email,
    onRequestCode,
    isLoading,
    formik,
  };
};
