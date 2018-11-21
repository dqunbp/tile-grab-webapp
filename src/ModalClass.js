import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.modalEl = document.createElement('div')
    this.modalRoot = document.getElementById(props.root)
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.modalEl)
  }

  componentWillUnmount() {
    document.removeChild(this.modalEl)
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.modalEl
    )
  }
}

export default Modal