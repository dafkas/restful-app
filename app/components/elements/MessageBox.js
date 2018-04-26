import React from "react";
import styled from "styled-components";

import Colors from "../../styles/Colors";

export const MessageBox = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  font-size: ${props => props.fontSize};
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px #b3b3b3;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const DissmissCross = styled.a`
  padding: 10px;
  float: right;
  font-family: "Open sans";
  font-size: 14px;
  cursor: pointer;
`;

export const MessageBoxText = styled.h3`
  font-family: "Open sans";
  font-weight: 500;
  font-size: ${props => props.fontSize};
  color: ${props => props.Color};
  text-align: center;
  height: 30%;
  margin-top: 100px;
`;
