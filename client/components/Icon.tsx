import React from "react";
import styled, { css } from "styled-components";

export type IconName =
  | "trash"
  | "edit"
  | "cross"
  | "lock"
  | "comment"
  | "heart"
  | "link"
  | "more"
  | "calendar"
  | "attachment"
  | "reminder"
  | "return"
  | "image";

export interface Props {
  name: IconName;
  badge?: string | number;
  alt?: string;
  color?: string;
  onClick?: () => void;
}

const icons = {};
// tslint:disable-next-line
const files = require["context"]("!raw-loader!../assets/icons/", true);
files.keys().forEach((key: string) => {
  const name = key.match(/^\.\/(.+)\.[sp][vn][g]$/);
  if (name) {
    icons[name[1]] = files(key).default.replace(
      /#[0-9A-Z]{6}/g,
      "currentColor"
    );
  }
});

const Container = styled.div<{ color?: string; interactive: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  cursor: ${(props) => (props.interactive ? "pointer" : "auto")};
  height: 24px;
  width: 24px;
  position: relative;
  ${(props) =>
    props.color
      ? css`
          color: ${props.color};
        `
      : ""}
`;

const Badge = styled.span`
  background-color: var(--color-tint);
  color: var(--color-text-inverted);
  padding: 3px 4px 2px;
  font-size: 0.7rem;
  line-height: 1;
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: 0;
`;
const SVG = styled.div``;

export function Icon({ name, badge, onClick, alt, color }: Props): JSX.Element {
  return (
    <Container
      onClick={(event) => {
        if (onClick) {
          event.preventDefault();
          event.stopPropagation();
          onClick();
        }
      }}
      interactive={!!onClick}
      title={alt}
      color={color}
    >
      <SVG
        dangerouslySetInnerHTML={{
          __html: icons[name],
        }}
      />
      {badge !== undefined && badge !== 0 && <Badge>{badge}</Badge>}
    </Container>
  );
}
