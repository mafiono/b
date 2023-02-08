import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import cx from 'classnames';
import { FontIcon, FontIconName } from '../FontIcon';
import styles from './styles.module.scss';

type Props = {
  text: string;
  disabled?: boolean;
  onCopy?: () => void;
};

export const CopyText: React.FC<Props> = ({ text, disabled, onCopy }) => (
  <div className={cx(
    styles.container, 
    { [styles.disabled]: disabled },
  )}
  >
    <div className={styles.text}>{text}</div>
    <CopyToClipboard text={text} onCopy={onCopy}>
      <button type="button" className={styles.button} disabled={disabled}>
        <FontIcon name={FontIconName.Copy} size={16} />
      </button>
    </CopyToClipboard>
  </div>
);
