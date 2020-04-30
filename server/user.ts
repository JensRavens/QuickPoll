import { Member } from "../common/room";
import { writeDB } from "./store";

export interface User extends Member {
  roomId?: string;
}

export function getUser(id: string): User | undefined {
  return writeDB.table("users").find(id);
}

export function fetchUser(id: string): User {
  let user = getUser(id);
  if (!user) {
    user = { id };
    writeDB.table("users").insert(user);
  }
  return user;
}

export function updateUser(
  id: string,
  changes: { name?: string; vote?: string }
): void {
  writeDB.table("users").update(id, changes);
}
