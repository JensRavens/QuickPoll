export interface Member {
  id: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  vote?: string;
}

export interface BasicRoom {
  id: string;
  name?: string;
  ownerId: string;
}

export interface Room extends BasicRoom {
  members: Array<Member>;
  options: string[];
}
