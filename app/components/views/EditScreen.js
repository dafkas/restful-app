import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import styled from "styled-components";

import { Button, PrimaryButton, SecondaryButton, WarningButton } from "../elements/Button.js";
import Colors from "../../styles/Colors";
import Input from "../elements/Input.js";

import { editResource } from "../../utils/Api.js";

const CreateFormWrapper = styled.div`
  background-color: ${Colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 50px 100px 50px;
`;

const EditForm = styled.form`
  display: block;
`;

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


export default class CollectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site: []
    };
  }
  componentDidMount() {
    const site_id = this.props.params.site_id;
    fetch(`/sites/${site_id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ site: data });
      });
  }
  // FIX: HandleChange error fixxen ERROR: 'Cannot convert undefined or null to
  // object'
  _handleChange = e => {
    this.setState({
      sites: [
        ...this.state.sites,
        e.target.value
      ]
    });
  };

  _handleSubmit = e => {
    const id = this.props.params.site_id;
    const { title, url, description } = e.target;
    const data = {
      _id: id,
      title: title.value,
      url: url.value,
      description: description.value
    };
    editResource(data).then(res => {
      this
        .props
        .router
        .push(`/collection/${data._id}`);
    });
  };

  // FIX: Oplossing verzinnen om createform te hergebruiken met ingeladen content
  // van URL.
  render() {
    return (
      <CreateFormWrapper>
        <EditForm
          onSubmit={e => {
            e.preventDefault();
            this._handleSubmit(e);
          }}>
          <Input
            type="text"
            name="title"
            backgroundColor="#34495f"
            borderRadius="7px"
            border="1px solid #ccc"
            fontColor="#ccc"
            placeholder="Title"
            placeholderColor="#ccc"
            value={this.state.site.title || ""}
            onChange=
            {e => this._handleChange(e)} />
          <Input
            type="text"
            name="url"
            backgroundColor="#34495f"
            borderRadius="7px"
            border="1px solid #ccc"
            fontColor="#ccc"
            placeholder="Title"
            placeholderColor="#ccc"
            value={this.state.site.url || ""}
            onChange={this._handleChange} />
          <TextArea
            name="description"
            placeholder="Description"
            value={this.state.site.description || ""}
            onChange={this._handleChange} />
          <PrimaryButton
            name="submit"
            type="submit"
            fontSize="14px"
            width="39.9em"
            height="2.7em"
            color="#fff">
            Save
          </PrimaryButton>
        </EditForm>
      </CreateFormWrapper>
    )
  }
}
