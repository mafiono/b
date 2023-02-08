import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface Props {
  className?: string
}

const H4: FC<Props> = ({ children, className }) => (
  <h4 className={cx(styles.h4, className)}>
    {children}
  </h4>
);

export default H4;
