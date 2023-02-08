import React, { FC } from 'react';
import classNames from 'classnames';
import { LevelColors, LevelNames, LevelTextColors } from '../../constants/levels';
import { PlayerLevel } from '../../types/casino/levels';
import styles from './styles.module.scss';

interface IProps {
  level: PlayerLevel
  className?: string
}

const LevelBadge: FC<IProps> = ({ level, className }) => (
  <div
    className={classNames(styles.level, className)}
    style={{
      backgroundColor: LevelColors[level],
      color: LevelTextColors[level],
    }}
  >
    {LevelNames[level]}
  </div>
);

export { LevelBadge };
