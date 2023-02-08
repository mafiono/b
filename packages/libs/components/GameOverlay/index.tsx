import React, {FC} from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';
import playIcon from "@betnomi/libs/assets/img/icons/play.svg";

interface IProps {
    className?: string
    handlePlayGame?: () => void
}

const GameOverlay: FC<IProps> = ({className, handlePlayGame}) => {

    return (
      <div className={cx(styles.gameOverlay, className)}>
          <button className={styles.playBtn} onClick={handlePlayGame}>
              <img src={playIcon} alt="play btn"/>
          </button>
          <p>Fichin Reels</p>
          <span>Play Demo</span>
      </div>
    )
}

export { GameOverlay };