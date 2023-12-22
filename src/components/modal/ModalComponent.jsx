import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModalComponent = ({ isOpen, closeModal }) => {
  const [inputValue, setInputValue] = useState('gigagiorgadze@redberry.ge')
  const navigate = useNavigate()

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const handleLogin = async () => {
    try {
      const token = import.meta.env.VITE_TOKEN
      const response = await axios.post('https://api.blog.redberryinternship.ge/api/login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        email: inputValue
      });
      navigate('/addblog')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
    >
      <button onClick={closeModal}>Close Modal</button>
      <input
        type="text"
        pattern="^[a-zA-Z0-9.]+@redberry.ge$"
        placeholder='Example@redberry.com'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleLogin}>შესვლა</button>
    </Modal>
  );
};

export default ModalComponent;