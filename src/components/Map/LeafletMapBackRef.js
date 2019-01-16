/*global L*/
/*eslint no-undef: "error"*/
import React, { forwardRef, useRef, useImperativeMethods } from "react";
import { useLeaflet, useDrawControl } from "./hooks";

function LeafletMap({ onSetPolygon }, ref) {
  const mapDivEl = useRef(null);
  const leafletEl = useLeaflet(mapDivEl);
  const [featureGroup] = useDrawControl(leafletEl, {
    onDrawCreated: function({ layer }, featureGroup) {
      L.Util.setOptions(layer, { interactive: true, fill: true });
      featureGroup.addLayer(layer);
      onSetPolygon(layer);
    }
  });

  useImperativeMethods(ref, () => ({
    mapDivRef: mapDivEl,
    removeLayer: layer => {
      featureGroup.removeLayer(layer);
    },
    addLayer: layer => {
      featureGroup.addLayer(layer);
    }
  }));

  return <div id="map" ref={mapDivEl} />;
}

export default forwardRef(LeafletMap);
