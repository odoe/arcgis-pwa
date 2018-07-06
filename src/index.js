import "@dojo/shim/Promise";
import "./config";

import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./components/header";
import { WebMapComponent } from "./components/webmapview";
import { Info } from "./components/info";

import "./css/main.scss";

/**
 * React portion of application
 */
ReactDOM.render(
  <div className="main">
    <Header appName="Demo App"/>
    <WebMapComponent />
    <Info />
  </div>,
  document.getElementById("app")
);