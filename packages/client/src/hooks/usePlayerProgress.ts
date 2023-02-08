import { isNil, values } from 'ramda';
import { PlayerLevel } from '@betnomi/libs/types/casino/levels';
import { useMemo } from 'react';
import useShallowSelector from './useShallowSelector';
import { selectAuthRanksList, selectAuthRanksMy, selectAuthTokens } from '../store/auth/selectors';

export const usePlayerProgress = () => {
  const list = useShallowSelector(selectAuthRanksList);
  const my = useShallowSelector(selectAuthRanksMy);
  const { rankId, totalBet } = my;
  const { access, refresh } = useShallowSelector(selectAuthTokens);

  if (!list || !access || !refresh || values(list).length) {
    return {
      level: PlayerLevel.User,
      progress: 0,
    };
  }

  const levelsSorted = useMemo(
    () => values(list).sort((a, b) => a.wager - b.wager),
    [list],
  );

  const currentLevelIndex = useMemo(
    () => levelsSorted.findIndex((item) => item.id === rankId),
    [levelsSorted, rankId],
  );

  const level = levelsSorted[currentLevelIndex]?.name || PlayerLevel.User;

  const nextLevelIndex = Math.min(currentLevelIndex + 1, levelsSorted.length - 1);
  const nextLevel = useMemo(() => levelsSorted[nextLevelIndex], [nextLevelIndex, levelsSorted]);

  if (isNil(currentLevelIndex) || isNil(nextLevel)) {
    return {
      level,
      progress: 0,
    };
  }

  const total = nextLevel.wager - (levelsSorted[currentLevelIndex]?.wager || 0);
  const current = totalBet - (levelsSorted[currentLevelIndex]?.wager - 0) || 0;
  const progress = Math.max(0, Math.min((current / total) * 100, 100)) || 0;

  return {
    level,
    progress,
  };
};
