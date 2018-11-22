import React, { useState, useEffect, useRef } from "react";
import "./LeafletMap.css";

/*global L*/
/*eslint no-undef: "error"*/

const osmTileUrl = "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

function LeafletMap({ polygon, onSetPolygon }) {
  const mapDivEl = useRef(null);
  const [leafletEl, setLeafletEl] = useState(null);

  const [featureGroup] = useState(new L.FeatureGroup());
  const [drawControl] = useState(
    new L.Control.Draw({
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
      edit: false,
      position: "topright"
    })
  );

  const onNewPolygon = ({ layer: polygonLayer }) => {
    L.Util.setOptions(polygonLayer, { interactive: true, fill: false });
    onSetPolygon(polygonLayer);
  };

  useEffect(() => {
    console.info("mount leaflet map");
    const leafletMap = L.map(mapDivEl.current, {
      center: [55.87835875564509, 37.7050219952363],
      zoom: 5,
      layers: [L.tileLayer(osmTileUrl)]
    });
    setLeafletEl(leafletMap);
    return () => {
      console.info("umount leaflet map");
      leafletMap.remove();
    };
  }, []);

  useEffect(
    () => {
      if (leafletEl) {
        leafletEl.addControl(drawControl);
        featureGroup.addTo(leafletEl);
        console.log("setup map draw events");
        leafletEl.on(L.Draw.Event.CREATED, onNewPolygon);
      }
    },
    [leafletEl]
  );

  useEffect(
    () => {
      if (polygon) {
        featureGroup.addLayer(polygon);
      }
      return () => featureGroup.removeLayer(polygon);
    },
    [polygon]
  );

  return <div id="map" ref={mapDivEl} />;
}

export default LeafletMap;
