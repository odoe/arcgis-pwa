import FeatureLayer from "esri/layers/FeatureLayer";
import WebMap from "esri/WebMap";
import SceneView from "esri/views/SceneView";

const featureLayer = new FeatureLayer({
  id: "states",
  portalItem: {
    id: "b234a118ab6b4c91908a1cf677941702"
  },
  outFields: ["NAME", "STATE_NAME", "VACANT", "HSE_UNITS"],
  title: "U.S. counties"
});

const webmap = new WebMap({
  portalItem: {
    id: "3ff64504498c4e9581a7a754412b6a9e"
  },
  layers: [featureLayer]
});

export const init = (container) => {
  const view = new SceneView({
    map: webmap,
    container
  });
  featureLayer.when(() => {
    view.goTo({ target: featureLayer.fullExtent });
  });

  return view;
};