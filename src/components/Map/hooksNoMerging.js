/*global L*/
/*eslint no-undef: "error"*/
import { useState, useEffect, useRef } from "react";

const OSM_TILE_URL = "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

const DEFAULT_LEAFLET_MAP_CONFIG = {
  center: [55.87835875564509, 37.7050219952363],
  zoom: 5,
  layers: [L.tileLayer(OSM_TILE_URL)],
  attributionControl: false
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
    edit: false,
    remove: false
  },
  position: "topright"
};

export function useLeaflet(
  mapNode,
  { mapConfig = DEFAULT_LEAFLET_MAP_CONFIG } = {
    mapConfig: DEFAULT_LEAFLET_MAP_CONFIG
  }
) {
  const [leafletEl, setLeafletEl] = useState(null);
  useEffect(() => {
    console.info("mount leaflet map");
    const leafletMap = L.map(mapNode.current, mapConfig);
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
    featureGroup = DEFAULT_FEATURE_GROUP,
    onDrawCreated = undefined,
    layerOptions = DEFAULT_LAYER_OPTIONS,
    drawControlConfig = DRAW_CONTROL_DEFAULT_CONFIG
  } = {
    featureGroup: DEFAULT_FEATURE_GROUP,
    onDrawCreated: undefined,
    layerOptions: DEFAULT_LAYER_OPTIONS,
    drawControlConfig: DRAW_CONTROL_DEFAULT_CONFIG
  }
) {
  const [fG] = useState(featureGroup);

  const [layerConfig] = useState(layerOptions);

  function getDrawControl() {
    let { edit = {} } = drawControlConfig;
    return new L.Control.Draw({
      ...drawControlConfig,
      edit: {
        ...edit,
        featureGroup: fG
      }
    });
  }

  const [drawControl] = useState(getDrawControl());

  function handleDrawEvent(e) {
    if (onDrawCreated) {
      console.log("draw created event");
      onDrawCreated(e, fG);
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

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
