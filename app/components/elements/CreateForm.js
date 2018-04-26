import React from "react";
import styled from "styled-components";

import {
  Button,
  PrimaryButton,
  SecondaryButton,
  WarningButton
} from "./Button.js";
import Input from "./Input.js";

const TextArea = styled.textarea`
  display: block;
  width: 48.6em;
  height: 10em;
  background-color: #34495f;
  border-radius: 7px;
  border: 1px solid #ccc;
  color: #ccc;
  padding: 10px;
  &::placeholder {
    color: #ccc;
  }
`;

const CreateFormWrapper = styled.form`
  max-width: 50%;
`;

// HINT: Reusability voor dit soort grote components, met dit soort
// grote hoeveelheid functionaliteit doe je niet zo,
// dat los je vaak op met HOC's (Higher Order Component), of render props
// Inlezen:
// - Higher order functions in JS
// - JS Currying
// - Use render props https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce?gi=a20aab779f98

// HINT: We hebben de event handler verplaatst naar de parent
// Deze child heeft nu geen state meer, en weet enkel van zijn props
// Deze component heeft nu alleen een render functie
// Wat betekent dat je er een Stateless functional component van kan maken (dit is letterlijk een functie)

//HINT: We halen handlePost alvast uit props d.m.v destructuring
const CreateForm = ({ handleSubmit }) => (
  <CreateFormWrapper
    onSubmit={e => {
      e.preventDefault();
      handleSubmit(e);
    }}
    method="POST"
  >
    <Input
      type="text"
      name="title"
      backgroundColor="#34495f"
      borderRadius="7px"
      border="1px solid #ccc"
      fontColor="#ccc"
      placeholder="Title"
      placeholderColor="#ccc"
    />
    <Input
      type="text"
      name="url"
      backgroundColor="#34495f"
      borderRadius="7px"
      border="1px solid #ccc"
      fontColor="#ccc"
      placeholder="URL"
      placeholderColor="#ccc"
    />
    <TextArea name="description" placeholder="Description" />
    <PrimaryButton
      name="submit"
      type="submit"
      fontSize="14px"
      width="39.9em"
      height="2.7em"
      color="#fff"
    >
      Save
    </PrimaryButton>
  </CreateFormWrapper>
);

export default CreateForm;
