import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export function Modal({ root = 'root', children }) {

  const [modalEl] = useState(document.createElement('div'))
  const [modalRoot] = useState(document.getElementById(root))

  useEffect(() => {
    modalRoot.appendChild(modalEl)
    console.log('mount modal')
    return () => {
      document.removeChild(modalEl)
      console.log('umount modal')
    }
  }, [])

  return ReactDOM.createPortal(
    children,
    modalEl
  )
}

export default Modal