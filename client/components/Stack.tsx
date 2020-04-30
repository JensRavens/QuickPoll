import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const StackElement = styled.div`
  display: grid;
  gap: 16px;
  position: relative;
  grid-template-columns: minmax(0, 1fr);
`;

export function Stack({ children }: Props): JSX.Element {
  return <StackElement>{children}</StackElement>;
}
