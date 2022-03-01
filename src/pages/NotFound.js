import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/animation/404.json";
const NotFound = () => {
  const container = useRef(null);
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });
    return () => anim.destroy();
  }, []);
  return (
    <>
      <div
        style={{
          backgroundColor: " black",
          height: "100vh",
          position: "fixed",
          overflow: "hidden"
        }}
        ref={container}></div>
      <div
        style={{
          color: "white",
          position: "fixed",
          width: "100%",
          height: "100%",
          textAlign: "center",
          marginTop: "20%",
          scale: "13"
        }}>
        <center>
          <h2>404</h2>
          <br />
          <h1>Page Not Found</h1>
        </center>
      </div>
    </>
  );
};

export default NotFound;
