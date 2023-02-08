import React from 'react';
import styles from './styles.module.scss';

type Props = {
  onModalSwitch: () => void;
  desc: string;
  labelTo: string;
};

export const ModalSwitcher: React.FC<Props> = ({ onModalSwitch, desc, labelTo }) => (
  <div className={styles.switcher}>
    {desc}
    {' '}
    <button
      className={styles.switcher_button} 
      type="button"
      onClick={onModalSwitch}
    >
      {labelTo}
    </button>
  </div>
);
