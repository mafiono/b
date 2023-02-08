import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import { PlayerLevel } from '../../types/casino/levels';
import styles from './styles.module.scss';
import { LevelColors } from '../../constants/levels';
import { describeArc } from '../../utils/svg/arc';

export interface UserImageProps {
  image: string;
  progress: number;
  level: PlayerLevel;
  size?: number;
}

const UserImage: FC<UserImageProps> = ({
  image, progress, level, size = 44,
}) => {
  const perc = Math.min(Math.max(2, progress || 0), 100);
  const arc = useMemo(() => describeArc(22, 22, 21, 0, 359 * (perc / 100)), [perc]);
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => setLoaded(true), []);

  return (
    <svg className={styles.user} width={size} height={size} viewBox="0 0 44 44">
      <defs>
        <clipPath id="cut-off-bottom">
          <circle cx={22} cy={22} r={17} fill="white" />
        </clipPath>
      </defs>

      <circle cx={22} cy={22} r={16.5} fill="var(--color-button)" />

      <image
        xlinkHref={image}
        x={5}
        y={5}
        width={34}
        height={34}
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#cut-off-bottom)"
        onLoad={onLoad}
        opacity={loaded ? 1 : 0}
      />

      <circle cx={22} cy={22} r={21} fill="none" stroke={LevelColors[level]} strokeWidth={2} opacity={0.5} />
      <path d={arc} stroke={LevelColors[level]} strokeWidth={2} opacity={1} fill="none" />
    </svg>
  );
};

export { UserImage };
