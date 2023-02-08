import React, { useCallback, useState } from 'react';
import Button from '@betnomi/libs/components/Button';
import DateRange from '@betnomi/libs/components/DateRange';
import cx from 'classnames';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import styles from './styles.module.scss';

interface IProps {
  onSubmit: (endTime: string, beginTime: string) => void;
  fromDate?: string;
  toDate?: string;
}
  
export const SelectDateForm: React.FC<IProps> = ({ 
  onSubmit, fromDate = '', toDate = '',
}) => {
  const { t } = useTranslation('profile');
  const [beginTime, setBeginTime] = useState(fromDate);
  const [endTime, setEndTime] = useState(toDate);

  const handleBeginTime = useCallback((time) => {
    setBeginTime(time);
  }, []);

  const handleEndTime = useCallback((e) => {
    setEndTime(e);
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(endTime, beginTime);
  }, [endTime, beginTime, onSubmit]);

  const divorce = <div className={styles.divorce}>{t('to')}</div>;
  const title = (
    <div className={styles.label}>
      <div className={styles.left}>{t('Start time')}</div>
      <div className={cx(styles.divorce, styles.opacity)}>{t('to')}</div>
      <div className={styles.right}>{t('End time')}</div>
    </div>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>{t('Select your time range within 3 months')}</p>
      <DateRange 
        beginValue={beginTime}
        endValue={endTime}
        dateFormat="yyyy/MM/dd"
        onBeginChange={handleBeginTime}
        onEndChange={handleEndTime}
        divorce={divorce}
        title={title}
        classNameContainer={styles.input_out}
      />
      <Button type="submit" className={styles.submit}>{t('Submit')}</Button>
    </form>
  );
};
