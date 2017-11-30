'use strict';

import React from 'react';
import ReactDOM from 'react-dom';  

export default class CollectionScreen extends React.Component {
  constructor() {
    super();
  }
  state = { sites: [] };
  componentDidMount(){
      fetch('/sites')
        .then((res) => res.json())
        .then(sites => this.setState({sites}))
  }
  
  _redirectToDetail(siteId){
    this.props.router.push(`/collection/${siteId}`);x
  }

    render() {
        return (
            <collection>

                <h1>sites</h1>
                {this.state.sites.map(site => 
                    <collectionData>
                        {this.props.router.location.query.new == site.id}
                        <h3>{site.url}</h3>
                        <button
                            type='submit'
                            onClick={() => {this._redirectToDetail(site.id)}}
                            color='#fff'
                        >Show</button>
                    </collectionData>
                )}
            </collection>
        );
    }
}