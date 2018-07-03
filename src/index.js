import "@dojo/shim/Promise";
import "./config";

import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./components/header";
import { WebMapComponent } from "./components/webmapview";

import "./css/main.scss";

/**
 * React portion of application
 */
ReactDOM.render(
  <div className="main">
    <Header appName="Webpack App"/>
    <WebMapComponent />
  </div>,
  document.getElementById("app")
);