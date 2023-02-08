import { object, string } from 'yup';
import { FormikConfig, useFormik } from 'formik';
import { TransactionAllStatus, TransactionAllType, TimeRangeType } from '../../constants/transaction';
import { useTranslation } from '../../i18n';

type Config = FormikConfig<TransactionAllFormikValues>;

export interface TransactionAllFormikValues {
  fromDate: string;
  toDate: string;
  time: { label: string, value: TimeRangeType }
  transactionTypes: { label: string, value: TransactionAllType }
  resultTypes: { label: string, value: TransactionAllStatus }
}

export const transactionAllInitialValues: TransactionAllFormikValues = {
  fromDate: '',
  toDate: '',
  time: { label: '24 hours', value: TimeRangeType.oneDay },
  transactionTypes: { label: 'All', value: TransactionAllType.All },
  resultTypes: { label: 'All', value: TransactionAllStatus.AllResults },
};

const validationSchema = object().shape({
  fromDate: string(),
});

export const useTransactionAllFormik = (
  onSubmit: Config['onSubmit'] = () => {},
) => {
  const { t } = useTranslation('profile');

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: transactionAllInitialValues,
  });

  const optionsTransactionType = [
    { label: t('All'), value: TransactionAllType.All },
    { label: t('Bet'), value: TransactionAllType.Bet },
    { label: t('Bet and Win'), value: TransactionAllType.BetAndWin },
    { label: t('Bonus'), value: TransactionAllType.Bonus },
    { label: t('RollBack'), value: TransactionAllType.Rollback },
    { label: t('Win'), value: TransactionAllType.Win },
  ];
  
  const optionsResultType = [
    { label: t('All'), value: TransactionAllStatus.AllResults },
    { label: t('Canceled'), value: TransactionAllStatus.Canceled },
    { label: t('Completed'), value: TransactionAllStatus.Completed },
    { label: t('Pending'), value: TransactionAllStatus.Pending },
    { label: t('RollBack'), value: TransactionAllStatus.RolledBack },
  ];

  const optionsTimeType = [
    { label: t('24 hours'), value: TimeRangeType.oneDay },
    { label: t('48 hours'), value: TimeRangeType.twoDay },
    { label: t('72 hours'), value: TimeRangeType.threeDay },
    { label: t('Customize'), value: TimeRangeType.custom },
  ];

  return {
    formik,
    optionsTransactionType,
    optionsResultType,
    optionsTimeType,
  };
};
