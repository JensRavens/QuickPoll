import io from "socket.io-client";
import { MessageBus } from "../../common/MessageBus";
import { writeDB } from "../store";
import { omit } from "lodash";

const accountId = writeDB.get("accountId");
export const socket = io({
  query: {
    accountId,
  },
});
export const bus = new MessageBus(socket);

bus.on("room-updated", (room) => {
  writeDB.set("currentRoom", room);
  console.log("updated room", omit(room, "members"));
  console.table(room.members);
});
