import React, { FC, PropsWithChildren, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper/core';
import { NavigationOptions } from 'swiper/types/components/navigation';
import cx from 'classnames';
import { gameNames, GameType } from '../../../types/ui/games';
import H4 from '../../H4';
import ArrowButton, { ArrowType } from '../../ArrowButton';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import gameIcons from '../../../assets/img/games';
import styles from './styles.module.scss';
import {useShallowSelector} from "@betnomi/client/src/hooks";
import {selectAuthUI} from "@betnomi/client/src/store/auth/selectors";
import {GameOverlay} from "@betnomi/libs/components/GameOverlay";
export type Breakpoints = SwiperOptions['breakpoints'];

interface Props {
  games: JSX.Element[]
  gameType: GameType,
  breakpoints?: Breakpoints
  items?: number
  autoFill?: boolean
  spaceBetween?: number
  slidesPerViewWithChatIsActive?: number
}

SwiperCore.use([Navigation]);

export const getSlidesPerView = (breakpoints: SwiperOptions['breakpoints'], isChatActive: boolean, gameType: string, isMenuActive:boolean) => {
  const windowInnerWidth = window.innerWidth;
  let slidesPerView: any = "auto";
  const breakpointsWidth = breakpoints ? Object.keys(breakpoints) : [];

  if(windowInnerWidth > 768 && windowInnerWidth < 2160){
    for (let i = 0; i < breakpointsWidth.length; i++){
      if(Number(breakpointsWidth[i]) > windowInnerWidth && breakpoints){
        const breakpoint = breakpoints[breakpointsWidth[i - 1]].slidesPerView || "auto";
        if(windowInnerWidth >= 1920 && (gameType== 'LiveCasino' || gameType == 'TrendingGames' || gameType == 'Slots')){
          if((isChatActive) && typeof breakpoint === 'number'){
              slidesPerView = breakpoint - 1;
          }else {
            slidesPerView = breakpoint
          }
        }
        if(windowInnerWidth < 1920){
            if(isChatActive && isMenuActive && typeof breakpoint === 'number'){
              if(windowInnerWidth > 1250 && windowInnerWidth< 1640 && gameType == 'Slots'){
                slidesPerView =breakpoint - 3;
              }else if(windowInnerWidth > 1640 && gameType == 'Slots'){
                slidesPerView = breakpoint -2
              }else{
                slidesPerView = breakpoint -1
              }
            }else if((isMenuActive) && typeof breakpoint === 'number'){

              if(windowInnerWidth > 1250 && windowInnerWidth < 1640 && gameType == 'Slots'){
                slidesPerView =breakpoint - 1;
              }else{
                slidesPerView = breakpoint
              }
            }else if((isChatActive) && typeof breakpoint === 'number'){
              if(gameType === 'gameCategories'){
                slidesPerView = breakpoint - 6;
              }else if(windowInnerWidth > 1250 &&  windowInnerWidth < 1640 && gameType == 'Slots'){
                slidesPerView = breakpoint - 2;
              }else{
                slidesPerView = breakpoint - 1;
              }
    
            }else {
              slidesPerView = breakpoint
            }
            break
          }
      }
    }
  }else{
    slidesPerView = breakpoints ? breakpoints[breakpointsWidth[breakpointsWidth.length - 2]].slidesPerView : "auto";
  }
  return slidesPerView;
}

const GameList: FC<PropsWithChildren<Props>> = ({
  games,
  gameType,
  breakpoints,
  items,
  spaceBetween = 24,
}) => {
  const navigation: NavigationOptions = {
    prevEl: `.prev-${gameType}`,
    nextEl: `.next-${gameType}`,
  };
  const { isChatActive,isMenuActive } = useShallowSelector(selectAuthUI);

  const [leftBorderDisabled] = useState(true);
  const [rightBorderDisabled] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H4 className={styles.text_center}>
          {gameIcons[gameType] && (
            <img src={gameIcons[gameType]} alt={gameType} className={styles.icon} />
          )}
          {gameNames[gameType]}
        </H4>
        <div className={styles.buttons}>
          <ArrowButton type={ArrowType.left} className={cx(`prev-${gameType}`, styles.right_margin, 'prev-btn')} />
          <ArrowButton className={`next-${gameType}`} />
        </div>
      </div>
      <Swiper
        slidesPerView={ getSlidesPerView(breakpoints, isChatActive, gameType,isMenuActive) }
        spaceBetween={spaceBetween}
        navigation={navigation}
        breakpoints={breakpoints}
        observeParents
        resizeObserver
        watchOverflow
      >
        <div className={cx(styles.gradient_border, styles.left, leftBorderDisabled ? styles.disabled : '')} />
        <div className={cx(styles.gradient_border, styles.right, rightBorderDisabled ? styles.disabled : '')} />
        {games.map((game) => (
          <SwiperSlide key={game.key}>
            {gameType == 'Promotions' ? game : (
            <div className={styles.gameListItem}>
              {game}
              {gameType !== 'GameProviders' && <GameOverlay className={styles.overlay}/>}
            </div>
            )
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GameList;
