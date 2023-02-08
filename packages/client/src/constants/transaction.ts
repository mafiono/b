export enum TransactionAllStatus {
  AllResults = 'AllResults',
  Pending = 'Pending',
  Completed = 'Completed',
  RolledBack = 'RolledBack',
  Canceled = 'Canceled',
}

export enum TransactionAllType {
  All = 'All',
  Bet = 'Bet',
  Win = 'Win',
  BetAndWin = 'BetAndWin',
  Rollback = 'Rollback', 
  Bonus = 'Bonus',
}

export enum TimeRangeType {
  oneDay = '24',
  twoDay = '48',
  threeDay = '72',
  'custom' = 'custom',
}
