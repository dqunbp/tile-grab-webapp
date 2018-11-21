import React from 'react'
const osmTileUrl = 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png'

export class LeafletMap extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.leafletElement = null
  }

  componentDidMount() {
    if (!this.leafletElement) {
      this.leafletElement = L.map(this.container.current, this.props) // eslint-disable-line
      L.control.zoom({ position: 'bottomright' }).addTo(this.leafletElement) // eslint-disable-line
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div
    style={{
      position: 'absolute',
      width: '50%',
      height: '50vh'
    }}
    ref={this.container} />
  }
}

LeafletMap.defaultProps = {
  center: [55.87835875564509, 37.7050219952363],
  zoom: 14,
  zoomControl: false,
  layers: L.tileLayer(osmTileUrl), // eslint-disable-line
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: false,
}

export default LeafletMap