import React from "react";
import styled from "styled-components";
import { Box } from "./Box";

const Outer = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  flex: 1;
  max-width: 445px;
`;

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props): JSX.Element {
  return (
    <Outer>
      <Inner>
        <Box>{children}</Box>
      </Inner>
    </Outer>
  );
}
