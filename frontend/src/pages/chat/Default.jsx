import React from 'react'
import { Container, Image } from 'react-bootstrap'

import logoIcon from '../../assets/images/logo_lg.png'
const Default = () => {
  return (
    <Container className='color-primary-main d-flex flex-column justify-content-center align-items-center'>
      <Image width={200} height={200} src={logoIcon}/>
      <h1 >CHAT APP</h1>
      <h3>LET'S HAVE A CHAT WITH YOUR FRIENDS!</h3>
      <span className='text-decoration-underline'>How to use Chat App</span>
    </Container>
  )
}

export default Default