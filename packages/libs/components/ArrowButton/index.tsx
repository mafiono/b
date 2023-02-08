import React, { FC } from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from '../FontIcon';
import styles from './styles.module.scss';

export enum ArrowType {
  rigth = 'right',
  left = 'left',
}

interface Props {
  type?: ArrowType
  onClick?: (event: React.MouseEvent) => void,
  disabled?: boolean,
  className?: string
}

const ArrowButton: FC<Props> = ({ 
  type = ArrowType.rigth,
  disabled = false,
  onClick,
  className,
}) => {
  const fontIconName = type === ArrowType.rigth 
    ? FontIconName.ArrowRightBold 
    : FontIconName.ArrowLeftBold;

  return (
    <button className={cx(styles.button, className)} onClick={onClick} disabled={disabled}>
      <FontIcon className={cx(styles.icon, styles[type])} name={fontIconName} size={12} />
    </button>
  );
};

export default ArrowButton;
