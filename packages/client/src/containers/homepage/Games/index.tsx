import React, { FC, useCallback, useEffect } from 'react';
import BannerList, { Banner } from '@betnomi/libs/components/homepage/BannerList';
import GameList, { Breakpoints } from '@betnomi/libs/components/homepage/GameList';
import { GameType } from '@betnomi/libs/types/ui/games';
import GameCategoriesList from '@betnomi/libs/components/homepage/GameCategoriesList';
import { useCategories } from '@betnomi/libs/hooks/useCategories';
import { useDispatch } from 'react-redux';
import GameBanner from '@betnomi/libs/components/GameBanner';
import Skeleton from '@betnomi/libs/components/Skeleton';
import styles from './styles.module.scss';
import { homeGetGames } from '../../../store/home/actionCreators';
import { Game } from '../../../store/home/types';
import { useShallowSelector } from '../../../hooks';
import { selectHomeGames } from '../../../store/home/selectors';
import { selectAuthUI } from '../../../store/auth/selectors';
import { bannerHomeOverlay } from '@betnomi/client/src/components/common/BannerOverlays';
import GameProvider from '@betnomi/libs/components/homepage/GamesProvider'
import {Promotions} from '@betnomi/libs/components/Promotions';
import Union from '@betnomi/libs/assets/img/promotions/Union.png';
import SummerDots from '@betnomi/libs/assets/img/promotions/background2.png';
import Ellips from '@betnomi/libs/assets/img/promotions/Ellipse1.png';
import Round1 from '@betnomi/libs/assets/img/promotions/Round1.png';
import BackgroundImage from '@betnomi/libs/assets/img/promotions/background1.png';
import Ellips2 from '@betnomi/libs/assets/img/promotions/Ellips2.png';
import Round2 from '@betnomi/libs/assets/img/promotions/Round2.png';

interface IProps {
  isMobile: boolean
}
interface ILocalGame {
  type:boolean
  bgImage:string
  elipisis:string
  bgColor:string,
  title:string,
  para:string,
  round:string | null
}
// Test
export const getBanners = () => {
  const banners: Banner[] = [
    { image: 'https://i.ibb.co/Krf0dWc/banner-1.png', link: '#', title: 'Age of Huracan', text: 'Up to $100 + 200 free spins!' },
    { image: 'https://i.ibb.co/Krf0dWc/banner-2.png', link: '#', title: 'Age of 1Huracan', text: 'Up to $100 + 200 free spins!' },
    { image: 'https://i.ibb.co/Krf0dWc/banner-3.png', link: '#', title: 'Age of 2Huracan', text: 'Up to $100 + 200 free spins!' },
    { image: 'https://i.ibb.co/Krf0dWc/banner-4.png', link: '#', title: 'Age of 3Huracan', text: 'Up to $100 + 200 free spins!' },
    { image: 'https://i.ibb.co/Krf0dWc/banner-5.png', link: '#', title: 'Age of 4Huracan', text: 'Up to $100 + 200 free spins!' },
    { image: 'https://i.ibb.co/Krf0dWc/banner-6.png', link: '#', title: 'Age of 5Huracan', text: 'Up to $100 + 200 free spins!' },
  ];

  return banners;
};

const PromotionLocal = [
  {
    type:false,
    bgImage:BackgroundImage,
    elipisis:Ellips,
    round:Round1,
    bgColor:'#6B59D9',
    title:'Twin Welcome Pack',
    para:'Get up to 100 free spins in Book of Dead'
  },
  {
    type:true,
    bgImage:SummerDots,
    elipisis:Union,
    round:null,
    bgColor:'#63A5F1',
    title:'Summer of Love',
    para:'Trigger a share of 0.100000 bitcoin with any bet in selected slots.'
  },
  {
    type:false,
    bgImage:BackgroundImage,
    elipisis:Ellips2,
    round:Round2,
    bgColor:'#3EBBA9',
    title:'Twin Welcome Pack',
    para:'Get up to 100 free spins in Book of Dead'
  },
  {
    type:true,
    bgImage:SummerDots,
    elipisis:Union,
    round:null,
    bgColor:'#63A5F1',
    title:'Summer of Love',
    para:'Trigger a share of 0.100000 bitcoin with any bet in selected slots.'
  },
  {
    type:false,
    bgImage:BackgroundImage,
    elipisis:Ellips2,
    round:Round2,
    bgColor:'#3EBBA9',
    title:'Twin Welcome Pack',
    para:'Get up to 100 free spins in Book of Dead'
  },
  {
    type:true,
    bgImage:SummerDots,
    elipisis:Union,
    round:null,
    bgColor:'#63A5F1',
    title:'Summer of Love',
    para:'Trigger a share of 0.100000 bitcoin with any bet in selected slots.'
  },
]

export const generatePlaceholders = (width?: number, height?: number) => (
  [...new Array(10)]
    // eslint-disable-next-line react/no-array-index-key
    .map((_, i) => <Skeleton height={height} width={width} key={i} />)
);

const trendingBreakpoints: Breakpoints = {
  375: { slidesPerView: 2 },
  // 500: { slidesPerView: 3 },
  720: { slidesPerView: 3 },
  1000: { slidesPerView: 3 },
  1280: { slidesPerView: 5 },
  1440: { slidesPerView: 5 },
  1620: { slidesPerView: 6 },
  2160: { slidesPerView: 'auto' },
};

const slotsBreakpoints: Breakpoints = {
  375: { slidesPerView: 2 },
  500: { slidesPerView:3 },
  700: { slidesPerView: 4 },
  1000: { slidesPerView: 5 },
  1280: { slidesPerView: 7 },
  1440: { slidesPerView: 8 },
  1640: { slidesPerView: 8 },
  // 1760: { slidesPerView: 8 },
  // 1930: { slidesPerView: 8 },
  2160: { slidesPerView: 'auto' },
};

