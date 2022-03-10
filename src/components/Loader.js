import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1300,
        height: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        transform: "translate(50%, 50%)"
      }}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Loader;
