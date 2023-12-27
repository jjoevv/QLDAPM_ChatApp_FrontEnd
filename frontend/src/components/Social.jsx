import React from 'react'
import { Image, Button } from 'react-bootstrap'

import facebookIcon from '../assets/images/facebook.png'
import googleIcon from '../assets/images/google.png'
import twitterIcon from '../assets/images/twitter.png'

const Social = () => {
  return (
    <div>
        <Button className='bg-transparent border-0'>
            <Image src={facebookIcon} roundedCircle width={30}/>
        </Button>
        <Button className='bg-transparent border-0'>
            <Image src={googleIcon} roundedCircle width={30}/>
        </Button>
        <Button className='bg-transparent border-0'>
            <Image src={twitterIcon} roundedCircle width={30}/>
        </Button>
    </div>
  )
}

export default Social