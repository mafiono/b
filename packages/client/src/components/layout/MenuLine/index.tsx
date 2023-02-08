import React from 'react';
import styles from './styles.module.scss';

export interface MenuLineOptions {
  label: string;
}

export const MenuLine:React.FC = () => <div className={styles.line} />;
