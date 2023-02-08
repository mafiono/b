import { useMemo } from 'react';
import { keys } from 'ramda';
import { GameCategory } from '../constants/gameCategory';

export const useCategories = () => useMemo(() => (
  keys(GameCategory).map((item) => GameCategory[item])
), []);
