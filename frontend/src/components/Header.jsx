import React, {useEffect, useState} from 'react'
import { Stack, Image, Dropdown, Button } from 'react-bootstrap'

import Logo from './../assets/images/logo_small.png'
import avatarIcon from '../assets/images/profile_white.png'
import useAuth from '../hooks/useAuth'
import ModalProfile from './Modals/ModalProfile'
import Notification from './Notification'
import { isImageFileNameValid } from '../hooks/useCheck'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Outlet, useNavigate } from 'react-router-dom'




const Header = () => {
  const {user, handleLogout} = useAuth()
  
  //modal add friend
  const [isOpenProfile, setOpenProfile] = useState(false);
  const toggleOpen = () => setOpenProfile(!isOpenProfile)
  
  useEffect(()=>{
    console.log(user)
  }, [user])
  return (
  <div className='fixed-top'
  style={{marginLeft: "70px"}}>
    
      <Stack
      direction="horizontal" gap={3}
      className=' bg-primary-main px-4'
      style={{}}>
        
        <div className="p-2 d-flex align-items-center">
          <Image width={30} height={30} src={Logo} className='me-2'/>
          <h2 className='text-light'>Chat App</h2>
        </div>

        <div className="p-2 ms-auto d-flex align-items-center">
          <Notification/>
          <Dropdown  className=" ">
            <Dropdown.Toggle className='bg-transparent border-0 text-center w-100 text-black d-flex justify-content-center avatar'>
              <div>
                {
                  isImageFileNameValid(user.avatar)
                  ?
                  <Image width={30} height={30} roundedCircle src={user.avatar}/>
                  :
                  <Image width={30} height={30} roundedCircle src={avatarIcon}/>
                }
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item>
                <Button
                className='bg-transparent border-0 w-100 text-black text-start custom-header-dropdown'
                onClick={toggleOpen}>
                  Profile
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                className='bg-transparent border-0 text-start w-100 text-black custom-header-dropdown'
                onClick={()=>handleLogout()}>
                  Log out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Stack>
      {isOpenProfile && <ModalProfile handleToggle={toggleOpen} show={isOpenProfile}/>}
      <Outlet/>
  </div>
  )
}

export default Header