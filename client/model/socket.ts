import io from "socket.io-client";
import { MessageBus } from "../../common/MessageBus";
import { Room } from "../../common/room";
import { writeDB } from "../store";

const accountId = writeDB.get("accountId");
export const socket = io({
  query: {
    accountId,
  },
});
(window as any).socket = socket;
export const bus = new MessageBus(socket);
(window as any).bus = bus;
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

bus.on("room-updated", (room) => {
  console.debug("got update", room);
  writeDB.set("currentRoom", room);
});
