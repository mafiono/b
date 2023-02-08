import React, { FC } from 'react';
import cx from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper/core';
import { NavigationOptions } from 'swiper/types/components/navigation';
import { GameCategory, gameCategoryNames } from '../../../constants/gameCategory';
import GameCategoryIcon from '../GameCategoryIcon';
import { FontIcon, FontIconName } from '../../FontIcon';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import styles from './styles.module.scss';
import {Breakpoints} from "../GameList";
import {getSlidesPerView} from "../GameList";
import {useShallowSelector} from "@betnomi/client/src/hooks";
import {selectAuthUI} from "@betnomi/client/src/store/auth/selectors";

interface Props {
  categories: GameCategory[]
  spaceBetween?: number
  breakpoints?: SwiperOptions['breakpoints']
}

const categoryPrev = 'category-prev';
const categoryNext = 'category-next';
const navigation: NavigationOptions = {
  prevEl: `.${categoryPrev}`,
  nextEl: `.${categoryNext}`,
};

SwiperCore.use([Navigation]);

const CategoriesBreakpoints: Breakpoints = {
    375: { slidesPerView: 5 },
    414: { slidesPerView: 6 },
    500: { slidesPerView: 7 },
    560: { slidesPerView: 8 },
    630: { slidesPerView: 9 },
    690: { slidesPerView: 10 },

    769: { slidesPerView: 6 },
    840: { slidesPerView: 7 },
    900: { slidesPerView: 8 },
    960: { slidesPerView: 9 },
    1020: { slidesPerView: 10 },
    1080: { slidesPerView: 11 },
    1140: { slidesPerView: 12 },
    1200: { slidesPerView: 13 },
    1260: { slidesPerView: 14 },
    1320: { slidesPerView: 15 },
    1380: { slidesPerView: 16 },
    1440: { slidesPerView: 17 },
    1500: { slidesPerView: 18 },
    1560: { slidesPerView: 19 },
    1620: { slidesPerView: 20 },
    2160: { slidesPerView: 'auto' },
};

const GameCategoriesList: FC<Props> = ({ categories, spaceBetween = 16, breakpoints }) => {
    const { isChatActive } = useShallowSelector(selectAuthUI);

    return (
        <div className={styles.main_wrapper}>
            <button className={cx(styles.arrow, styles.left, categoryPrev)}>
                <FontIcon name={FontIconName.ArrowLeftBold} size={14} />
            </button>
            <button className={cx(styles.arrow, styles.right, categoryNext)}>
                <FontIcon name={FontIconName.ArrowRightBold} size={14} />
            </button>
            <Swiper
                slidesPerView={getSlidesPerView(CategoriesBreakpoints, isChatActive, 'gameCategories')}
                spaceBetween={spaceBetween}
                navigation={navigation}
                breakpoints={CategoriesBreakpoints}
                observeParents
                resizeObserver
                watchOverflow
            >
                {categories.map((category) => (
                    <SwiperSlide key={category}>
                        <div className={styles.category_wrapper}>
                            <div className={styles.category}>
                                <GameCategoryIcon className={styles.icon} category={category} />
                            </div>
                            <div className={styles.name}>{gameCategoryNames[category]}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default GameCategoriesList;
