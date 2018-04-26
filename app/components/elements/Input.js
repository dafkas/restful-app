"use strict";

import React from "react";
import styled from "styled-components";

import Colors from "../../styles/Colors";

const Input = styled.input`
  width: 24em;
  height: 3em;
  font-size: ${props => props.fontSize};
  margin: 1em 0em;
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  border: ${props => props.border};
  padding-left: 10px;
  color: ${props => props.fontColor};
  &::placeholder {
    color: ${props => props.placeholderColor};
  }
`;

export default Input;
