import React from "react";
import styled, { css } from "styled-components";

interface Props {
  children: React.ReactNode;
  horizontal?: "top" | "center" | "bottom";
  vertical?: "start" | "center" | "end";
  gap?: "none" | "xsmall" | "small" | "regular";
}

const Container = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  > * {
    ${(props) =>
      css`
        margin-left: ${props.gap}px;
      `}
    &:first-child {
      margin-left: 0;
    }
  }
`;

export function Line({
  children,
  horizontal,
  vertical,
  gap,
}: Props): JSX.Element {
  const alignItems = horizontal
    ? { top: "flex-start", center: "center", bottom: "flex-end" }[horizontal]
    : "center";
  const justifyContent = vertical
    ? { start: "flex-start", center: "center", end: "flex-end" }[vertical]
    : "flex-start";
  const gapNumber = gap
    ? { none: 0, xsmall: 8, small: 16, regular: 30 }[gap]
    : 30;
  return (
    <Container style={{ alignItems, justifyContent }} gap={gapNumber}>
      {children}
    </Container>
  );
}

interface SpacerProps {
  width?: number;
}

export function Spacer({ width }: SpacerProps): JSX.Element {
  const style = { flex: "1" };
  if (width !== undefined) {
    style["flex"] = `0 0 ${width}px`;
  }
  return <div style={style} />;
}
