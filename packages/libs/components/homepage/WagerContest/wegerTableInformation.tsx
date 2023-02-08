import React from 'react';
import { useTable, Column, useSortBy } from "react-table";
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import Binance from '@betnomi/libs/assets/img/coins/binancecoin.svg';
import Bitcoin from '@betnomi/libs/assets/img/coins/bitcoin.svg';
import BitcoinCash from '@betnomi/libs/assets/img/coins/bitcoincash.svg';
import Doge from '@betnomi/libs/assets/img/coins/doge.svg';
import Etereum from '@betnomi/libs/assets/img/coins/ethereum.svg';
import Lite from '@betnomi/libs/assets/img/coins/litecoin.svg';
import Ripple from '@betnomi/libs/assets/img/coins/ripple.svg';
import Tether from '@betnomi/libs/assets/img/coins/tether.svg';
import Tron from '@betnomi/libs/assets/img/coins/tron.svg';
import Zcash from '@betnomi/libs/assets/img/coins/zcash.svg';
import Profile1 from '@betnomi/libs/assets/img/profile/avatar1.png';
import Profile2 from '@betnomi/libs/assets/img/profile/avatar2.png';
import Profile3 from '@betnomi/libs/assets/img/profile/avatar3.png';
import Profile4 from '@betnomi/libs/assets/img/profile/avatar4.png';
import Profile5 from '@betnomi/libs/assets/img/profile/avatar5.png';
import styles from './styles.module.scss';

interface IColumnData {
  position: string;
  username: IUsername;
}

interface Data {
  position: string;
  username: IUsername;
  wagered: IBet;
  prize: IPrize;
  // payout:IPayout;
}
interface IPrize {
  amount: number,
  percentage: number,
  coin: string,
}
interface IBet {
  value: number,
  name: string
}

interface IUsername {
  url: string,
  name: string
}

const SelectFooball = (value: string) => {
  switch (value) {
    case "Football": return `${FontIconName.Football}`;
    case "Cricket": return `${FontIconName.Cricket}`;
    case "Handball": return `${FontIconName.Handball}`;
    case "MMA": return `${FontIconName.MMA}`;
    case "Baseball": return `${FontIconName.Baseball}`;
    default: return ''
  }
}

export const columns: Column<Data>[] = [
  {
    Header: "#",
    accessor: "position",
  },
  {
    Header: "Username",
    accessor: "username",
    Cell: ({ value }) => (
      <div className={styles.gmaeFlex}>
        <img className={styles.userProfile} src={value.url} />
        <h3 className={styles.headingUsername}>{value.name}</h3>
      </div>
    )
  },
  {
    Header: "Wagered",
    accessor: "wagered",
    Cell: ({ value }) => (
      <div className={styles.gmaeFlex}>
        <h3 className={styles.headingUsername}>$ {`${value.value}`}</h3>
        <img src={value.name} alt="icon" className={styles.img} />
      </div>
    )
  },
  {
    Header: "Prize",
    accessor: "prize",
    Cell: ({ value }) => (
      <div className={styles.gmaeFlex}>
        <h3 className={value.amount > 0 ? styles.headingBrand : styles.headingButton}>{value.amount} <span className={styles.percentageText}>{`(${value.percentage}%)`}</span></h3>
        <img src={value.coin} alt="icon" className={styles.img} />
      </div>
    )
  },
];

export const data: Data[] = [
  {
    position: "1st",
    username: {
      url: Profile1,
      name: "ashengen"
    },
    wagered: {
      name: BitcoinCash,
      value: 123.21
    },
    prize: {
      amount: 123.21,
      percentage: 50,
      coin: Doge,
    },
  },
  {
    position: "2th",
    username: {
      url: Profile1,
      name: "ashengen"
    },
    wagered: {
      name: Doge,
      value: 123.21
    },
    prize: {
      amount: 123.21,
      percentage: 50,
      coin: Doge,
    },
  },
  {
    position: "3th",
    username: {
      url: Profile1,
      name: "ashengen"
    },
    wagered: {
      name: Bitcoin,
      value: 123.21
    },
    prize: {
      amount: 123.21,
      percentage: 50,
      coin: Doge,
    },
  },
  {
    position: "4th",
    username: {
      url: Profile1,
      name: "ashengen"
    },
    wagered: {
      name: Doge,
      value: 123.21
    },
    prize: {
      amount: 123.21,
      percentage: 50,
      coin: Doge,
    },
  },
  {
    position: "5th",
    username: {
      url: Profile1,
      name: "ashengen"
    },
    wagered: {
      name: Bitcoin,
      value: 123.21
    },
    prize: {
      amount: 123.21,
      percentage: 50,
      coin: Doge,
    },
  },
  {
    position: "6th",
    username: {
      url: Profile1,
      name: "ashengen"
    },
    wagered: {
      name: Bitcoin,
      value: 123.21
    },
    prize: {
      amount: 123.21,
      percentage: 50,
      coin: Doge,
    },
  },
  {
    position: "7th",
    username: {
      url: Profile1,
      name: "ashengen"
    },
    wagered: {
      name: Tron,
      value: 123.21
    },
    prize: {
      amount: 123.21,
      percentage: 50,
      coin: Doge,
    },
  },
];


export const columnsMobile: Column<IColumnData>[] = [
  {
    Header: "#",
    accessor: "position",
  },
  {
    Header: "Username",
    accessor: "username",
    Cell: ({ value }) => (
      <div className={styles.gmaeFlex}>
        <img className={styles.userProfile} src={value.url} />
        <h3 className={styles.headingUsername}>{value.name}</h3>
      </div>
    )
  },
]