export interface Profile {
  id: number,
  username: string,
  avatarUrl: string | null,
  subscribersAmount: number,
  description: string,
  firstName: string,
  lastName: string,
  isActive: boolean,
  teams: string[],
  city: string,
}
