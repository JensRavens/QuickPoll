import React, { useEffect } from "react";
import { useRoom, vote, joinRoom, resetVotes } from "../model/room";
import { useRouteMatch } from "react-router-dom";
import { avatarUrl, useProfile } from "../model/account";
import { VotingAvatar } from "./Avatar";
import { Collection } from "./Collection";
import { VoteBar } from "./VoteBar";
import { Stack } from "./Stack";
import styled from "styled-components";
import { Icon } from "./Icon";

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

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
      {room.owned && (
        <Actions>
          <Icon name="cross" alt="Reset" onClick={() => resetVotes(room)} />
        </Actions>
      )}
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
