import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import {
  Button,
  PrimaryButton,
  SecondaryButton,
  WarningButton
} from "../elements/Button.js";

import Colors from "../../styles/Colors";

import Input from "../elements/Input.js";
import { createResource } from "../../utils/Api";

import CreateForm from "../elements/CreateForm.js";
import {
  MessageBox,
  DissmissCross,
  MessageBoxText
} from "../elements/MessageBox.js";

const CreateFormWrapper = styled.div`
  background-color: ${Colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 50px 100px 50px;
`;

const Collection = styled.div`
  background-color: #efefef;
  width: 70%;
  margin: 0 auto;
  margin-top: -50px;
  padding: 25px;
  box-shadow: 2px 2px 5px 1px gray;
`;

const CollectionData = styled.div`
  /* width: calc(50% - 50px); */
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

const CollectionTitle = styled.p`
  font-family: "Open sans";
  font-weight: 400;
  font-size: 20px;
  margin-bottom: -15px;
`;

const CollectionUrl = styled.p`
  font-family: "Open sans";
  font-size: 18px;
  border-top: 2px solid #efefef;
  padding-top: 5px;
  color: gray;
  text-description: underline;
`;

const CollectionDescription = styled.p`
  font-family: "Open sans";
  font-size: 16px;
`;

const Link = styled.a`
  color: red;
`;

const PaginationWrapper = styled.div`
  display: block;
`;

const PaginationNumber = styled.a`
  font-size: 18px;
  border: 1px solid #c1c1c1;
  padding: 2px 10px 2px 10px;
  margin-left: 3px;
  color: ${Colors.primary};
  text-decoration: none;
  font-family: "Open sans";
  &:hover {
    color: #fff;
    background-color: ${Colors.primary};
    text-decoration: underline;
  }
`;

export default class CollectionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      sites: [],
      message: "",
      pagination: [],
      _links: [],
      currentPage: 1
    };
  }
  componentDidMount(key) {
    fetch(`/sites?limit=${5}?start=${1}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          sites: data.items,
          pagination: data.pagination,
          _links: data.pagination._links
        });
      });
  }

  _redirectToDetail = siteId => {
    console.log(siteId);
    this.props.router.push(`/collection/${siteId}`);
  };

  _updateLocalState(message, data) {
    // HINT: Data = immutable, kloon het eerst en voeg het eraan toe
    // Je zou dat zo kunnen doen:
    // const currentStateSites = this.state.sites;
    // this.state.sites.push(data);
    // this.setState({sites: currentStateSites});

    // HINT: Maar het is beter om het zo te doen, met een Spread operator, in dit geval voor Array,
    // je hebt ook Object spread operators
    console.log(this.state.pagination);
    if (this.state.currentPage == this.state.pagination.totalPages) {
      this.setState({
        sites: [...this.state.sites, data],
        message: message
      });
    } else {
      this.setState({ message: message });
    }
  }

  handlePost = e => {
    const { title, url, description } = e.target;
    const data = {
      title: title.value,
      url: url.value,
      description: description.value
    };
    createResource(data).then(res => {
      //FIX: Andere oplossing bedenken om id te pakken, niet uit http location header.
      data._id = res.headers.get("Location");
      this._updateLocalState("Successfully created a new resource", data);
    });
    e.target.reset();
  };

  _handlePageSwitch = (number, e) => {
    e.preventDefault();
    fetch(`/sites?limit=${5}&start=${number}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          sites: data.items,
          pagination: data.pagination,
          _links: data.pagination._links,
          currentPage: number
        });
      });
  };

  _showMessageBox = () => {
    if (this.state.message !== "") {
      return (
        <MessageBox width="350px" height="250px" backgroundColor="#f7f7f7">
          <DissmissCross onClick={e => this._dismissMessageBox(e)}>
            x
          </DissmissCross>
          <MessageBoxText fontSize="14px;">{this.state.message}</MessageBoxText>
          <PrimaryButton
            name="submit"
            type="submit"
            fontSize="14px"
            width="8em"
            height="2.7em"
            color="#fff"
            margin="auto"
            onClick={e => this._dismissMessageBox(e)}
          >
            Close
          </PrimaryButton>
        </MessageBox>
      );
    }
  };

  _dismissMessageBox = e => {
    e.preventDefault();
    this.setState({
      message: ""
    });
  };

  render() {
    const _renderPagination = links => {
      const paginationData = {
        first: this.state.pagination._links.first,
        last: this.state.pagination._links.last,
        next: this.state.pagination._links.next,
        prev: this.state.pagination._links.previous
      };
      const numbers = [];
      for (
        let i = paginationData.first.page;
        i <= paginationData.last.page;
        i++
      ) {
        numbers.push(i);
      }
      return numbers.map(num => {
        return (
          <PaginationNumber
            key={num}
            onClick={e => this._handlePageSwitch(num, e)}
            href="#"
          >
            {num}
          </PaginationNumber>
        );
      });
    };

    if (this.state.pagination._links == undefined) return null;
    return (
      <div>
        {this._showMessageBox()}
        <CreateFormWrapper key="CreateFormWrapper">
          <CreateForm key="CreateForm" handleSubmit={this.handlePost} />
        </CreateFormWrapper>
        <Collection key="collection">
          {this.state.sites.map((site, key) => (
            <CollectionData
              id={site._id}
              key={key}
              onClick={() => {
                this._redirectToDetail(site._id);
              }}
            >
              <CollectionTitle>{site.title}</CollectionTitle>

              <CollectionDescription>
                {site.description}...
              </CollectionDescription>
              <CollectionUrl>{site.url}</CollectionUrl>
            </CollectionData>
          ))}
          <PaginationWrapper>
            {_renderPagination(this.state.pagination._links)}
          </PaginationWrapper>
        </Collection>
      </div>
    );
  }
}
