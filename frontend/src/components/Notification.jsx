import React from 'react'
import { Dropdown, Image, Button } from 'react-bootstrap'
import notiIcon from '../assets/images/noti.png'
import settingIcon from '../assets/images/setting.png'
import useFriends from '../hooks/useFriends'

const Notification = () => {
  const {listSends} = useFriends()
  return (
    <Dropdown  className="ms-auto ">
          <Dropdown.Toggle className='bg-transparent border-0 text-center w-100 text-black d-flex justify-content-center avatar'>
            <Image width={30} height={30} roundedCircle src={notiIcon}/>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{maxWidth: '200px', minWidth: '180px'}}>
            <div className='d-flex justify-content-between align-items-center px-2'>
                <span className='fw-bold color-blue-dark'>Notifications</span>
                <Button className='bg-transparent border-0'>
                    <Image width={15} src={settingIcon}/>
                </Button>
            </div>
          <Dropdown.Item>
              <Button 
              className='bg-transparent border-0 w-100 text-black text-start custom-header-dropdown'
              >
                Profile
              </Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Button 
              className='bg-transparent border-0 text-start w-100 text-black custom-header-dropdown'
              >
                Log out
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
  )
}

export default Notification