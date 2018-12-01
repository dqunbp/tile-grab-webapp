/*global L*/
/*eslint no-undef: "error"*/
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useLeaflet, useDrawControl } from "./hooksNoMerging";

function LeafletMap({ polygon, onSetPolygon }) {
  const mapDivEl = useRef(null);
  const leafletEl = useLeaflet(mapDivEl);
  const [featureGroup] = useDrawControl(leafletEl, {
    onDrawCreated: function({ layer }, featureGroup) {
      L.Util.setOptions(layer, { interactive: true, fill: true });
      featureGroup.addLayer(layer);
      onSetPolygon(layer);
    }
  });

  useEffect(
    () => {
      return () => {
        console.log("remove polygon");
        featureGroup.removeLayer(polygon);
      };
    },
    [polygon]
  );

  return <div id="map" ref={mapDivEl} />;
}

LeafletMap.propTypes = {
  polygon: PropTypes.object,
  onSetPolygon: PropTypes.func
};

export default LeafletMap;
