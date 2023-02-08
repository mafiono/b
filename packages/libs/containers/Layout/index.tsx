import React, { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

type Props = {
};

const Layout: FC<PropsWithChildren<Props>> = ({
  children,
}) => (
  <div className={styles.layout}>
    {children}
  </div>
);

export default Layout;
