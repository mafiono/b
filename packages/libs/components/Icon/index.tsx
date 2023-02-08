import React, { FC } from 'react';
import cx from 'classnames';
import { IconName } from '../../types/ui';

interface IProps {
  value?: IconName;
  className?: string;
}

const Icon: FC<IProps> = ({ value, className }) => (
  <div className={cx(className)}>
    [
    {value}
    ]
  </div>
);

export default Icon;
