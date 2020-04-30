import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px -24px;
  justify-content: center;

  > * {
    margin: 0 12px 24px;
  }
`;

interface Props {
  children: React.ReactNode;
}

export function Collection({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}
