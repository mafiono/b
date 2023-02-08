import React, { FC } from 'react';
import { FontIcon, FontIconName } from '../../FontIcon';
import { GameCategory } from '../../../constants/gameCategory';

interface Props {
  category: GameCategory;
  size?: number;
  className?: string;
}

export const gameCategoryIcons: Record<GameCategory, FontIconName> = {
  [GameCategory.Featured]: FontIconName.Featured,
  [GameCategory.Football]: FontIconName.Football,
  [GameCategory.Tennis]: FontIconName.Tennis,
  [GameCategory.Volleyball]: FontIconName.Volleyball,
  [GameCategory.Baseball]: FontIconName.Baseball,
  [GameCategory.IceHockey]: FontIconName.IceHockey,
  [GameCategory.Handball]: FontIconName.Handball,
  [GameCategory.Cricket]: FontIconName.Cricket,
  [GameCategory.MMA]: FontIconName.MMA,
  [GameCategory.Snooker]: FontIconName.Snooker,
  [GameCategory.WaterPolo]: FontIconName.WaterPolo,
  [GameCategory.Darts]: FontIconName.Darts,
  [GameCategory.Golf]: FontIconName.Golf,
  [GameCategory.FormulaOne]: FontIconName.FormulaOne,
  [GameCategory.Cycling]: FontIconName.Cycling,
  [GameCategory.Chess]: FontIconName.Chess,
  [GameCategory.Netball]: FontIconName.Netball,
};

const GameCategoryIcon: FC<Props> = ({ category, size = 24, className }) => (
  <FontIcon name={gameCategoryIcons[category]} size={size} className={className} />
);

export default GameCategoryIcon;
