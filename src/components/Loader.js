import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = () => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Loader;
