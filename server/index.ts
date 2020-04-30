import { logger } from "../common/log";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import socket from "socket.io";
import morgan from "morgan";
import { MessageBus } from "../common/MessageBus";
import { Room, Member } from "../common/room";
import { guid } from "../common/util";
import faker from "faker";

dotenv.config();

const bootLogger = logger("boot");
const networkLogger = logger("network");

const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socket(server);

interface User {
  profile: Member;
  rooms: Room[];
}

const rooms: { [id: string]: Room } = {};
const users: { [id: string]: User } = {};

function createRoom({ ownerId }: { ownerId: string }): Room {
  const id = guid().substr(0, 5);
  const room = { id, members: [], ownerId };
  rooms[id] = room;
  return room;
}

io.on("connection", (socket) => {
  const accountId: string = socket.handshake.query.accountId;
  if (!users[accountId]) {
    users[accountId] = {
      profile: {
        id: accountId,
        name: `${faker.commerce.color()} ${faker.hacker.noun()}`,
      },
      rooms: [],
    };
  }
  const currentUser = users[accountId];
  networkLogger.info(
    `${socket.id} (${accountId}) connected (has ${currentUser.rooms.length} rooms)`
  );
  const bus = new MessageBus(socket);
  currentUser.rooms.forEach((room) => {
    socket.join(room.id);
    bus.emit("room-updated", room);
  });
  bus.on("create-room", (payload) => {
    networkLogger.info("creating room", payload);
    const room = createRoom({ ownerId: currentUser.profile.id });
    room.members = [currentUser.profile];
    currentUser.rooms.push(room);
    socket.join(room.id);
    return room;
  });
  bus.on("update-room", (payload) => {
    const room = rooms[payload.id];
    if (room) {
      room.name = payload.name;
      io.to(room.id).emit("room-updated", room);
    }
  });

  bus.on("join-room", (payload) => {
    const room = rooms[payload.id];
    if (room) {
      room.members.push(currentUser.profile);
      currentUser.rooms.push(room);
      io.to(room.id).emit("room-updated", room);
      socket.join(room.id);
    }
    return room;
  });
});

app.use(morgan());
app.use(express.static("dist"));

server.listen(port, () => {
  bootLogger.info(`listening on *:${port}`);
});
