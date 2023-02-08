import React, {FC, useState} from 'react';
import {useTranslation} from "i18n";
import {TextInput} from "@betnomi/libs/components/TextInput";

import searchIcon from "@betnomi/libs/assets/img/icons/search.svg";
import H4 from "@betnomi/libs/components/H4";
import styles from './styles.module.scss';
import { SelectWrap } from "../Select";

interface IProps {}

const SearchPanel: FC<IProps> = () => {
    const { t } = useTranslation();

    //for search
    const [searchValue, setSearchValue] = useState('')
    const [searchResultIsOpen, setSearchResultIsOpen] = useState(false)
    const handleSearch = (e: any) => {
        setSearchValue(e.target.value)
        if(e.target.value){
            setSearchResultIsOpen(true)
        }
    }
    const handleClearBtn = () => {
        setSearchValue('')
        setSearchResultIsOpen(false)
    }
    const handleSearchBlur = () => {
        setSearchResultIsOpen(false)
    }
    const handleSearchFocus = () => {
        if(searchValue){
            setSearchResultIsOpen(true)
        }
    }

    const [popularSlotsList, setPopularSlotsList] = useState('All')
    const handlePopularSlots = (e: React.FormEvent<EventTarget>): void => {
        const target = e.target as HTMLElement;
        if(target.nodeName !== 'LI') return;
        const slotName = target.dataset.slotName
        if(slotName){
            setPopularSlotsList(slotName);
        }
    }

    return (
        <div className={styles.searchPanel}>
            <div className={styles.popularSlotBlock}>
                <H4 className={styles.text_center}>Popular Slots</H4>
                <ul onClick={handlePopularSlots} className={styles.popularSlotsList }>
                    <li data-slot-name={'All'} className={popularSlotsList === "All" ? styles.active : ''}>All</li>
                    <li data-slot-name={'Feature'} className={popularSlotsList === "Feature" ? styles.active : ''}>Feature</li>
                    <li data-slot-name={'Popular'} className={popularSlotsList === "Popular" ? styles.active : ''}>Popular</li>
                </ul>
            </div>

            <div className={styles.searchWrap}>
                <div className={styles.search}>
                    <TextInput
                        value={searchValue}
                        type={"search"}
                        onChange={handleSearch}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        handleClearBtn={handleClearBtn}
                        left={<img alt={'search Icon'}  src={searchIcon} width={16} height={16}/>}
                        placeholder={t('Search for games')}
                        className={styles.searchInput}
                    />
                </div>

                <SelectWrap />

                {searchResultIsOpen && (
                    <div className={styles.searchResult}>
                        <p>We found 3 results for sweet</p>
                        <ul className={styles.searchResultlist}>
                            <li>
                                <img src="https://i.ibb.co/Krf0dWc/banner-1.png" alt="" width={72} height={52}/>
                                <p>
                                    <span>Sweet 27</span>
                                    <span>Pragmatic Play</span>
                                </p>
                            </li>
                            <li>
                                <img src="https://i.ibb.co/Krf0dWc/banner-1.png" alt="" width={72} height={52}/>
                                <p>
                                    <span>Sweet 27</span>
                                    <span>Pragmatic Play</span>
                                </p>
                            </li>
                            <li>
                                <img src="https://i.ibb.co/Krf0dWc/banner-1.png" alt="" width={72} height={52}/>
                                <p>
                                    <span>Sweet 27</span>
                                    <span>Pragmatic Play</span>
                                </p>
                            </li>
                            <li>
                                <img src="https://i.ibb.co/Krf0dWc/banner-1.png" alt="" width={72} height={52}/>
                                <p>
                                    <span>Sweet 27</span>
                                    <span>Pragmatic Play</span>
                                </p>
                            </li>
                            <li>
                                <img src="https://i.ibb.co/Krf0dWc/banner-1.png" alt="" width={72} height={52}/>
                                <p>
                                    <span>Sweet 27</span>
                                    <span>Pragmatic Play</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export { SearchPanel };