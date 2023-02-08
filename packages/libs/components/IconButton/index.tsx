import React, { FC } from 'react';
import classNames from 'classnames';
import { FontIcon, FontIconName } from '../FontIcon';
import Button, { ButtonProps } from '../Button';
import styles from './styles.module.scss';

interface IProps extends ButtonProps {
  name: FontIconName;
}

const IconButton: FC<IProps> = ({ name, className, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button className={classNames(styles.button, className)} {...props}>
    <FontIcon name={name} size={16} />
  </Button>
);

export { IconButton };
