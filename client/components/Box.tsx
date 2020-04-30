import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
  position: relative;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 16px;
  border-radius: 4px;
`;

export function Box({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}
