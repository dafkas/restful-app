'use strict';

import React from 'react';
import ReactDOM from 'react-dom';  

export default class CollectionScreen extends React.Component {
  constructor() {
    super();
  }
  state = {site : []};
  componentDidMount(){
      //const site_id = this.props.router.location.query.siteId;
      console.log(this.props.router.location.query.site.id);
      fetch(`/sites/${site_id}`)
        .then((res) => res.json())
        .then( (site) =>{
            console.log(site);
        })
  }

    render() {
        return (
            <collectionItem>
                <h1>Site name :</h1>
            </collectionItem>
        );
    }
}