import React, { FormEventHandler } from 'react';
import Button from '@betnomi/libs/components/Button';
import { Option, Select } from '@betnomi/libs/components/Select';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import cx from 'classnames';
import styles from './styles.module.scss';

interface IProps {
  loading?: boolean;
  transactionType: Option<string>;
  resultType: Option<string>;
  time: Option<string>;
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
  buttonText: string;
  ClassName?: string;

  onSubmit: FormEventHandler<HTMLFormElement>;
  onChangeType: (item: Option<string>) => void;
  onTimeChange: (item: Option<string>) => void;
  onResultChange: (item: Option<string>) => void;
  typeOptions: Option<string>[];
  timeOptions: Option<string>[];
  resultOptions: Option<string>[];
}
  
export const TransactionAllForm: React.FC<IProps> = ({ 
  onSubmit, 
  onChangeType,
  onTimeChange,
  onResultChange,
  typeOptions,
  timeOptions,
  resultOptions,
  transactionType,
  resultType,
  time,
  loading,
  firstLabel,
  secondLabel,
  thirdLabel,
  buttonText,
  ClassName = ''
}) => {
  const optionRenderer = (active:Option<string>) => ({ label, value }:Option<string>) => (
    <div className={cx(styles.option, { [styles.selected]: value === active.value })}>
      {label}
      {value === active.value && (
      <FontIcon 
        name={FontIconName.Checked} 
        size={16}
        className={styles.check_icon}
      />
      )}
    </div>
  );

  
  return (
    <form className={cx(styles.form, styles[ClassName])} onSubmit={onSubmit}>
      <div className={styles.filters}> 
        <div className={styles.type}>
          <div className={styles.label}>{firstLabel}</div>
          <Select
            variants={typeOptions}
            onChange={onChangeType}
            value={transactionType}
            optionRenderer={optionRenderer(transactionType)}
            className={styles.select}
            disabled={loading}
          />
        </div>
        <div className={styles.result}>
          <div className={styles.label}>{secondLabel}</div>
          <Select
            variants={resultOptions}
            onChange={onResultChange}
            value={resultType}
            optionRenderer={optionRenderer(resultType)}
            className={styles.select}
            disabled={loading}
          />
        </div>
        <div className={styles.result}>
          <div className={styles.label}>{thirdLabel}</div>
          <Select
            variants={timeOptions} 
            onChange={onTimeChange}
            value={time}
            optionRenderer={optionRenderer(time)}
            className={styles.select}
            disabled={loading}
          />
        </div>
      </div>
      <Button
        type="submit"
        isLoading={loading} 
        className={styles.submit}
      >
        {buttonText}
      </Button>
    </form>
  ); 
};
