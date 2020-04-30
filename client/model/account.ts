import md5 from "md5";
import { useData, writeDB } from "../store";
import { bus } from "./socket";

export function avatarUrl(email?: string): string {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}?d=mm&s=180`;
}

interface Account {
  id: string;
  name?: string;
  email?: string;
  avatarUrl: string;
}

export function useProfile(): Account {
  return useData((db) => {
    const id = db.get("accountId");
    const email = db.get("email");
    return {
      id,
      name: db.get("name"),
      email,
      avatarUrl: avatarUrl(email ?? id),
    };
  });
}

export async function updateProfile(changes: {
  name?: string;
  email?: string;
}): Promise<void> {
  await bus.call("update-profile", changes);
  if (changes.name !== undefined) {
    writeDB.set("name", changes.name);
  }
  if (changes.email !== undefined) {
    writeDB.set("email", changes.email);
  }
}
