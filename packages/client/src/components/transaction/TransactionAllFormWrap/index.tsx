import React, { useCallback, useEffect } from 'react';
import { SportsBetFormikValues } from 'hooks/formik/useSportsBetFormik';
import { TransactionAllForm } from 'components/transaction/TransactionAllForm';
import { TimeRangeType } from 'constants/transaction';
import { Option } from '@betnomi/libs/components/Select';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { profileGetSportsBet, profileSetSportsBet } from 'store/profile/actionCreators';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { selectSportsBet } from '../../../store/profile/selectors';
import { ModalType } from '../../../store/modal/types';
import { useSportsBetFormik } from '../../../hooks/formik/useSportsBetFormik';
import { useModal } from '../../../hooks/useModal';

type Props = {
  ClassName?: string
}

export const TransactionAllFormWrap:React.FC<Props> = ({ClassName}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');
  const { showModal } = useModal();

  const {
    isLoading,
  } = useShallowSelector(selectSportsBet);

  const onSearch = useCallback((data: SportsBetFormikValues) => {
    dispatch(profileGetSportsBet(data));
  }, []);

  const {
    formik: {
      values, handleSubmit, setFieldValue,
    },
    optionsSportBetType,
    optionsSportBetResult,
    optionsTimeType,
  } = useSportsBetFormik(onSearch);

  useEffect(() => {
    dispatch(profileGetSportsBet(values));
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
      return showModal(ModalType.SportBetsDate)();
    }

    if (item?.value === TimeRangeType.oneDay) {
      const oneDay = day - milliseconds;
      return dispatch(profileSetSportsBet({ fromDate: oneDay }));
    }

    if (item?.value === TimeRangeType.twoDay) {
      const twoDay = day - 2 * milliseconds;
      return dispatch(profileSetSportsBet({ fromDate: twoDay }));
    }

    if (item?.value === TimeRangeType.threeDay) {
      const threeDay = day - 3 * milliseconds;
      dispatch(profileSetSportsBet({ fromDate: threeDay }));
    }
  }, [setFieldValue]);

  return (
      <TransactionAllForm
          transactionType={values.transactionTypes}
          resultType={values.resultTypes}
          time={values.time}
          onSubmit={handleSubmit}
          onChangeType={onChangeType}
          onTimeChange={onTimeChange}
          onResultChange={onResultChange}
          typeOptions={optionsSportBetType}
          timeOptions={optionsTimeType}
          resultOptions={optionsSportBetResult}
          loading={isLoading}
          ClassName={ClassName}
          firstLabel={t('Bet Type')}
          secondLabel={t('Result')}
          thirdLabel={t('Period of time')}
          buttonText={t('Search')}
      />
  );
};
