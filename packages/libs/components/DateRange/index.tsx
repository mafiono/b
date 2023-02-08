import React, { FC, useCallback } from 'react';
import { useTranslation } from '@betnomi/client/src/i18n';
import cx from 'classnames';
import { DateInput } from '../DateInput';
import { FontIcon, FontIconName } from '../FontIcon';
import styles from './styles.module.scss';

interface Props {
  beginValue: string
  endValue: string
  onBeginChange: (value: string) => void
  onEndChange: (value: string) => void
  dateFormat?: string
  divorce?: JSX.Element
  title?:JSX.Element;
  classNameContainer?: string;
}

const customInput = (
  <input
    type="text"
    className={styles.input}
  />
);
const fontIconSize = 16;

const DateRange: FC<Props> = ({
  endValue,
  beginValue,
  onBeginChange,
  onEndChange,
  dateFormat = 'dd/MM/yyyy',
  divorce,
  title,
  classNameContainer,
}) => {
  const { t } = useTranslation('main');

  const onDateBeginChange = useCallback((value: string) => {
    onBeginChange(value);
  }, [onBeginChange]);
  
  const onDateEndChange = useCallback((value: string) => {
    onEndChange(value);
  }, [onEndChange]);

  const clearDateBegin = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (beginValue.length <= 0) return;
    onBeginChange('');
  }, [onBeginChange]);
  
  const clearDateEnd = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (endValue.length <= 0) return;
    onEndChange('');
  }, [onEndChange]);

  return (
    <>
      {title}
      <div className={styles.wrapper}>
        <div className={cx(styles.input_wrapper, classNameContainer)}>
          <div className={styles.icon_wrapper}>
            <FontIcon name={FontIconName.Calendar} size={16} />
            <div className={styles.line} />
          </div>
          <DateInput
            value={beginValue}
            placeholder={t('Select Date')}
            dateFormat={dateFormat}
            onChange={onDateBeginChange}
            customInput={customInput}
          />
          <button 
            className={styles.icon} 
            onClick={clearDateBegin}
          >
            {beginValue.length > 0
              ? (<FontIcon name={FontIconName.Close} size={fontIconSize} />)
              : (<FontIcon name={FontIconName.Plus} size={fontIconSize} />)}
          </button>
        </div>
        {divorce || <div className={styles.rectangle} />}
        <div className={cx(styles.input_wrapper, classNameContainer)}>
          <div className={styles.icon_wrapper}>
            <FontIcon name={FontIconName.Calendar} size={16} />
            <div className={styles.line} />
          </div>
          <DateInput
            value={endValue}
            placeholder={t('Select Date')}
            dateFormat={dateFormat}
            onChange={onDateEndChange}
            customInput={customInput}
          />
          <button 
            className={styles.icon}
            onClick={clearDateEnd}
          >
            {endValue.length > 0 
              ? (<FontIcon name={FontIconName.Close} size={fontIconSize} />)
              : (<FontIcon name={FontIconName.Plus} size={fontIconSize} />)}
          </button>
        </div>
      </div>
    </>
  );
};

export default DateRange;
