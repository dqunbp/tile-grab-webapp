import React, { useState, useEffect, useRef } from "react";
import LeafletMap from "./LeafletMapBackRef";

export function Map({ polygon, onSetPolygon }) {
  const leafletMap = useRef(null);
  const [polygonLayer, onSetPolygonLayer] = useState(null);
  function _onSetPolygonLayer(layer) {
    onSetPolygon(layer.toGeoJSON());
    onSetPolygonLayer(layer);
  }

  useEffect(
    () => {
      return () => {
        console.log("remove polygon");
        console.log(JSON.stringify(polygon));
        leafletMap.current.removeLayer(polygonLayer);
      };
    },
    [polygonLayer]
  );

  return (
    <LeafletMap
      ref={leafletMap}
      polygon={polygonLayer}
      onSetPolygon={_onSetPolygonLayer}
    />
  );
}

export default Map;
