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
import Hidden from '@betnomi/libs/assets/img/hidden.svg';
import styles from './styles.module.scss';



interface IColumnData {
  name: string;
  payout:IPayout;
}

interface Data {
  name: string;
  username: string;
  bet:IBet;
  multiplier:number;
  payout:IPayout;
}

interface IBet{
  value:number,
  name:string
}

interface IPayout{
  value:number,
  name:string
}

const SelectFooball = (value:string) =>{
  switch(value){
    case "Football": return `${FontIconName.Football}`;
    case "Cricket": return  `${FontIconName.Cricket}`;
    case "Handball": return  `${FontIconName.Handball}`;
    case "MMA": return  `${FontIconName.MMA}`;
    case "Baseball": return  `${FontIconName.Baseball}`;
    default: return ''
  }
}

export const columns: Column<Data>[] = [
  {
    Header: "Game",
    accessor: "name",
    Cell:(game)=>(
      <div className={styles.gmaeFlex}>
        <FontIcon name={SelectFooball(game.value)} size={12} />
        <h3 className={styles.headingFootballer}>{game.value}</h3>
      </div>
    )
  },
  {
    Header: "User",
    accessor: "username",
    Cell:({value})=>(
      value !=="" ? (<h3 className={styles.headingWhite}>{value}</h3> ):(
        <div className={styles.gmaeFlex}>
        <img src={Hidden} alt="icon" className={styles.imgHidden} />
        <h3 className={styles.headingButton}>Hidden</h3>
      </div>
      )
      
    )
  },
  {
    Header: "Bet",
    accessor: "bet",
    Cell:({value})=>(
      <div className={styles.gmaeFlex}>
        <h3 className={styles.headingButton}>{value.value}</h3>
        <img src={value.name} alt="icon" className={styles.img} />
      </div>
    )
  },
  {
    Header: "Multiplier",
    accessor: "multiplier",
    Cell:({value})=>(
      <h3 className={styles.headingButton}>{`${value}x`}</h3> 
    )
  },
  {
    Header: "Payout",
    accessor: "payout",
    Cell:({value})=>(
      <div className={styles.gmaeFlex}>
        <h3 className={value.value > 0 ? styles.headingBrand: styles.headingButton}>{value.value}</h3>
        <img src={value.name} alt="icon" className={styles.img} />
      </div>
    )
  },
];

export const data: Data[] = [
  {
    name: "Football",
    username: "ashegen",
    bet:{
      name:BitcoinCash,
      value:123.21
    },
    multiplier:2.33,
    payout:{
      name:Doge,
      value:-9.24000023
    },
  },
  {
    name: "Baseball",
    username: "jayveel1987",
    bet:{
      name:Doge,
      value:123.21
    },
    multiplier:4.01,
    payout:{
      name:Doge,
      value:9.24000056
    },
  },
  {
    name: "Cricket",
    username: "bot01",
    bet:{
      name:Bitcoin,
      value:123.21
    },
    multiplier:1.03,
    payout:{
      name:Doge,
      value:9.24000034
    },
  },
  {
    name: "Football",
    username: "",
    bet:{
      name:Doge,
      value:123.21
    },
    multiplier:12.01,
    payout:{
      name:Doge,
      value:9.24000002
    },
  },
  {
    name: "MMA",
    username: "",
    bet:{
      name:Bitcoin,
      value:9.24000003
    },
    multiplier:2.08,
    payout:{
      name:Doge,
      value:9.24000004
    },
  },
  {
    name: "Handball",
    username: "baltoro",
    bet:{
      name:Bitcoin,
      value:9.24000003
    },
    multiplier:6.01,
    payout:{
      name:Doge,
      value:9.24000003
    },
  },
  {
    name: "Football",
    username: "string",
    bet:{
      name:Tron,
      value:123.21
    },
    multiplier:5.09,
    payout:{
      name:Doge,
      value:9.24000009
    },
  },
];

export const columnsMobile: Column<IColumnData>[] = [
  {
    Header: "Game",
    accessor: "name",
    Cell:(game)=>(
      <div className={styles.gmaeFlex}>
        <FontIcon name={SelectFooball(game.value)} size={12} />
        <h3 className={styles.headingFootballer}>{game.value}</h3>
      </div>
    )
  },
  {
    Header: "Payout",
    accessor: "payout",
    Cell:({value})=>(
      <div className={styles.gmaeFlex}>
        <h3 className={value.value > 0 ? styles.headingBrand: styles.headingButton}>{value.value}</h3>
        <img src={value.name} alt="icon" className={styles.img} />
      </div>
    )
  },
]