import React, { Fragment } from "react";
import loading from "../assets/animation/loading.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={loading}
      style={{ width: "26px", margin: "0 2.1rem", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
