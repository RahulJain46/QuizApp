import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
