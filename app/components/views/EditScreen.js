import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import styled from "styled-components";

import {
  Button,
  PrimaryButton,
  SecondaryButton,
  WarningButton
} from "../elements/Button.js";
import Input from "../elements/Input.js";

import { editResource } from "../../utils/Api.js";

const TextArea = styled.textarea`
  display: block;
  width: 40.5em;
  height: 10em;
`;

const EditForm = styled.form`
  display: block;
`;

export default class CollectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { site: [] };
  }
  componentDidMount() {
    const site_id = this.props.params.site_id;
    fetch(`/sites/${site_id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ site: data });
      });
  }
  //FIX: HandleChange error fixxen
  //ERROR: 'Cannot convert undefined or null to object'
  _handleChange = e => {
    this.setState({
      sites: [...this.state.sites, e.target.value]
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
      this.props.router.push(`/collection/${data._id}`);
    });
  };

  //FIX: Oplossing verzinnen om createform te hergebruiken met ingeladen content van URL.
  render() {
    return (
      <div>
        <EditForm
          onSubmit={e => {
            e.preventDefault();
            this._handleSubmit(e);
          }}
        >
          <Input
            type="text"
            name="title"
            value={this.state.site.title || ""}
            onChange={e => this._handleChange(e)}
          />
          <Input
            type="text"
            name="url"
            value={this.state.site.url || ""}
            onChange={this._handleChange}
          />
          <TextArea
            name="description"
            value={this.state.site.description || ""}
            onChange={this._handleChange}
          />
          <PrimaryButton
            name="submit"
            type="submit"
            fontSize="16px"
            width="5em"
            height="1.7em"
            color="#fff"
          >
            Save
          </PrimaryButton>
        </EditForm>
      </div>
    );
  }
}
