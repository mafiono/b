export interface CentrifugeMessage {
  id: string
  room: string
  sender_nickname: string
  text: string
  file_name: string
  created_at: number
}
