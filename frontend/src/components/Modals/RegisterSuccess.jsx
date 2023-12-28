import { useState } from 'react';
import { Button, Modal, Image } from 'react-bootstrap';

import SuccessIcon from './../../assets/images/success.png'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function RegisterSuccess({handleToggle, show}) {
  const {user, handleLogin} =useAuth()
  return (
    <>
      <Modal show={show} onHide={handleToggle} animation={false} className='mt-4'>
        <Modal.Body className=' text-center'> 
          <h3 className='bold'>Your account has been created succesfully!</h3>
            <Image src={SuccessIcon}/>
            <h4>Welcome to Chat App!</h4>
        </Modal.Body>
        <Modal.Footer className='border-0'>
          <Button variant="secondary" onClick={()=>handleLogin(user.email, user.password)} className='bg-transparent mx-auto border-0' style={{color: "#1687A7", fontSize: "25px", marginTop: '-20px', fontWeight: 'bold'}}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}