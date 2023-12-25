import React, { useState } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Stack, Row, Image, Container } from 'react-bootstrap'

import MessagaesIcon from './../assets/images/room.png'
import FriendsIcon from './../assets/images/friend.png'
import WaitingIcon from './../assets/images/waiting.png'
import DeletedIcon from './../assets/images/deleted.png'
import SettingIcon from './../assets/images/setting.png'

const sidebar = [
  { path: `/messages`, icon: MessagaesIcon },
  { path: '/friends', icon: FriendsIcon },
  { path: '/setting/', icon: SettingIcon },
]
const Sidebar = () => {
  const location = useLocation()
  return (
      <>
      {
        location.pathname != "login" || location.pathname != "signup"
        ? 
            <div 
              className=' h-100 mh-100 text-center m-0'
              style={{width: '80px'}}>
            <Stack className='mh-100 h-100 px-3'>
              {
                sidebar.map((tab, index)=>(
                  <Link 
                    key={index}
                    to={tab.path} 
                    className={
                      location.pathname === tab.path ? 
                      ' bg-blue-light mt-3 mb-2 rounded-3  py-1 px-1' : 
                      'bg-primary-gray mt-3 mb-2 rounded-3 py-1 px-1'
                      }>
                    <Image src={tab.icon} width={18} height={16} className='m-2'/>
                  </Link>
                ))
              }
              </Stack>
            </div>
        :
        null
      }
      <Outlet/>
    
      </>
  )
}

export default Sidebar