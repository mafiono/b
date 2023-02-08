import { FormikConfig, useFormik } from 'formik';
import { object, string } from 'yup';
import { BetType, BetResult } from '../../constants/BetResult';
import { TimeRangeType } from '../../constants/transaction';
import { useTranslation } from '../../i18n';

type Config = FormikConfig<SportsBetFormikValues>;

export interface SportsBetFormikValues {
  fromDate: string;
  toDate: string;
  time: { label: string, value: TimeRangeType }
  transactionTypes: { label: string, value: BetType }
  resultTypes: { label: string, value: BetResult }
}

export const sportsBetInitialValues: SportsBetFormikValues = {
  fromDate: '',
  toDate: '',
  time: { label: '24 hours', value: TimeRangeType.oneDay },
  transactionTypes: { label: 'All', value: BetType.All },
  resultTypes: { label: 'All', value: BetResult.All },
};

const validationSchema = object().shape({
  fromDate: string(),
});

export const useSportsBetFormik = (
  onSubmit: Config['onSubmit'] = () => {},
) => {
  const { t } = useTranslation('profile');

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: sportsBetInitialValues,
  });

  const optionsSportBetType = [
    { label: t('All'), value: BetType.All },
    { label: t('Single'), value: BetType.Single },
    { label: t('Multiple'), value: BetType.Multiple },
    { label: t('System'), value: BetType.System },
    { label: t('Chain'), value: BetType.Chain },
  ];
  
  const optionsSportBetResult = [
    { label: t('All'), value: BetResult.All },
    { label: t('CashOut'), value: BetResult.CashOut },
    { label: t('Lost'), value: BetResult.Lost },
    { label: t('Win'), value: BetResult.Win },
    { label: t('Returned'), value: BetResult.Returned },
    { label: t('UnSettled'), value: BetResult.UnSettled },
  ];

  const optionsTimeType = [
    { label: t('24 hours'), value: TimeRangeType.oneDay },
    { label: t('48 hours'), value: TimeRangeType.twoDay },
    { label: t('72 hours'), value: TimeRangeType.threeDay },
    { label: t('Customize'), value: TimeRangeType.custom },
  ];

  return {
    formik,
    optionsSportBetType,
    optionsSportBetResult,
    optionsTimeType,
  };
};
