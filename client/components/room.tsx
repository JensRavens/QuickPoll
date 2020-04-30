import React, { useEffect } from "react";
import { useRoom, vote, joinRoom } from "../model/room";
import { useRouteMatch } from "react-router-dom";
import { avatarUrl, useProfile } from "../model/account";
import { VotingAvatar } from "./Avatar";
import { Collection } from "./Collection";
import { VoteBar } from "./VoteBar";
import { Stack } from "./Stack";

export function RoomPage(): JSX.Element {
  const id = useRouteMatch<{ id: string }>().params.id;
  const profile = useProfile();
  const room = useRoom();
  useEffect(() => {
    if (!room && id) {
      joinRoom({ id });
    }
  }, [id]);
  if (!room) {
    return <div>joining...</div>;
  }
  return (
    <Stack>
      <Collection>
        {room.members.map((member) => (
          <VotingAvatar
            key={member.id}
            src={avatarUrl(member.email ?? member.id)}
            name={member.name}
            vote={member.vote}
          />
        ))}
      </Collection>
      <VoteBar
        options={room.options}
        value={room.members.find((e) => e.id === profile.id)?.vote}
        onChange={(val) => vote(room.id, val)}
      />
    </Stack>
  );
}
