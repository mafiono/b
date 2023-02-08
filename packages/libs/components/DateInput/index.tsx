import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import cx from 'classnames';
import { format, isValid, parse } from 'date-fns';
import { useTranslation } from '@betnomi/client/src/i18n';
import { FontIcon, FontIconName } from '../FontIcon';
import styles from './styles.module.scss';

interface Props {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  className?: string;
  dateFormat?: string;
  customInput?: React.ReactNode;
  placeholder?: string;
  onBlur?: (value: React.FocusEvent<HTMLInputElement>) => void;
  hasError?: boolean;
}

const DateInput: React.FunctionComponent<Props> = ({
  value,
  disabled,
  onChange,
  className,
  dateFormat = 'yyyy-MM-dd',
  customInput,
  placeholder,
  onBlur,
  hasError,
}) => {
  const { t } = useTranslation('main');
  const [date, setDate] = useState<Date>();

  const onDateChange = useCallback(
    (selected: Date) => {
      if (!isValid(selected)) return;

      setDate(selected);
      if (dateFormat) onChange(format(selected, dateFormat));
    },
    [onChange, dateFormat, setDate],
  );

  useEffect(() => {
    if (!value) {
      setDate(undefined);
      return;
    }

    const parsedDate = parse(value, dateFormat, new Date());
    if (!isValid(parsedDate)) return;

    setDate(parsedDate);
  }, [value, dateFormat]);

  const defaultInput = (
    <div className={cx(styles.input, disabled ? styles.disabled : '')}>
      <div>{date ? format(date, 'dd') : t('Day')}</div>
      <div className={styles.vertical_hr} />
      <div className={styles.month}>
        {date ? format(date, 'MMMM') : t('Month')}
      </div>
      <div className={styles.vertical_hr} />
      <div className={styles.year}>
        {date ? format(date, 'yyyy') : t('Year')}
      </div>
    </div>
  );

  return (
    <div className={cx(
      styles.wrapper, 
      styles.datepicker_wrapper, 
      className, 
      { [styles.error]: hasError },
    )}
    >
      <DatePicker
        onBlur={onBlur}
        placeholderText={placeholder}
        dateFormat={dateFormat}
        disabled={disabled}
        selected={date}
        onChange={onDateChange}
        nextMonthButtonLabel={(
          <FontIcon
            className={styles.arrow}
            name={FontIconName.ArrowRightBold}
            size={16}
          />
        )}
        previousMonthButtonLabel={(
          <FontIcon
            className={styles.arrow}
            name={FontIconName.ArrowLeftBold}
            size={16}
          />
        )}
        fixedHeight
        showYearDropdown
        showMonthDropdown
        popperClassName={styles.popper}
        dayClassName={() => styles.day}
        customInput={customInput || defaultInput}
      />
    </div>
  );
};

export { DateInput };
