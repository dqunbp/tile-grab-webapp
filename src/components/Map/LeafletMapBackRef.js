/*global L*/
/*eslint no-undef: "error"*/
import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeMethods
} from "react";
import PropTypes from "prop-types";
import { useLeaflet, useDrawControl } from "./hooksNoMerging";

function LeafletMap({ polygon, onSetPolygon }, ref) {
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
    removeLayer: layer => {
      featureGroup.removeLayer(layer);
    }
  }));

  return <div id="map" ref={mapDivEl} />;
}

// LeafletMap.propTypes = {
//   polygon: PropTypes.object,
//   onSetPolygon: PropTypes.func
// };

//eslint-disable-next-line
// LeafletMap = forwardRef(LeafletMap);

export default forwardRef(LeafletMap);
