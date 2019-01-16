/*global L*/
/*eslint no-undef: "error"*/
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
import { useDndFileReader } from "../../hooks";

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

  const [dragover, dndError] = useDndFileReader(
    leafletMap.current ? leafletMap.current.mapDivRef : leafletMap,
    data => {
      console.log(data);
      try {
        let layer = L.geoJSON(data);
        leafletMap.current.addLayer(layer);
        _onSetPolygonLayer(layer);
      } catch (error) {
        alert("Invalid file!");
      }
      // let layer = L.geoJSON(data);
    }
  );

  useEffect(() => dndError && alert("Error while file parsing!"), [dndError]);

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
        polygonLayer && leafletMap.current.removeLayer(polygonLayer);
      };
    },
    [polygonLayer]
  );

  return <LeafletMap ref={leafletMap} onSetPolygon={_onSetPolygonLayer} />;
}

export default Map;
