export enum GameType {
  TrendingGames = 'TrendingGames',
  Slots = 'Slots',
  LiveCasino = 'LiveCasino',
  GameProviders = 'GameProviders',
  Promotions = 'Promotions',
  RecommendedGames = 'RecommendedGames',
}

export const gameNames: Record<GameType, string> = {
  [GameType.TrendingGames]: 'Trending Games',
  [GameType.Slots]: 'Slots',
  [GameType.LiveCasino]: 'Live Casino',
  [GameType.GameProviders]: 'Game Providers',
  [GameType.Promotions]: 'Promotions',
  [GameType.RecommendedGames]: 'Recommended Games',
};
