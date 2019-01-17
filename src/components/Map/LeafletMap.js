/*global L*/
/*eslint no-undef: "error"*/
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback
} from "react";

import { TasksContext } from "../App";
import { setPolygon, setGeoJson } from "../../reducer";
import { useLeaflet, useDrawControl } from "./hooks";
import { useDndFileReader } from "../../hooks";

function LeafletMap() {
  const mapDivEl = useRef(null);
  const leafletEl = useLeaflet(mapDivEl);

  const { dispatch, polygon, geoJson } = useContext(TasksContext);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [drawedLayer, setDrawedLayer] = useState(null);
  const [geoJsonLayer, setGeoJsonLayer] = useState(null);

  const onSelectLayer = useCallback(layer => {
    highlightLayer(layer);
    setSelectedLayer(layer);
    dispatch(setPolygon(layer.toGeoJSON()));
  });

  const highlightLayer = useCallback(
    layer => layer.setStyle({ color: "#ff0000" }),
    []
  );
  const unhighlightLayer = useCallback(
    layer => layer.setStyle({ color: "#3388ff" }),
    []
  );

  const onDrawCreated = useCallback(({ layer }, featureGroup) => {
    layer.setStyle({ interactive: false, fill: true });
    featureGroup.addLayer(layer);
    setDrawedLayer(layer);
  }, []);
  const [featureGroup, addLayer, removeLayer] = useDrawControl(leafletEl, {
    onDrawCreated
  });

  const onEachFeature = useCallback((_, layer) => {
    layer.on("click", () => onSelectLayer(layer));
  }, []);

  useDndFileReader(mapDivEl, data => {
    let layer;
    try {
      layer = L.geoJSON(data, { onEachFeature });
      addLayer(layer);
      leafletEl.fitBounds(featureGroup.getBounds());
    } catch (error) {
      console.error(error);
      alert("Error while GeoJson parsing!");
    }
    dispatch(setGeoJson(data));
    setGeoJsonLayer(layer);
    setSelectedLayer(null);
  });

  // autoselect drawed layers
  useEffect(
    () => {
      drawedLayer && onSelectLayer(drawedLayer);
    },
    [drawedLayer]
  );

  // clear selectedLayer if polygon removed from store
  useEffect(
    () => {
      if (!polygon && selectedLayer) {
        setSelectedLayer(null);
      }
    },
    [polygon]
  );
  // clear geoJsonLayer if geoJson removed from store
  useEffect(
    () => {
      if (!geoJson && geoJsonLayer) {
        setGeoJsonLayer(null);
      }
    },
    [geoJson]
  );

  // replace selectedLayer if new added
  useEffect(
    () => {
      return () => {
        if (selectedLayer) {
          unhighlightLayer(selectedLayer);
          removeLayer(selectedLayer);
        }
      };
    },
    [selectedLayer]
  );
  useEffect(
    () => {
      // geoJsonLayer
      return () => {
        if (geoJsonLayer) {
          removeLayer(geoJsonLayer);
        }
      };
    },
    [geoJsonLayer]
  );

  return <div id="map" ref={mapDivEl} />;
}

export default LeafletMap;
