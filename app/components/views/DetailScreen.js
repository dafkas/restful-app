import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory} from "react-router";
import styled from "styled-components";

import {Button, PrimaryButton, SecondaryButton, WarningButton} from "../elements/Button.js";
import Colors from "../../styles/Colors";
import {deleteResource} from "../../utils/Api.js";

const ButtonsWrapper = styled.div `
  background-color: ${Colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 50px 100px 50px;
`;

const ItemWrapper = styled.div `
  background-color: #efefef;
  width: 70%;
  margin: 0 auto;
  margin-top: -50px;
  padding: 25px;
  box-shadow: 2px 2px 5px 1px gray;
`;

const CollectionDetails = styled.div `
  display: block;
  padding: 10px 25px 10px 25px;
  border-radius: 5px;
  background-color: #f7f7f7;
  margin: 1em 0em;
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
`;

const CollectionTitle = styled.p `
  font-family: "Open sans";
  font-weight: 400;
  font-size: 20px;
  margin-bottom: -15px;
`;

const CollectionUrl = styled.p `
  font-family: "Open sans";
  font-size: 18px;
  border-top: 2px solid #efefef;
  padding-top: 5px;
  color: gray;
  text-description: underline;
`;

const CollectionDescription = styled.p `
  font-family: "Open sans";
  font-size: 16px;
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
        <ButtonsWrapper>
          <PrimaryButton
            name="submit"
            type="submit"
            fontSize="16px"
            width="9em"
            height="3em"
            color="#fff"
            onClick={this._redirectToEdit}>
            Edit
          </PrimaryButton>
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
        </ButtonsWrapper>
        <ItemWrapper>
          <CollectionDetails>
            <CollectionTitle>
              {this.state.site.title}
            </CollectionTitle>
            <CollectionUrl>
              {this.state.site.url}
            </CollectionUrl>
            <CollectionDescription>
              {this.state.site.description}
            </CollectionDescription >
          </CollectionDetails>
        </ItemWrapper>
      </collectionItem>
    )
  }
}