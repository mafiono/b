import { coinOrder, CoinType } from '@betnomi/libs/types';
import { number, object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';
import { useGetDepositAddress } from '../wallet/useGetDepositAddress';
import { useUser } from '../useUser';
import { withdrawPairs } from '../../constants/withdraw';
import { transformCoinToNomipayCurrency } from '../../store/profile/transforms';

export interface ProfileDepositFormikValues {
  coin: CoinType;
  network?: CoinType;
}

export const profileDepositInitialValues: ProfileDepositFormikValues = {
  coin: coinOrder[0],
  network: undefined,
};

const validationSchema = object().shape({
  coin: string().required(),
  amount: number().required().positive(),
  address: string().required(),
});

export const useProfileDepositFormik = (
  initialValues = profileDepositInitialValues,
) => {
  const { balances } = useUser();

  const formik = useFormik({
    onSubmit: () => {},
    validationSchema,
    initialValues,
  });

  const networks = useMemo(() => withdrawPairs[formik.values.coin], [
    formik.values.coin,
  ]);

  const { depositAddress, isLoadingDepositAddress } = useGetDepositAddress(
    transformCoinToNomipayCurrency(formik.values.network || formik.values.coin),
  );

  const balance = balances[formik.values.coin];

  useEffect(() => {
    formik.setFieldValue(
      'network',
      networks && networks.length ? networks[0] : undefined,
    );
  }, [formik.values.coin]);

  const arrivalTime = 1;

  return {
    formik,
    depositAddress,
    isLoadingDepositAddress,
    balance,
    networks,
    arrivalTime,
  };
};
