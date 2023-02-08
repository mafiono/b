import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren, 
} from 'react';
import cx from 'classnames';
import { ButtonColor, IconName } from '../../types';
import { Icon } from '..';
import Loader from '../Loader';
import styles from './styles.module.scss';

export type ButtonProps = DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  color?: string,
  size?: number,
  fullWidth?: boolean,
  onClick?: (event: React.MouseEvent) => void,
  icon?: IconName,
  iconClassName?: string,
  isLoading?: boolean,
};

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  color = ButtonColor.Primary,
  size = 44,
  fullWidth = false,
  onClick = () => {},
  className,
  type = 'button',
  children,
  disabled,
  icon,
  iconClassName,
  isLoading,
  ...rest
}) => (
  <button
    type={type}
    className={cx(
      styles.button,
      styles[color],
      className,
      {
        [styles.full_width]: fullWidth,
      },
    )}
    style={{ height: size }}
    onClick={onClick}
    disabled={disabled || isLoading}
    {...rest}
  >
    {isLoading ? <Loader /> : (
      <>
        {icon && (
        <Icon
          value={icon}
          className={iconClassName}
        />
        )}
        {children}
      </>
    )}
  </button>
);

export default Button;
