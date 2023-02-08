import React, { FC } from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { LineDivorce } from '@betnomi/libs/components';
import styles from './styles.module.scss';

type Props = {
  onClose?: () => void;
};

export const ModalHeader:FC<Props> = ({
  onClose, children, 
}) => 
  (
    <>
      <div className={styles.header}>
        {children}
        <button 
          className={styles.close}
          onClick={onClose}
          type="button"
        >
          <FontIcon name={FontIconName.Close} size={16} />
        </button>
      </div>
      <div className={styles.line_wrap}>
        <LineDivorce />
      </div>
    </>
  );
