import React from "react";

const CSS = {
  base: "camera_details"
};

export const CameraDetails = (props) => (
  <div className={CSS.base}>
    <section>
      <span>FOV: { props.camera ? props.camera.fov : 0 }</span>
      <br />
      <span>HDG: { props.camera ? props.camera.heading.toFixed(3) : 0 }</span>
      <br />
      <span>TILT: { props.camera ? props.camera.tilt.toFixed(3) : 0 }</span>
    </section>
  </div>
);