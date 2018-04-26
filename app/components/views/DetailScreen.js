import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory} from "react-router";

import {Button, PrimaryButton, SecondaryButton, WarningButton} from "../elements/Button.js";
import {deleteResource} from "../../utils/Api.js";

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
        this.setState({site: data});
      });
  }
  //FIX: Print error message
  _handleDelete = e => {
    e.preventDefault();
    const siteId = this.props.params.site_id;
    deleteResource(siteId).then(res => {});
    this
      .props
      .router
      .push({
        pathname: "/collection",
        state: {
          message: "deleted"
        }
      });
  };

  _redirectToEdit = e => {
    e.preventDefault();
    const siteId = this.props.params.site_id;
    this
      .props
      .router
      .push(`/collection/edit/${siteId}`);
  };

  render() {
    return (
      <collectionItem>
        <collectionDetails>
          <h3>{this.state.site.title}</h3>
          <h3>{this.state.site.url}</h3>
          <h3>{this.state.site.description}</h3>
        </collectionDetails>
        <SecondaryButton
          name="submit"
          type="submit"
          fontSize="16px"
          width="9em"
          height="3em"
          color="#fff"
          onClick={this._redirectToEdit}>
          Edit
        </SecondaryButton>
        <WarningButton
          name="submit"
          type="submit"
          fontSize="16px"
          width="9em"
          height="3em"
          color="#fff"
          onClick={this._handleDelete}>
          Delete
        </WarningButton>
      </collectionItem>
    );
  }
}
