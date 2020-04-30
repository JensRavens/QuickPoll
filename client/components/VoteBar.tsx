import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const Option = styled.div<{ selected: boolean }>`
  border: 1px solid var(--color-border);
  background-color: var(--color-background-body);
  height: 60px;
  width: 60px;
  font-size: 35px;
  text-align: center;
  line-height: 60px;
  border-radius: 100%;
  cursor: pointer;
  transform: scale(0.7);
  transition: all 0.3s;

  + * {
    margin-left: 24px;
  }

  ${(props) =>
    props.selected &&
    css`
      transform: none;
      background-color: var(--color-tint);
    `}
`;

interface Props {
  options: string[];
  value?: string;
  onChange: (option: string | undefined) => void;
}

export function VoteBar({ options, value, onChange }: Props): JSX.Element {
  return (
    <Container>
      {options.map((option) => (
        <Option
          key={option}
          selected={option === value}
          onClick={(e) => {
            e.preventDefault();
            onChange(option === value ? undefined : option);
          }}
        >
          {option}
        </Option>
      ))}
    </Container>
  );
}
