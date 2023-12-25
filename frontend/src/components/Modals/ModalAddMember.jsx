import React, {useState, useEffect} from 'react'
import { Modal, Button, Form, Row, Col, Stack, Image } from 'react-bootstrap'


import UploadingImage from './../../assets/images/uploadimage.png'
import useFriends from '../../hooks/useFriends'
import useChatroom from '../../hooks/useChatroom'

export default function ModalAddMember({handleToggle, show}) {
  const {listFriends, searchFriend, search,getListFriends} = useFriends()
  const {add_member, room} = useChatroom()

    const [searchInput, setSearchInput] =useState('')
    const [isSearch, setSearch] = useState(false)
    const [chooseUsers, setChooseUser] = useState([])
    
    const handleEnter = () => {
        search(searchInput)
        setSearch(true)
    }
    const handleAddMember = (e) => {
      e.preventDefault()
      add_member(room.room_id, chooseUsers)
      handleToggle()
    }
    const handleOptionChange = (item) => {
      if (chooseUsers.includes(item)) {
        setChooseUser(chooseUsers.filter((selectedItem) => selectedItem !== item));
      } else {
        setChooseUser([...chooseUsers, item]);
      }
  };

  useEffect(()=>{
    getListFriends(-1)
  },[listFriends])
  return (
    <Modal show={show} 
        onHide={handleToggle} 
        centered
        dialogClassName="modal-40w"
        scrollable={true}
        style={{maxHeight: '600px', overflowX: 'none'}}
        >

        <Modal.Header className=' mx-5 h1 d-flex flex-column' style={{color: "#1687A7"}}>
        <Modal.Title>Add Member</Modal.Title>

         <Form.Label className='fs-6 fw-bold mt-3 align-self-start text-black'>
            Enter username or email: 
         </Form.Label>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            value={searchInput}
            name='searchInput'
            onKeyDown={handleEnter}
            onChange={(e)=>setSearchInput(e.target.value)}
            placeholder='Username/Email...'
            className='rounded-pill border-dark p-2 w-100'
          />
        </Modal.Header>

        <Modal.Body>
          <Form>
            {isSearch 
            && 
            <>
            {
                searchInput ? 
                <>
                <Form.Label className='mb-1 ps-4 fw-bolder'>Result:</Form.Label>
                <Form.Check
                    type="checkbox" 
                    key={index}
                    value={searchFriend.user_id}
                    className='ps-5 border-2 rounded-circle border border-primary-main'
                    onChange={() => handleOptionChange(user.user_id)}
                />
                </>
                : 
                <span className='fs-6 fw-bold mt-3 align-self-start text-black'>No user match</span>
            }
                
            </>
            }
            <Form.Label className='mb-1 ps-4 fw-bolder'>Friends:</Form.Label>
            {listFriends.map((user, index)=>(
              <Form.Group as={Row} className="mb-1 ps-5">

                <Form.Label column sm="7" className='me-auto'>
                  {user.username}
                </Form.Label>

                <Col sm="5" className='text-center'>
                  <Form.Check
                    
                    type="checkbox" 
                    key={index}
                    value={user.user_id}
                    
                    
                    onChange={() => handleOptionChange(user.user_id)}
                  />
                </Col>
              </Form.Group>
            ))}
            </Form>
          
        </Modal.Body>
        
        <Modal.Footer className="d-flex justify-content-center">
          <Stack direction='horizontal' gap={4}  className=' '>
              <Button variant="secondary" onClick={handleToggle} className='rounded-pill border-0 px-5 fw-bold color-blue-dark bg-primary-gray'>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddMember} className='rounded-pill px-5 text-center bg-primary-dark text-white border-0 fw-bold '>
                Add
              </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
  )
}
