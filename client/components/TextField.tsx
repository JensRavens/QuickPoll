import React, { useState } from "react";
import styled from "styled-components";
import { guid } from "redux-database";

interface Props {
  id?: string;
  name?: string;
  value?: string;
  type?: "text" | "password" | "email";
  label?: string;
  placeholder?: string;
  autocomplete?: string;
  onChange?: (value: string) => void;
}

const Input = styled.input`
  border-bottom: 1px solid var(--color-border);
  width: 100%;
  padding: 20px 0 5px;
  border-radius: 0;
`;

const Container = styled.div`
  position: relative;
  flex: 1;
`;

const Label = styled.label`
  position: absolute;
  top: 20px;
  pointer-events: none;
  transition: all 0.4s;
  &.active {
    transform: translateY(-20px);
    font-size: 0.8rem;
  }
`;

export function TextField({
  value,
  name,
  onChange,
  type,
  label,
  autocomplete,
  placeholder,
  id,
}: Props): JSX.Element {
  const [focused, setFocused] = useState(false);
  const fieldId = id ?? guid();
  const active = value || focused;
  return (
    <Container>
      <Label htmlFor={fieldId} className={active ? "active" : undefined}>
        {label}
      </Label>
      <Input
        id={fieldId}
        name={name}
        autoComplete={autocomplete}
        placeholder={placeholder}
        type={type ?? "text"}
        value={value ?? ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => {
          if (!onChange) {
            return;
          }
          onChange(event.currentTarget.value);
        }}
      />
    </Container>
  );
}
