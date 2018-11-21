import React, { forwardRef, useState, useEffect, useRef } from 'react'
import './LeafletMap.css'

// const osmTileUrl = 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
const osmTileUrl = 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga'

function LeafletMap(props, ref) {

  const mapDivEl = useRef(null)
  const [leafletEl, setLeafletEl] = useState(null)

  const [featureGroup, setFeatureGroup] = useState(new L.FeatureGroup()) // eslint-disable-line
  const [drawControl, setDrawControl] = useState(new L.Control.Draw({ // eslint-disable-line
    draw: {
      rectangle: false,
      polygon: {
        // icon: new L.DivIcon({ // eslint-disable-line
        //   iconSize: new L.Point(17, 17), // eslint-disable-line
        //   className: 'point'
        // }),
        allowIntersection: false
      },
      polyline: false,
      circle: false,
      marker: false,
      circlemarker: false,
    },
    edit: false,
    position: 'topright'
  }))

  useEffect(() => {
    if (!leafletEl) {
      setLeafletEl(
        L.map(mapDivEl.current, { // eslint-disable-line
          center: [55.87835875564509, 37.7050219952363],
          zoom: 5,
          layers: [L.tileLayer(osmTileUrl)], // eslint-disable-line
        })
      )
    }
    return () => leafletEl.remove()
  }, [])

  useEffect(() => {
    if (leafletEl) {
      leafletEl.addControl(drawControl)
      featureGroup.addTo(leafletEl)
    }
  }, [leafletEl])

  return (
    <div id="map" ref={mapDivEl} />
  )
}

export default LeafletMap