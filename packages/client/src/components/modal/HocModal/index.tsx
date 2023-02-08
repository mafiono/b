import React from 'react';
import { ModalHeader } from '../ModalHeader';
import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
  title?: JSX.Element | string;
};

export const HocModal: React.FC<Props> = ({
  children, onClose, 
  title,
}) => (
  <div className={styles.out}>
    <ModalHeader onClose={onClose}>
      {title}
    </ModalHeader>
    {children}
  </div>
);
