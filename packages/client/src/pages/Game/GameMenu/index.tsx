import React, { FC, useState } from 'react';
import cx from 'classnames';
import { Toggle } from '@betnomi/libs/components/Toggle';
import { ModalType } from '../../../store/modal/types';
import { useModal } from '../../../hooks/useModal';
import { useUserUI } from '../../../hooks/useUserUI';

import {ReactComponent as SizeScreenIcon} from '@betnomi/libs/assets/img/icons/sizescreen.svg';
import {ReactComponent as FullscreenIcon} from '@betnomi/libs/assets/img/icons/fullscreen.svg';
import {ReactComponent as FavoriteIcon} from '@betnomi/libs/assets/img/icons/favorite.svg';
import {ReactComponent as StatsIcon} from '@betnomi/libs/assets/img/icons/stats.svg';

import styles from './styles.module.scss';

interface IProps {
  handle: () => void
  handleActiveScreen: () => void
}

const GameMenu: FC<IProps> = ({handle, handleActiveScreen}) => {
    const [realPlay, setRealPlay] = useState(true)
    const { showModal } = useModal();
    const {
        isChatActive, isMenuActive, setIsMenuActive, setIsChatActive,
    } = useUserUI();

    const toggleWithRates = () => {
        setRealPlay(!realPlay)
    }
    const handleClickTheatreView = () => {
        if(!isChatActive && !isMenuActive){
            setIsChatActive(true)
            return
        }

        setIsMenuActive(false)
        setIsChatActive(false)
    }

    const handleFullScreen = () => {
        handle()
        handleActiveScreen()
    }
    const handleOpenLiveStats = () => {
        showModal(ModalType.GameLiveStats)()
    }

    return (
        <div className={styles.gameMenuWrap}>
            <div className={styles.gameOptions}>
              <FullscreenIcon onClick={handleFullScreen} />
              <SizeScreenIcon onClick={handleClickTheatreView} />
              <StatsIcon onClick={handleOpenLiveStats} />
              <FavoriteIcon />
            </div>
            <div className={styles.toggleWrap}>
                <span className={cx({ [styles.active]: !realPlay })}> Fun Play </span>
                <Toggle value={realPlay} onChange={toggleWithRates} />
                <span className={cx({ [styles.active]: realPlay })}> Real Play </span>
            </div>
        </div>
    );
}

export default GameMenu ;