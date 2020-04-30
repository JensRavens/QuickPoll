import React from "react";
import styled from "styled-components";

const Tag = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  object-fit: cover;
  border-radius: 100%;
  flex: 0 0 38px;
`;

const Container = styled.div<{ size: number }>`
  position: relative;
  min-width: ${(props) => props.size}px;
  max-width: ${(props) => props.size}px;

  &::after {
    display: block;
    content: "";
    padding-bottom: 100%; // make it square
  }
`;

interface Props {
  src?: string;
  size?: "auto" | "vote";
}

const sizes = { vote: 120, auto: 30 };

export function Avatar({ src, size }: Props): JSX.Element {
  const sizeValue = sizes[size ?? "auto"];
  return (
    <Container size={sizeValue}>
      <Tag src={src} />
    </Container>
  );
}

interface VotingAvatarProps extends Props {
  name?: string;
  vote?: string;
  onEdit?: () => void;
}

const VoteContainer = styled.div`
  position: relative;
  padding-bottom: 10px;
  display: inline-block;
  margin: 0 auto;
`;

const Vote = styled.div<{ displayed: boolean }>`
  position: absolute;
  background-color: var(--color-tint);
  right: -10px;
  top: -10px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  border-radius: 100%;
  border: 1px solid var(--color-border);
  transition: transform 0.3s;
  transform: scale(${(props) => (props.displayed ? 1 : 0)});
`;

const NameContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

const Name = styled.div`
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 3px 6px;
`;

export function VotingAvatar({
  src,
  vote,
  name,
}: VotingAvatarProps): JSX.Element {
  return (
    <VoteContainer>
      <Avatar src={src} size="vote" />
      <NameContainer>
        <Name>{name ?? "Anonymous"}</Name>
      </NameContainer>
      <Vote displayed={!!vote}>{vote}</Vote>
    </VoteContainer>
  );
}
