import React, { useState } from 'react'
import ModalComponent from './ModalComponent'

const Modal = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

  return (
    <div>
    <button onClick={openModal}>Open Modal</button>

    <ModalComponent isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  )
}

export default Modal