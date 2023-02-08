import React, { FC, useCallback, useState } from 'react';

import { ModalComponentProps } from '../../../components/modal/Modal';
import { HocModal } from '../../../components/modal/HocModal';
import { useTranslation } from '../../../i18n';
import { Option, Select } from '@betnomi/libs/components/Select';
import { Button } from '@betnomi/libs/components';
import { CoinType } from '@betnomi/libs/types';
import Coin from '@betnomi/libs/components/Coin';
import { useUser } from '../../../hooks/useUser';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import styles from './styles.module.scss';
import statsIcon from '@betnomi/libs/assets/img/icons/stats.svg';
import refreshIcon from '@betnomi/libs/assets/img/icons/refresh.svg';

interface Props extends ModalComponentProps {
}

export const GameLiveStatsModal: FC<Props> = ({ onCloseModal }) => {
    const { t } = useTranslation('profile');
    const [fieldValue, setFieldValue]: any = useState({ label: t('All'), value: 'All' });

    const onChangeType = useCallback((item: Option<string>) => {
        setFieldValue(item);
    }, [setFieldValue]);

    const optionsStat = [
        { label: t('All'), value: 'All' },
        { label: t('Wager contest'), value: 'Wager contest' },
        { label: t('Bets'), value: 'Bets' },
    ];

    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 1210, },
        { name: 'Page C', uv: 2000, pv: 9800, amt: -590, },
        { name: 'Page D', uv: 2000, pv: 9800, amt: 1100, },
        { name: 'Page E', uv: 2780, pv: 3908, amt: 2500, },
    ];

    const { viewInUSD } = useUser();

    return (
        <HocModal
            title={<span className={styles.headIcon}><img src={statsIcon} alt='stats Icon' />{t('Live Stats')}</span>}
            onClose={onCloseModal}
        >

            <div className={styles.modalContent}>
                <div className={styles.selectWrap}>
                    <Select
                        variants={optionsStat}
                        onChange={onChangeType}
                        value={fieldValue}
                        className={styles.select}
                    />
                    <Button size={44} className={styles.button}>
                        <img src={refreshIcon} alt='refresh Icon' />
                    </Button>
                </div>

                {(fieldValue.value === 'Bets' || fieldValue.value === 'All') && (
                    <div className={styles.betsWrap}>
                        <div className={styles.bets}>
                            <div>
                                <p className={styles.label}>Profit</p>
                                <p className={styles.profit}>
                                    <span> {viewInUSD && (<span>$</span>)} - 0.000000</span>
                                    <Coin coin={CoinType.bitcoin} size={24} />
                                </p>
                            </div>
                            <div>
                                <p className={styles.label}>Wagered</p>
                                <p className={styles.wagered}>
                                    <span> {viewInUSD && (<span>$</span>)} 0.000000</span>
                                    <Coin coin={CoinType.bitcoin} size={24} />
                                </p>
                            </div>
                        </div>

                        <div className={styles.winsWrap}>
                            <div>
                                <span className={styles.label}>Wins</span>
                                <span className={styles.wins}>243</span>
                            </div>
                            <div>
                                <span className={styles.label}>Losses</span>
                                <span className={styles.lose}>492</span>
                            </div>
                        </div>

                        <div  className={styles.chartWrap}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart width={300} height={100} data={data}>
                                    <Line type="monotone" dataKey="amt" stroke="#6AD035FF" strokeWidth={2} />
                                    {/*<Tooltip />*/}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                )}

                {(fieldValue.value === 'Wager contest' || fieldValue.value === 'All') &&
                (<div className={styles.wagerContest}>
                        <p className={styles.label}>$ 1,000,000 - 30 days <FontIcon name={FontIconName.IconArrowBottom}
                                                                                    size={16} /></p>
                        <div className={styles.progressbarWrap}>
                            <p>in 11 days</p>
                            <div className={styles.progressbar}>
                                <span style={{ width: '30%' }}>{''}</span>
                            </div>
                        </div>
                        <div className={styles.bets}>
                            <div>
                                <p className={styles.label}>Prize</p>
                                <p className={styles.profit}>
                                    <span> {viewInUSD && (<span>$</span>)} - 0.000000</span>
                                    <Coin coin={CoinType.bitcoin} size={24} />
                                </p>
                            </div>
                            <div>
                                <p className={styles.label}>Wagered</p>
                                <p className={styles.wagered}>
                                    <span> {viewInUSD && (<span>$</span>)} 0.000000</span>
                                    <Coin coin={CoinType.bitcoin} size={24} />
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </HocModal>
    );
};