const liveCasinoBreakpoints: Breakpoints = {
  375: { slidesPerView: 1 },
  // 500: { slidesPerView: 2 },
  700: { slidesPerView: 1 },
  1000: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
  1440: { slidesPerView: 4 },
  1620: { slidesPerView: 5 },
  2160: { slidesPerView: 'auto' },
};

export const gameProvidersBreakpoints: Breakpoints = {
  375: { slidesPerView: 2 },
  500: { slidesPerView: 3 },
  700: { slidesPerView: 4 },
  768: { slidesPerView: 4 },
  900: { slidesPerView: 6 },
  1000: { slidesPerView: 7 },
  1280: { slidesPerView: 8 },
  1440: { slidesPerView: 9 },
  1760: { slidesPerView: 9 },
  1930: { slidesPerView: 10 },
  2160: { slidesPerView: 'auto' },
};

const promotionsBreakpoints: Breakpoints = {
  375: { slidesPerView: 1 },
  720: { slidesPerView: 1 },
  1000: { slidesPerView: 2 },
  1280: { slidesPerView: 3 },
  1440: { slidesPerView: 3 },
  1620: { slidesPerView: 4 },
  2160: { slidesPerView: 'auto' },
};

const Games: FC<IProps> = ({ isMobile }) => {
  const dispatch = useDispatch();
  const {
    trending, liveCasino, slots, promotions, gameProviders, isLoading,
  } = useShallowSelector(selectHomeGames);
  const categories = useCategories();
  const { isChatActive } = useShallowSelector(selectAuthUI);

  useEffect(() => {
    dispatch(homeGetGames());
  }, []);
  const getGames = useCallback((
    gameList: Game[], imgSizes = {},
    ) => gameList.map((game) => {
      return(
      <GameBanner
        name={game.name}
        image={game.icon_3 || game.icon_2}
        key={game.id}
        width={imgSizes.width}
        height={imgSizes.height}
        imageClassname={styles.banner}
        game={game}
      />
  )}), []);

  const getPromotions = useCallback((
    gameList: ILocalGame[], imgSizes = {},
    ) => PromotionLocal.map((game) => {
      return(
    <Promotions
      type={game.type}
      bgImage= {game.bgImage}
      elipisis= {game.elipisis}
      bgColor={game.bgColor}
      round={game.round}
      title={game.title}
      para={game.para}
    />
  )}), []);

  const smallScreen = window.matchMedia('(min-width:768px) and (max-width: 1200px)').matches;
  const midScreen = window.matchMedia('(min-width:1201px) and (max-width: 1500px)').matches;

  const gameImgSizes = {
    trending: {
      width: isMobile ? 185 : 230,
      height: isMobile ? 220 : smallScreen ? 250 : midScreen ? 250 : 300,
    },
    slots: {
      width: isMobile ? 185 : 165,
      height: smallScreen ? 190 : midScreen ? 200 : 220 },
    liveCasino: {
      width: isMobile ? 385 : midScreen ? 320 : 300,
      height: isMobile ? 220 : midScreen ? 170 : 180 },
    gameProviders: {
      width: midScreen && isChatActive ? 125 : midScreen ? 135 : isChatActive ? 140 : 145,
      height: midScreen && isChatActive ? 60 : midScreen ? 70 : isChatActive ? 65 : isMobile ? 70 : 75,
    },
    promotions: {
      width: midScreen ? 320 : 300,
      height: midScreen ? 170 : 180 },
  };


  return (
    <>
      <div className={styles.banners}>
        <BannerList overlay={bannerHomeOverlay} items={1} banners={getBanners()} withPagination />
      </div>
      <hr className={styles.hr} />
      <div className={styles.categories}>
        <GameCategoriesList spaceBetween={isMobile ? 8 : smallScreen ? 22 : 12 } categories={categories} />
      </div>
      <hr className={styles.hr} />
      <div className={styles.games}>
        <div className={styles.list}>
          <GameList
            breakpoints={trendingBreakpoints}
            games={isLoading ? generatePlaceholders(220, 280) : getGames(trending, gameImgSizes.trending)}
            gameType={GameType.TrendingGames}
            spaceBetween={smallScreen ? 22 : 12}
            slidesPerViewWithChatIsActive={5}
          />
        </div>
        <div className={styles.list}>
          <GameList
            breakpoints={slotsBreakpoints}
            games={isLoading ? generatePlaceholders(168, 220) : getGames(slots, gameImgSizes.slots)}
            gameType={GameType.Slots}
            spaceBetween={smallScreen ? 22 : 12}
            slidesPerViewWithChatIsActive={7}
          />
        </div>
        <div className={styles.list}>
          <GameList
            breakpoints={liveCasinoBreakpoints}
            games={isLoading ? generatePlaceholders(350, 220) : getGames(liveCasino, gameImgSizes.liveCasino)}
            gameType={GameType.LiveCasino}
            spaceBetween={smallScreen ? 22 : 12}
            slidesPerViewWithChatIsActive={4}
          />
        </div>
        <div className={styles.list}>
          <GameProvider isMobile={isMobile}/>
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
          <GameList
            breakpoints={promotionsBreakpoints}
            games={isLoading ? generatePlaceholders(350, 220) : getPromotions(PromotionLocal, gameImgSizes.promotions)}
            gameType={GameType.Promotions}
            spaceBetween={smallScreen ? 22 : 12}
            slidesPerViewWithChatIsActive={4}
          />
        </div>
      </div>
    </>
  );
};
export default Games;
