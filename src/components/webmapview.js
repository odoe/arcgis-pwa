import React from "react";

export class WebMapComponent extends React.Component {

  componentDidMount() {
    import("../data/app")
    .then(app => {
      const view = app.init(this.mapDiv);
    });
  }

  render() {
    return (
      <div className="webmap"
        ref={
          element => this.mapDiv = element
        }>
      </div>
    );
  }
}