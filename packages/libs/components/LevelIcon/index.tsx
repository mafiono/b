import React, { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';
import { PlayerLevel } from '../../types/casino/levels';
import { LevelImages } from '../../constants/levels';

interface IProps
  extends DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
  > {
  level: PlayerLevel;
}

const LevelIcon: FC<IProps> = ({ level, ...props }) => (
  LevelImages[level] ? <img src={LevelImages[level]} alt={level} {...props} /> : null
);

export { LevelIcon };
