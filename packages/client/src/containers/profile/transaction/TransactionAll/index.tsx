import React, { useCallback, useEffect } from 'react';
import { TransactionAllForm } from 'components/transaction/TransactionAllForm';
import { ModalType } from 'store/modal/types';
import { TimeRangeType } from 'constants/transaction';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { Option } from '@betnomi/libs/components/Select';
import { profileGetTransactionAll, profileSetTransactionAll } from '../../../../store/profile/actionCreators';
import { useModal } from '../../../../hooks/useModal';
import { selectProfileTransactionAll } from '../../../../store/profile/selectors';
import { TransactionAllFormikValues, useTransactionAllFormik } from '../../../../hooks/formik/useTransactionAllForm';

type Props = {
  ClassName?: string
}

export const TransactionAll: React.FC<Props> = ({ClassName}) => {
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');

  const { isLoading,
  } = useShallowSelector(selectProfileTransactionAll);

  const onSearch = useCallback((data: TransactionAllFormikValues) => {
    dispatch(profileGetTransactionAll(data));
  }, []);

  const {
    formik: {
      values, handleSubmit, setFieldValue, 
    },
    optionsTransactionType,
    optionsResultType,
    optionsTimeType,
  } = useTransactionAllFormik(onSearch);

  useEffect(() => {
    dispatch(profileGetTransactionAll(values));
  }, []);

  const onChangeType = useCallback((item:Option<string>) => {
    setFieldValue('transactionTypes', item);
  }, [setFieldValue]);

  const onResultChange = useCallback((item:Option<string>) => {
    setFieldValue('resultTypes', item);
  }, [setFieldValue]);

  const onTimeChange = useCallback((item:Option<string>) => {
    setFieldValue('time', item);
    const milliseconds = 24 * 60 * 60 * 1000;
    const day = new Date().getTime(); 

    if (item?.value === TimeRangeType.custom) {
      return showModal(ModalType.SelectDate)();
    }

    if (item?.value === TimeRangeType.oneDay) {
      const oneDay = day - milliseconds;
      return dispatch(profileSetTransactionAll({ fromDate: oneDay }));
    }

    if (item?.value === TimeRangeType.twoDay) {
      const twoDay = day - 2 * milliseconds;
      return dispatch(profileSetTransactionAll({ fromDate: twoDay }));
    }

    if (item?.value === TimeRangeType.threeDay) {
      const threeDay = day - 3 * milliseconds;
      return dispatch(profileSetTransactionAll({ fromDate: threeDay }));
    }
  }, [setFieldValue]);
  
  return (
    <div>
      <TransactionAllForm
        transactionType={values.transactionTypes}
        resultType={values.resultTypes}
        time={values.time}
        onSubmit={handleSubmit}
        onChangeType={onChangeType}
        onTimeChange={onTimeChange}
        onResultChange={onResultChange}
        typeOptions={optionsTransactionType}
        timeOptions={optionsTimeType}
        resultOptions={optionsResultType}
        loading={isLoading}
        ClassName={ClassName}
        firstLabel={t('Transaction Type')}
        secondLabel={t('Result')}
        thirdLabel={t('Period of time')}
        buttonText={t('Submit')}
      />
    </div>
  );
};
