import { hot } from "react-hot-loader/root";
import { logger } from "../common/log";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useData } from "./store";
import "./model/socket";
import {
  createRoom,
  updateRoom,
  joinRoom,
  vote,
  updateProfile,
} from "./model/socket";

const log = logger("boot");
log.info("hello client");
function App(): JSX.Element {
  const [profile, room] = useData((db) => [
    { id: db.get("accountId"), name: db.get("name"), email: db.get("email") },
    db.get("currentRoom"),
  ]);
  useEffect(() => {
    updateProfile({ name: profile.name, email: profile.email });
  }, []);
  return (
    <div>
      <h1>Account {profile.name || profile.id}</h1>
      <div>
        <label>Name</label>
        <input
          value={profile.name ?? ""}
          onChange={(e) => updateProfile({ name: e.target.value })}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          value={profile.email ?? ""}
          onChange={(e) => updateProfile({ email: e.target.value })}
        />
      </div>
      {room && (
        <div key={room.id}>
          {room.id}:
          <input
            value={room.name ?? ""}
            onChange={(e) => updateRoom({ id: room.id, name: e.target.value })}
          />
          {room.options.map((option) => (
            <span key={option} onClick={() => vote(room.id, option)}>
              {option}
            </span>
          ))}
          <span onClick={() => vote(room.id, undefined)}>⨉</span>
          <ul>
            {room.members.map((member) => (
              <li key={member.id}>
                {member.avatarUrl && <img src={member.avatarUrl} />}
                {member.name ?? member.id} - {member.vote}
              </li>
            ))}
          </ul>
        </div>
      )}
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
