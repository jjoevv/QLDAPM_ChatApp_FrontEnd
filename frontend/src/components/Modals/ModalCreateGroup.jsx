import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, InputGroup, Image } from 'react-bootstrap'


import UploadingImage from './../../assets/images/uploadimage.png'
import useFriends from '../../hooks/useFriends'
import useChatroom from '../../hooks/useChatroom'
import { isMessageasImage } from '../../hooks/useCheck'

export default function ModalCreateGroup({ handleToggle, show }) {
  const { listFriends } = useFriends()
  const { createChatroom } = useChatroom()

  const [groupName, setName] = useState('')
  const [chooseUsers, setChooseUser] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleCreateGroup = async (e) => {
    e.preventDefault()
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Gọi API để tải ảnh lên và nhận URL
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Gọi API để tải ảnh lên và nhận URL
        fetch('https://qldapm-api.onrender.com/upload/image', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.path)
            const path = `https://qldapm-api.onrender.com/${data.path}`
            alert(path)
            setImageUrl(path)
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      }
    }
    createChatroom(chooseUsers, groupName, imageUrl)
    handleToggle()
  }
  const handleOptionChange = (item) => {
    if (chooseUsers.includes(item)) {
      setChooseUser(chooseUsers.filter((selectedItem) => selectedItem !== item));
    } else {
      setChooseUser([...chooseUsers, item]);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  return (
    <Modal show={show}
      onHide={handleToggle}
      centered
      aria-labelledby="example-custom-modal-styling-title-sm"
      dialogClassName="modal-40w"
      scrollable={true}
      style={{ maxHeight: '600px', overflowX: 'none' }}
    >

      <Modal.Header className=' mx-5 h1 d-flex flex-column' style={{ color: "#1687A7" }}>
        <Modal.Title>Create a Group Chat</Modal.Title>

        <InputGroup className="mb-1 mt-3">
          <div variant="outline-secondary" id="button-addon1" className='rounded-circle bg-primary-gray text-center px-2'>
            {
              imageUrl &&
              <Image width={20} height={20} roundedCircle src={imageUrl} />
            }
            <div>

              <input
                type="file"
                id='custom-file-input'
                style={{ display: 'none', visibility: 'none' }}
                onChange={handleImageChange}
              />
              <label id="custom-file-input" htmlFor="custom-file-input">
                <Image src={UploadingImage} width={20} height={20} roundedCircle />
              </label>

            </div>
          </div>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            value={groupName}
            name='groupName'
            onChange={(e) => setName(e.target.value)}
            placeholder='Group Chat`s Name...'
            className='rounded-pill ms-3 border-dark p-2'
          />
        </InputGroup>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label className='mb-1 ps-4 fw-bolder'>Friend List:</Form.Label>
          {listFriends.map((user, index) => (
            <Form.Group as={Row} className="mb-1 ps-5">

              <Form.Label column sm="7">
                {user.username}
              </Form.Label>

              <Col sm="5" className=''>
                <Form.Check
                  type="checkbox"
                  key={index}
                  value={user.user_id}
                  className='ps-5 border-2 border-secondary'
                  onChange={() => handleOptionChange(user.user_id)}
                />
              </Col>
            </Form.Group>
          ))}
        </Form>

      </Modal.Body>

      <Modal.Footer className='mx-4'>
        <Button variant="secondary" onClick={handleToggle} style={{ backgroundColor: '#D9D9D9', color: '#276678' }} className='rounded-pill border-0 px-4 fw-bold'>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateGroup} style={{ backgroundColor: '#276678', color: 'white' }} className='rounded-pill px-4 text-center border-0 fw-bold'>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
