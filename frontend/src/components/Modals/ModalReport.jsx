import React, {useState, useEffect} from 'react'
import { Modal, Button, Form, Row, Col, InputGroup, Image } from 'react-bootstrap'

import useFriends from '../../hooks/useFriends'
import useChatroom from '../../hooks/useChatroom'
import useAuth from '../../hooks/useAuth'

const options = [
    {id: 1, label: 'Sending me spam messages'},
    {id: 2, label: 'Sending me inappropriate contents'},
    {id: 3, label: 'Sending me spam messages'},
    {id: 4, label: 'Sending me spam messages'},
    {id: 5, label: 'Sending me spam messages'},
]
export default function ModalReport({handleToggle, show}) {
  
  const {blockUser} = useAuth()
  const [chooseOptions, setChooseOptions] = useState([])


    const handleReport = async (e) => {
      e.preventDefault()
      blockUser(chooseOptions)
    }
    const handleOptionChange = (item) => {
      if (chooseOptions.includes(item)) {
        setChooseOptions(chooseOptions.filter((selectedItem) => selectedItem !== item));
      } else {
        setChooseOptions([...chooseOptions, item]);
      }
  };
  return (
    <Modal show={show} 
        onHide={handleToggle} 
        centered
        aria-labelledby="example-custom-modal-styling-title-sm"
        dialogClassName="modal-40w"
        scrollable={true}
        style={{maxHeight: '600px', overflowX: 'none'}}
        >

        <Modal.Header className=' mx-5 h1 d-flex flex-column' style={{color: "#1687A7"}}>
        <Modal.Title>Report</Modal.Title>
        

          <span className="fw-bold fs-6 mt-3 mb-1 text-black">What's your problem with this user?</span>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {options.map((option, index)=>(
              <Form.Group as={Row} className="mb-1 ps-5">

                <Form.Label column sm="7">
                  {option.label}
                </Form.Label>

                <Col sm="5" className=''>
                  <Form.Check
                    type="checkbox" 
                    key={index}
                    value={option.id}
                    className='ps-5 border-2 border-secondary'
                    onChange={() => handleOptionChange(option.id)}
                  />
                </Col>
              </Form.Group>
            ))}
            </Form>
          
        </Modal.Body>
        
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleToggle} className='rounded-pill border-0 px-4 fw-bold bg-danger'>
            Block and Send report
          </Button>
          
        </Modal.Footer>
      </Modal>
  )
}
