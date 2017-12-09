'use strict';
import '../public/sass/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';  
import {Router, Route, browserHistory, Navigation} from 'react-router';


import CollectionScreen from './components/CollectionScreen';
import DetailScreen from './components/DetailScreen';
import LoginScreen from './components/LoginScreen';
//in JSX comment : {*/ comment */}

//routes
 
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={LoginScreen}/>
        <Route path="/collection" component={CollectionScreen}/>
        <Route path="/collection/:site_id" component={DetailScreen}/>
    </Router>
); 