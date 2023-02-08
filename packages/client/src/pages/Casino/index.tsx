import React, {FC, useCallback, useState} from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import GameList from "@betnomi/libs/components/homepage/GameList";
import { GameType} from "@betnomi/libs/types/ui/games";
import { gameProvidersBreakpoints, generatePlaceholders, getBanners} from "../../containers/homepage/Games";
import {useShallowSelector} from "../../hooks";
import {selectHomeGames} from "../../store/home/selectors";
import {Game} from "../../store/home/types";
import GameBanner from "@betnomi/libs/components/GameBanner";
import {selectAuthUI} from "../../store/auth/selectors";
import H4 from "@betnomi/libs/components/H4";
import {FontIcon, FontIconName} from "@betnomi/libs/components/FontIcon";
import {SearchPanel} from "./Content/SearchPanel";
import {LoadMore} from "./Content/LoadMore";
import BannerList from "@betnomi/libs/components/homepage/BannerList";
import {GameOverlay} from "@betnomi/libs/components/GameOverlay";
import {useTranslation} from "../../i18n";
import cx from "classnames";

import { bannerCasinoOverlay } from '@betnomi/client/src/components/common/BannerOverlays';

import styles from './styles.module.scss';
import popularIcon from "@betnomi/libs/assets/img/icons/popular.svg";

interface IProps {}


const Casino: FC<IProps> = () => {
    const [isMobile, setIsMobile] = useState(false);
    const { gameProviders, isLoading} = useShallowSelector(selectHomeGames);
    const { isChatActive } = useShallowSelector(selectAuthUI);
    const { t } = useTranslation();

    const handleResize = () => {
        const isMobile =  window.matchMedia("(max-width: 768px)").matches;
        setIsMobile(isMobile)
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const getGames = useCallback((
        gameList: Game[], imgSizes = {}, gameType
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
        }
    };

    return (
        <MainLayout isMobile={isMobile}>
            <div className={styles.page}>
                <div className={styles.banners}>
                    <BannerList overlay={bannerCasinoOverlay} items={isMobile? 1 : 3} banners={getBanners()} withPagination />
                </div>

                <SearchPanel />

                <div className={styles.list}>
                    <div className={styles.mustPlayList}>
                        {[...new Array(14)].map((item, index) => (
                            <>
                                {index === 0 && (
                                    <div className={cx(styles.listItem, styles.listItemBanner)}>
                                        <p className={styles.popularIcon}><img src={popularIcon} alt="popular games icon"/></p>
                                        <div>
                                            <p className={styles.playOver}>
                                                Play over
                                                <span className={styles.games}> 1000 games </span>
                                                from the best providers
                                            </p>
                                            <FontIcon name={FontIconName.ArrowRightBold} size={24} />
                                        </div>
                                    </div>
                                )}
                                <div className={styles.listItem}>
                                    {index + 1}
                                    <GameOverlay className={styles.overlay}/>
                                </div>
                            </>
                        ))}
                    </div>
                </div>

                <div className={styles.list}>
                    <div className={styles.title}>
                        <H4 className={styles.text_center}>
                            Must Play
                        </H4>
                    </div>
                    <div className={styles.mustPlayList}>
                        {[...new Array(7)].map(item => (
                            <div className={styles.listItem}>{''}
                                <GameOverlay className={styles.overlay}/>
                            </div>
                        ))}
                    </div>
                </div>

                <LoadMore/>

                <div className={styles.list}>
                    <GameList
                        breakpoints={gameProvidersBreakpoints}
                        games={isLoading ? generatePlaceholders(130, 80) : getGames(gameProviders, gameImgSizes.gameProviders, 'gameProviders')}
                        gameType={GameType.GameProviders}
                        spaceBetween={smallScreen ? 22 : 12}
                    />
                </div>
            </div>
        </MainLayout>
    );
}

export { Casino };