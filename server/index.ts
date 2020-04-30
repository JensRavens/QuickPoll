import { logger } from "../common/log";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import socket from "socket.io";
import fallback from "express-history-api-fallback";
import { MessageBus } from "../common/MessageBus";
import { createRoom, getRoom, updateRoom, vote, resetVotes } from "./room";
import { Room } from "../common/room";
import { fetchUser } from "./user";
import { writeDB } from "./store";

dotenv.config();

const bootLogger = logger("boot");
const networkLogger = logger("network");

const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socket(server);

function sendRoomUpdate(room: Room): void {
  console.debug("sending update", room);
  io.to(room.id).emit("room-updated", room);
}

io.on("connection", (socket) => {
  const accountId: string = socket.handshake.query.accountId;
  const currentUser = fetchUser(accountId);
  networkLogger.info(`${socket.id} (${accountId}) connected`);
  if (currentUser.roomId) {
    const room = getRoom(currentUser.roomId);
    if (room) {
      socket.join(room.id);
      sendRoomUpdate(room);
    }
  }

  const bus = new MessageBus(socket);
  bus.on("create-room", (payload) => {
    networkLogger.info("creating room", payload);
    const room = createRoom({ ownerId: currentUser.id });
    console.info("full room", room);
    socket.join(room.id);
    currentUser.roomId = room.id;
    return room;
  });
  bus.on("update-room", (payload) => {
    let room = getRoom(payload.id);
    if (room) {
      room = updateRoom(room, { name: payload.name });
      sendRoomUpdate(room);
    }
  });

  bus.on("join-room", (payload) => {
    writeDB.table("users").update(currentUser, { roomId: payload.id });
    const room = getRoom(payload.id);
    if (room) {
      sendRoomUpdate(room);
      currentUser.roomId = room.id;
      socket.join(room.id);
    }
    return room;
  });

  bus.on("update-profile", (payload) => {
    writeDB.table("users").update(currentUser, payload);
    const room = getRoom(currentUser.roomId!);
    if (room) {
      sendRoomUpdate(room);
    }
  });

  bus.on("vote", (payload) => {
    const room = vote({ ...payload, userId: currentUser.id });
    sendRoomUpdate(room);
  });

  bus.on("reset-votes", (payload) => {
    const room = resetVotes(payload);
    sendRoomUpdate(room);
  });

  socket.on("disconnect", () => {
    writeDB.table("users").delete(currentUser);
    const room = getRoom(currentUser.roomId!);
    if (room) {
      sendRoomUpdate(room);
    }
  });
});

const root = `./dist`;
app.use(express.static(root));
app.use(fallback("index.html", { root }));

server.listen(port, () => {
  bootLogger.info(`listening on *:${port}`);
});
