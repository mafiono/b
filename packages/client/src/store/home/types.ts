export interface Game {
  background: string
  blocked_currencies: string[]
  categories: string[]
  description: string
  front_game_id: string
  icon_2: string
  icon_3?: string
  id: string
  name: string
}

export interface HomeGamesResponse {
  games: Game[],
  status: string,
  total_count: string,
}
