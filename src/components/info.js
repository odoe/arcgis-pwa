import React from "react";

import { Compass } from "./assets/compass";
import { CameraDetails } from "./assets/camera";

export class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: { x: 0, y: 0, z: 0 },
      camera: null
    };
  }

  componentDidMount() {
    import("../data/app")
    .then(app => {
      app.compassViewModel.watch("orientation", orientation => {
        this.setState({ orientation });
      });
      app.view.watch("camera", camera => this.setState({ camera }));
    });
  }

  render() {
    const style = {
      transform: `rotateZ(${this.state.orientation.z}deg)`
    }
    return (
      <div className="info">
        <Compass style={style} />
        <CameraDetails camera={this.state.camera}/>
      </div>
    );
  }
}