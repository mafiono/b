import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props extends PropsWithChildren<any> {}

interface Test {
  className?: string;
}

function TabbedContent({ children }: Props) {
  return <div className={styles.wrap}>{children}</div>;
}

const Tabs: FC = ({ children }) => <div className={styles.tabs}>{children}</div>;

const Content: FC<Test> = ({ children, className }) => (
  <div className={classNames(styles.content, className)}>{children}</div>
);

TabbedContent.Tabs = Tabs;
TabbedContent.Content = Content;

export { TabbedContent };
