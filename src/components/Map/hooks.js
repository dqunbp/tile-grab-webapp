import { useState, useEffect } from "react";

/*global L*/
/*eslint no-undef: "error"*/

const OSM_TILE_URL = "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

const DEFAULT_LEAFLET_MAP_CONFIG = {
  center: [55.87835875564509, 37.7050219952363],
  zoom: 5,
  layers: [L.tileLayer(OSM_TILE_URL)]
};

const DEFAULT_FEATURE_GROUP = new L.FeatureGroup();

const DEFAULT_LAYER_OPTIONS = { interactive: true, fill: true };

const DRAW_CONTROL_DEFAULT_CONFIG = {
  draw: {
    rectangle: false,
    polygon: {
      icon: new L.DivIcon({
        iconSize: new L.Point(7, 7),
        className: "point"
      }),
      allowIntersection: false
    },
    polyline: false,
    circle: false,
    marker: false,
    circlemarker: false
  },
  edit: {
    featureGroup: DEFAULT_FEATURE_GROUP,
    edit: false,
    remove: false
  },
  position: "topright"
};

export function useLeaflet(
  mapNode,
  { mapConfig = {} } = {
    mapConfig: {}
  }
) {
  const [leafletEl, setLeafletEl] = useState(null);
  useEffect(() => {
    console.info("mount leaflet map");
    const leafletMap = L.map(mapNode.current, {
      ...DEFAULT_LEAFLET_MAP_CONFIG,
      ...mapConfig
    });
    setLeafletEl(leafletMap);
    return () => {
      console.info("umount leaflet map");
      leafletMap.remove();
    };
  }, []);
  return leafletEl;
}

export function useDrawControl(
  leafletEl,
  {
    featureGroup = undefined,
    onDrawCreated = undefined,
    layerOptions = {},
    drawControlConfig = {}
  } = {
    featureGroup: undefined,
    onDrawCreated: undefined,
    layerOptions: {},
    drawControlConfig: {}
  }
) {
  const [fG, setFg] = useState(DEFAULT_FEATURE_GROUP);

  function getDrawControl() {
    let { edit = {} } = drawControlConfig;
    let { featureGroup: drawControlFeatureGroup } = edit;
    let mergedEdit = featureGroup
      ? (() => {
          // if featureGroup group defined -> we always use it
          setFg(featureGroup);
          return {
            ...edit,
            featureGroup
          };
        })()
      : drawControlFeatureGroup
      ? (() => {
          // esle if featureGroup defined in drawControlConfig -> use it
          setFg(drawControlFeatureGroup);
          return edit;
        })()
      : {}; // else if featureGroup is defined nowhere -> use default edit section it will be merged in return statement
    return new L.Control.Draw({
      ...DRAW_CONTROL_DEFAULT_CONFIG,
      ...drawControlConfig,
      ...mergedEdit
    });
  }

  const [layerConfig] = useState({
    ...DEFAULT_LAYER_OPTIONS,
    ...layerOptions
  });

  const [drawControl] = useState(getDrawControl());

  function handleDrawEvent(e) {
    if (onDrawCreated) {
      console.log("draw created event");
      onDrawCreated(e);
    } else {
      L.Util.setOptions(e.layer, layerConfig);
      fG.addLayer(e.layer);
    }
  }

  useEffect(
    () => {
      if (leafletEl) {
        leafletEl.addControl(drawControl);
        fG.addTo(leafletEl);
        console.log("setup map draw events");
        leafletEl.on(L.Draw.Event.CREATED, handleDrawEvent);
      }
    },
    [leafletEl]
  );

  return [fG, drawControl];
}
