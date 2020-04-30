import React from "react";
import { useProfile, updateProfile } from "../model/account";
import { createRoom } from "../model/room";
import { history, roomPath } from "../model/history";
import { VotingAvatar } from "./Avatar";
import { Stack } from "./Stack";
import { Line } from "./Line";
import { Button } from "./Button";
import { TextField } from "./TextField";

export function Lobby(): JSX.Element {
  const profile = useProfile();
  return (
    <Stack>
      <VotingAvatar src={profile.avatarUrl} name={profile.name} />
      <TextField
        label="Your Name"
        value={profile.name}
        onChange={(name) => updateProfile({ name })}
      />
      <TextField
        label="Your Email"
        value={profile.email}
        onChange={(email) => updateProfile({ email })}
      />
      <Line vertical="end">
        <Button
          onClick={async () => {
            const room = await createRoom();
            history.push(roomPath(room));
          }}
          inline
          title="Create a new Poll"
        />
      </Line>
    </Stack>
  );
}
