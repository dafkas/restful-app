import React from "react";
import styled from "styled-components";

import Colors from "../../styles/Colors";

export const Button = styled.button `
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${props => props.color};
  background-color: #333;
  font-size: ${props => props.fontSize};
  margin: 1em 0em;
  border-radius: 4px;
  border-color: ${Colors.primary};
  display: block;
  margin: ${props => props.margin};
  cursor: pointer;
`;

export const PrimaryButton = Button.extend `
  color: white;
  background: ${Colors.primary};
  &:hover {
    background-color: #80a7a7;
  }
`;

export const SecondaryButton = Button.extend `
  color: white;
  background: ${Colors.secondary};
`;

export const WarningButton = Button.extend `
  color: white;
  background: ${Colors.warning};
  border-color: ${Colors.warning};
`;
