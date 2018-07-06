import EsriMap from "esri/Map";
import SceneView from "esri/views/SceneView";
import TileLayer from "esri/layers/TileLayer";
import VectorTileLayer from "esri/layers/VectorTileLayer";
import CompassViewModel from "esri/widgets/Compass/CompassViewModel";

export const webmap = new EsriMap({
  basemap: {
    baseLayers: [
      new TileLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer"
      }),
      new VectorTileLayer({
        portalItem: {
          id: "86d5ed4b6dc741de9dad5f0fbe09ae95"
        }
      })
    ]
  },
  ground: "world-elevation"
});

export const view = new SceneView({
  map: webmap,
  center: [-116.5, 33.80],
  scale: 50000,
  ui: {
    components: ["attribution", "navigation-toggle", "zoom"]
  }
});

export const compassViewModel = new CompassViewModel({ view });

export const init = (container) => {
  view.container = container;
  return view;
};