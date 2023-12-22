import React from 'react'
import { Link } from "react-router-dom";
import Modal from '../modal/Modal';

const Header = () => {
  return (
    <div>
        <Link to='/'>
            REDBERRY
        </Link>
        <Modal />
    </div>
  )
}

export default Header