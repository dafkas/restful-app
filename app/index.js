"use strict";

import "../public/sass/style.scss";
import React from "react";
import { render } from "react-dom";

import { Router, Route, browserHistory, Navigation } from "react-router";

import CollectionScreen from "./components/views/CollectionScreen";
import DetailScreen from "./components/views/DetailScreen";
import EditScreen from "./components/views/EditScreen";

//in JSX comment : {*/ comment */}

//routes
render(
  <Router history={browserHistory}>
    <Route path="/collection" component={CollectionScreen} />
    <Route
      path="/collection/:site_id"
      component={DetailScreen}
      onChange={CollectionScreen}
    />
    <Route path="/collection/edit/:site_id" component={EditScreen} />
  </Router>,
  document.querySelector(".app")
);
