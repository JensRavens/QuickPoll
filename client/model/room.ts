import { useData } from "../store";
import { Room } from "../../common/room";
import { bus } from "./socket";
import { writeDB } from "../store";

interface DetailedRoom extends Room {
  owned: boolean;
}

export function useRoom(): DetailedRoom | null {
  const [room, accountId] = useData((db) => [
    db.get("currentRoom"),
    db.get("accountId"),
  ]);
  if (room) {
    return { ...room, owned: room.ownerId === accountId };
  }
  return null;
}

export async function createRoom(): Promise<Room> {
  const room = await bus.call("create-room", {});
  writeDB.set("currentRoom", room);
  return room;
}

export async function updateRoom({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<void> {
  await bus.call("update-room", { id, name });
}

export async function joinRoom({ id }: { id: string }): Promise<Room> {
  const result = await bus.call("join-room", { id });
  if (!result) {
    throw new Error("Cannot join " + id);
  }
  writeDB.set("currentRoom", result);
  return result;
}

export async function vote(
  roomId: string,
  vote: string | undefined
): Promise<void> {
  await bus.call("vote", { roomId, vote });
}

export async function resetVotes({ id }: { id: string }): Promise<void> {
  await bus.call("reset-votes", { id });
}
