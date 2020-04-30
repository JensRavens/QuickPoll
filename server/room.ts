import { writeDB } from "./store";
import { guid } from "../common/util";
import { Room } from "../common/room";
import { updateUser } from "./user";

export function getRoom(id: string): Room | undefined {
  const room = writeDB.table("rooms").find(id);
  if (!room) {
    return;
  }
  console.log("all users", writeDB.table("users").all);
  room.members = writeDB.table("users").where({ roomId: room.id });
  return room;
}

export function createRoom({ ownerId }: { ownerId: string }): Room {
  const id = guid().substr(0, 5);
  const room: Room = {
    id,
    ownerId,
    members: [],
    options: ["👍", "👎", "🤷‍♀️"],
  };
  console.debug("room created", room);
  writeDB.table("rooms").insert(room);
  writeDB.table("users").update(ownerId, { roomId: room.id });
  return getRoom(id)!;
}

export function updateRoom(
  { id }: { id: string },
  changes: Partial<Room>
): Room {
  writeDB.table("rooms").update(id, changes);
  return getRoom(id)!;
}

export function vote({
  roomId,
  userId,
  vote,
}: {
  roomId: string;
  userId: string;
  vote: string;
}): Room {
  updateUser(userId, { vote });
  return getRoom(roomId)!;
}
