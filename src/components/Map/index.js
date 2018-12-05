import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext
} from "react";

import LeafletMap from "./LeafletMapBackRef";
import { TasksContext } from "../App";
import { setPolygon } from "../../reducer";

export function Map() {
  const { dispatch, polygon } = useContext(TasksContext);
  const leafletMap = useRef(null);
  const [polygonLayer, setPolygonLayer] = useState(null);

  const _onSetPolygonLayer = useCallback(
    layer => {
      setPolygonLayer(layer);
      let geoJSON = layer.toGeoJSON();
      dispatch(setPolygon(geoJSON));
    },
    [polygonLayer]
  );

  // remove polygon if it removed from store
  useEffect(
    () => {
      if (!polygon && polygonLayer) {
        polygonLayer && setPolygonLayer(null);
      }
    },
    [polygon]
  );

  // replace polygon if new added
  useEffect(
    () => {
      return () => {
        console.log("remove polygon");
        polygonLayer && leafletMap.current.removeLayer(polygonLayer);
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
