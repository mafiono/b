import React, {FC, useState} from 'react';

import {useTranslation} from "../../../../i18n";

import cx from "classnames";
import styles from './styles.module.scss';
import {FontIcon, FontIconName} from "@betnomi/libs/components/FontIcon";

interface IProps {}
interface Option {
    value: string;
    label: string;
    games?: number;
}

const SelectWrap: FC<IProps> = () => {
    const { t } = useTranslation();

    const optionsSportBetResult = [
        { label: 'All', games: 1112, value: 'All' },
        { label: 'Belatra', games: 12, value: 'Belatra' },
        { label: 'Betsoft', games: 312, value: 'Betsoft' },
        { label: 'BGaming', games: 112, value: 'BGaming' },
        { label: 'Bg Time Gaming', games: 2, value: 'Bg Time Gaming' },
        { label: 'Blueprint', games: 32, value: 'Blueprint' },
        { label: 'Booongo', games: 32, value: 'Booongo' },
        { label: 'ELK Studios', games: 32, value: 'ELK Studios' },
        { label: 'Endorphina', games: 32, value: 'Endorphina' },
        { label: 'Evoplay', games: 32, value: 'Evoplay' },
        { label: 'GameArt', games: 32, value: 'GameArt' },
    ];

    const [selectedProviders, setSelectedProviders]: any = useState({})

    const handleSelectedProviders = (elem: Option) => {
        const providers = {...selectedProviders}
        if(!providers[elem.value]){
            providers[elem.value] = elem
            setSelectedProviders(providers)
        }else {
            delete providers[elem.value]
            setSelectedProviders(providers)
        }
    }

    const [selectIsOpen, setSelectIsOpen]: any = useState(false)
    const handleOpenProvidersSelect = () => {
        setSelectIsOpen(!selectIsOpen)
    }

    const optionRenderer = ( elem:Option ) => {
        return(
            <div onClick={() => handleSelectedProviders(elem)} className={cx(styles.option, { [styles.selected]: selectedProviders[elem.value] })}>
                <label htmlFor={elem.value} className={cx({[styles.active]: selectedProviders[elem.value]}, styles.checkboxLabel)}>
                    <FontIcon
                        name={FontIconName.Checked}
                        size={12}
                        className={styles.check_icon}
                    />
                </label>
                <p>{elem.label}</p>
                <span className={styles.games}>{elem.games}</span>
            </div>
        );
    }

    return (
        <div  className={styles.select}>
            <p>Providers:</p>
            <button
                className={styles.button}
                type="button"
                onClick={handleOpenProvidersSelect}
            >
                {selectedProviders && (
                    <div className={styles.value}>All</div>
                )}

                <FontIcon
                    name={FontIconName.ChevronDown}
                    size={16}
                    className={cx({[styles.active]: selectIsOpen}, styles.chevron)}
                />
            </button>

            {selectIsOpen && (
                <div className={styles.providers}>
                    {optionsSportBetResult.map((item) => (
                        <div key={item.value}>
                            {optionRenderer(item)}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export { SelectWrap };