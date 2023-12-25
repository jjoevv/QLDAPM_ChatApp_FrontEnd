import React from 'react'
import { Dropdown, Button, Stack } from 'react-bootstrap'
import SettingDropdown from '../SettingDropdown'
const Setting = () => {
  return (
    <Stack className='h-100 border-end mt-5 pt-5 px-3' style={{ maxWidth:"280px", minWidth: "270px"}}>
      <h4 className='color-primary-main'>Privacy Setting</h4>
      <div className='mb-2 w-100' >
        <label className='color-primary-main my-1'>Who can see my information?</label>
        <div className='border-top pt-2 pt-2'><SettingDropdown/></div>
      </div>
      <div className='mb-2' >
        <label className='color-primary-main my-1'>Who can send me messages?</label>
        <div className='border-top pt-2'><SettingDropdown/></div>
      </div>
      <div className='mb-2' >
        <label className='color-primary-main my-1'>Who can see my information?</label>
        <div className='border-top pt-2'><SettingDropdown/></div>
      </div>
    </Stack>
  )
}

export default Setting