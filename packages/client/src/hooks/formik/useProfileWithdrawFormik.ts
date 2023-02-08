import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useEffect, useRef } from 'react';
import { number, object, string } from 'yup';
import { coinOrder, CoinType } from '@betnomi/libs/types';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useDispatch } from 'react-redux';
import { useUser } from '../useUser';
import { useTranslation } from '../../i18n';
import { profileWithdraw } from '../../store/profile/actionCreators';

export interface ProfileWithdrawFormikValues {
  coin: CoinType
  amount?: number
  address: string
  network?: CoinType
}

export const profileWithdrawInitialValues: ProfileWithdrawFormikValues = {
  coin: coinOrder[0],
  amount: undefined,
  address: '',
  network: undefined,
};

const validationSchema = object().shape({
  coin: string().required(),
  amount: number().required().positive(),
  address: string().required(),
});

export const useProfileWithdrawFormik = (
  values: ProfileWithdrawFormikValues = profileWithdrawInitialValues,
) => {
  const { showErrorToast, hideToast } = useToasts();
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();

  const limit = 0;
  const limitLeft = 0;
  const fee = 0;

  const initialValues = useRef(values);
  const { balances } = useUser();

  const onSubmit = useCallback(
    (
      vals: ProfileWithdrawFormikValues,
      { setSubmitting }: FormikHelpers<ProfileWithdrawFormikValues>,
    ) => {
      hideToast();

      const callback = (e?: string) => {
        if (e) {
          showErrorToast(t(e));
        }

        setSubmitting(false);
      };

      dispatch(profileWithdraw({ ...vals, fee }, callback));
    }, [dispatch, showErrorToast, hideToast],
  );

  const formik = useFormik<ProfileWithdrawFormikValues>({
    initialValues: initialValues.current,
    validationSchema,
    onSubmit,
  });

  const balance = balances[formik.values.coin]!;
  const total = formik.values.amount || 0;

  useEffect(() => {
    formik.setFieldValue('network', undefined);
    formik.setFieldValue('amount', undefined);
    formik.validateForm();
  }, [formik.values.coin]);

  return {
    formik,
    balance,
    limit,
    limitLeft,
    fee,
    total,
  };
};
