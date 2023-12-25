import React, { useState } from 'react'
import { Button, Stack, Image } from 'react-bootstrap'

const options = [
  {id: 1, label: 'My friends'},
  {id: 2, label: 'Everyone'},
  {id: 1, label: 'No one'},
]
const SettingDropdown = () => {
  const [selected, setSelected] = useState('My friends')
  const [showOptions, setShowOptions] = useState(false)
  const listOptions = options.filter(item => item.label !== selected)
  const handleChooseOption = (option) =>{
    setSelected(option.label)
    setShowOptions(!showOptions)
  }
  return (
    <Stack >
      <Button onClick={()=>setShowOptions(!showOptions)} className='bg-transparent border-black d-flex justify-content-between text-black'>
        {selected}
        <span>{showOptions ? 'v' : '^'}</span>
      </Button>
        <Stack 
          className='rounded-2 border border-black text-start'
          styles={showOptions ? {} : {display: 'none'}}
        >
          {listOptions.map((option)=>(
            <Button key={option.id} onClick={()=>handleChooseOption(option)} className='bg-transparent border-0 p-2 text-black text-start option-setting'>
              {option.label}
            </Button>
          ))}
        </Stack>
    </Stack>
  )
}

export default SettingDropdown