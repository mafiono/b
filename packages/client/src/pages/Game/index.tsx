import React, { FC, useCallback, useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import GameList, { Breakpoints } from '@betnomi/libs/components/homepage/GameList';
import { GameType } from '@betnomi/libs/types/ui/games';
import { gameProvidersBreakpoints, generatePlaceholders } from '../../containers/homepage/Games';
import { selectHomeGames } from '../../store/home/selectors';
import { Game } from '../../store/home/types';
import GameBanner from '@betnomi/libs/components/GameBanner';
import { selectAuthUI } from '../../store/auth/selectors';
import GameProvider from '@betnomi/libs/components/homepage/GamesProvider';
import GameView from './GameView';
import GameBottomMenu from './GameMenu';

import { useShallowSelector } from '../../hooks';
import { useTranslation } from '../../i18n';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import {
  useParams,
} from 'react-router-dom';

import styles from './styles.module.scss';

interface IProps {
}


const GameSlug: FC<IProps> = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { gameProviders, isLoading, ...allGames } = useShallowSelector(selectHomeGames);
  const { isChatActive } = useShallowSelector(selectAuthUI);
  const { t } = useTranslation();
  let { id: gameId } = useParams();


  const [activeGame, setActiveGame]: any = useState(null);

  useEffect(() => {
    let game: any;

    Object.keys(allGames).forEach(item => {
      // @ts-ignore
      if (allGames[item].length > 0 && !game) {
        // @ts-ignore
        game = allGames[item].find(elem => elem.id === gameId);
      }
    });

    setActiveGame(game);
  }, []);


  const handleResize = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(isMobile);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getGames = useCallback((
    gameList: Game[], imgSizes = {},
  ) => gameList.map((game) => (
    <GameBanner
      name={game.name}
      image={game.icon_3 || game.icon_2}
      key={game.id}
      width={imgSizes.width}
      height={imgSizes.height}
      imageClassname={styles.banner}
      game={game}
    />
  )), []);

  const smallScreen = window.matchMedia('(min-width:768px) and (max-width: 1200px)').matches;
  const midScreen = window.matchMedia('(min-width:1201px) and (max-width: 1500px)').matches;
  const gameImgSizes = {
    gameProviders: {
      width: midScreen && isChatActive ? 125 : midScreen ? 135 : isChatActive ? 140 : 145,
      height: midScreen && isChatActive ? 60 : midScreen ? 70 : isChatActive ? 65 : 75,
    },
    recommended: {
      width: 160,
      height: isMobile ? 220 : 250,
    },
  };

  const recommended: Breakpoints = {
    320: { slidesPerView: 2 },
    375: { slidesPerView: 2 },
    500: { slidesPerView: 3 },
    700: { slidesPerView: 4 },
    1000: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
    1440: { slidesPerView: 6 },
    1620: { slidesPerView: 7 },
    2160: { slidesPerView: 'auto' },
  };

  const [activeScreen, setActiveScreen]: any = useState(false);
  const handleActiveScreen = () => {
    setActiveScreen(!activeScreen);
  };

  const gameFullScreen = useFullScreenHandle();

  const reportChange = useCallback((state, handle) => {
    if (handle === gameFullScreen) {
      if(!state){
        setActiveScreen(false);
      }
    }
  }, [gameFullScreen]);

  return (
    <MainLayout isMobile={isMobile}>
      <div className={styles.page}>

        <div>
          <FullScreen handle={gameFullScreen} onChange={reportChange}>
            <GameView activeScreen={activeScreen} game={activeGame} />
          </FullScreen>
          <GameBottomMenu handleActiveScreen={handleActiveScreen} handle={gameFullScreen.enter} />
        </div>

        <div className={styles.list}>
          <GameList
            breakpoints={recommended}
            games={generatePlaceholders(160, 220)}
            gameType={GameType.RecommendedGames}
            spaceBetween={isMobile ? 12 : 24}
          />
        </div>

        <div className={styles.list}>
          <GameList
            breakpoints={gameProvidersBreakpoints}
            games={isLoading ? generatePlaceholders(130, 80) : getGames(gameProviders, gameImgSizes.gameProviders)}
            gameType={GameType.GameProviders}
            spaceBetween={smallScreen ? 22 : 12}
          />
        </div>

        <div className={styles.list}>
          <GameProvider isMobile={isMobile} />
        </div>
      </div>
    </MainLayout>
  );
};

export { GameSlug };