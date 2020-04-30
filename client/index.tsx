import { hot } from "react-hot-loader/root";
import { logger } from "../common/log";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useData } from "./store";
import "./model/socket";
import { createRoom, updateRoom, joinRoom } from "./model/socket";

const log = logger("boot");
log.info("hello client");
function App(): JSX.Element {
  const rooms = useData((db) => db.table("rooms").all);
  const accountId = useData((db) => db.get("accountId"));
  return (
    <div>
      <h1>Account {accountId}</h1>
      {rooms.map((room) => (
        <div key={room.id}>
          {room.id}:
          <input
            value={room.name ?? ""}
            onChange={(e) => updateRoom({ id: room.id, name: e.target.value })}
          />
          <ul>
            {room.members.map((member) => (
              <li key={member.id}>{member.name ?? member.id}</li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          createRoom();
        }}
      >
        create room
      </button>
      <h2>Join room</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          joinRoom({ id: e.currentTarget.elements.namedItem("id")?.value });
        }}
      >
        <input placeholder="room id" required name="id" />
      </form>
    </div>
  );
}

const HotApp = hot(() => (
  <Router>
    <App />
  </Router>
));
ReactDOM.render(<HotApp />, document.getElementById("app"));
