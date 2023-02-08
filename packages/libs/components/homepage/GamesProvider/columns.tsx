const SelectFooball = (value) =>{
  switch(value){
    case "Football": return `${FontIconName.Football}`;
    case "Cricket": return  `${FontIconName.Cricket}`;
    case "Handball": return  `${FontIconName.Handball}`;
    case "MMA": return  `${FontIconName.MMA}`;
    case "Baseball": return  `${FontIconName.Baseball}`;
    default: return ''
  }
}

const columns: Column<Data>[] = [
  {
    Header: "Game",
    accessor: "name",
    Cell:(game)=>(
      <div>
        <FontIcon name={SelectFooball(game.value)} size={12} />
        <h3 className={styles.headingFootballer}>{game.value}</h3>
      </div>
    )
  },
  {
    Header: "User",
    accessor: "username",
  },
  {
    Header: "Bet",
    accessor: "bet",
    Cell:({value})=>(
      <div>
        <h3>{value.value}</h3>
        <img src={value.name} alt="icon" className={styles.img} />
      </div>
    )
  },
  {
    Header: "Multiplier",
    accessor: "multiplier"
  },
  {
    Header: "Payout",
    accessor: "payout",
    Cell:({value})=>(
      <div>
        <h3 className={value.value > 0 ? styles.colorBrand: styles.colorButton}>{value.value}</h3>
        <img src={value.name} alt="icon" className={styles.img} />
      </div>
    )
  },
];