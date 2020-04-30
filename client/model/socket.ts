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
  writeDB.table("rooms").upsert(room);
  return room;
}
(window as any).cr = createRoom;

export async function updateRoom({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<void> {
  const result = await bus.call("update-room", { id, name });
  return result;
}
(window as any).ur = updateRoom;

export async function joinRoom({ id }: { id: string }): Promise<Room> {
  const result = await bus.call("join-room", { id });
  if (!result) {
    throw new Error("Cannot join " + id);
  }
  writeDB.table("rooms").upsert(result);
  return result;
}
(window as any).jr = joinRoom;

bus.on("room-updated", (room) => {
  writeDB.table("rooms").upsert(room);
});
