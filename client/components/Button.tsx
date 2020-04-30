import React, { useState } from "react";
import styled, { css } from "styled-components";
import { IconName, Icon } from "./Icon";

type VoidFunction = () => void;
type AsyncFunction = () => Promise<unknown>;

interface Props {
  title?: string;
  active?: boolean;
  disabled?: boolean;
  inline?: boolean;
  onClick?: VoidFunction | AsyncFunction;
  type?: "primary" | "secondary" | "toolbar";
  icon?: IconName;
  tooltip?: string;
  iconComponent?: React.ReactChild;
}

const ButtonComponent = styled.button<{
  inline?: boolean;
  disabled?: boolean;
  active?: boolean;
  buttonType: Props["type"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: var(--color-button-primary);
  color: var(--color-text-inverted);
  text-transform: uppercase;
  padding: 9px 20px; 
  width: 100%;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: initial;
    `}

  ${(props) =>
    props.inline &&
    css`
      width: auto;
    `}
  
  ${(props) =>
    props.buttonType === "secondary" &&
    css`
      background-color: transparent;
      color: var(--color-button-primary);
      border: 1px solid currentColor;
    `}

  ${(props) =>
    props.buttonType === "toolbar" &&
    css`
      background-color: transparent;
      color: var(--color-text-muted);
      text-transform: none;
      padding: 0;
      &:hover {
        color: var(--color-text);
        background-color: var(--color-background-body);
      }
    `}

  ${(props) =>
    props.active &&
    css`
      color: var(--color-tint) !important;
    `}
`;

const Title = styled.span`
  white-space: nowrap;
  &:not(:first-child) {
    margin-left: 9px;
  }
`;

export function Button({
  title,
  onClick,
  disabled,
  inline,
  active,
  type,
  icon,
  tooltip,
  iconComponent,
}: Props): JSX.Element {
  const [processing, setProcessing] = useState(false);
  return (
    <ButtonComponent
      inline={inline}
      disabled={disabled || processing}
      active={active}
      buttonType={type}
      title={tooltip}
      onClick={(event) => {
        event.preventDefault();
        if (onClick) {
          const value = onClick();
          if (value) {
            setProcessing(true);
            value.finally(() => setProcessing(false));
          }
        }
      }}
    >
      {icon && <Icon name={icon} />}
      {iconComponent}
      {title && <Title>{processing ? "loading" : title}</Title>}
    </ButtonComponent>
  );
}
