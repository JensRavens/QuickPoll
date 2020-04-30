export interface Member {
  id: string;
  name?: string;
  avatarUrl?: string;
}

export interface Room {
  id: string;
  name?: string;
  ownerId: string;
  members: Array<Member>;
}
