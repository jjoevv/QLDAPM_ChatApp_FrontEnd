import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, InputGroup, Image } from 'react-bootstrap'


import UploadingImage from './../../assets/images/uploadimage.png'
import useFriends from '../../hooks/useFriends'
import useChatroom from '../../hooks/useChatroom'

export default function ModalCreateGroup({ handleToggle, show }) {
  const { listFriends } = useFriends()
  const { createChatroom } = useChatroom()

  const [groupName, setName] = useState('')
  const [chooseUsers, setChooseUser] = useState([])
  
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const [imageUrl, setImageUrl] = useState('');

  const handleCreateGroup = async (e) => {
    e.preventDefault()
    if (selectedImage && chooseUsers.length > 0) {
      const formData = new FormData();
      formData.append('file', selectedImage);

      // Gọi API để tải ảnh lên và nhận URL
      fetch('https://qldapm-api.onrender.com/upload/image', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const path = `https://qldapm-api.onrender.com/${data.path}`
          createChatroom(chooseUsers, groupName, path)
          handleToggle()
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          alert(error)
        });
    }
    else {
      alert('You should add member')
    }
  }
  const handleOptionChange = (item) => {
    if (chooseUsers.includes(item)) {
      setChooseUser(chooseUsers.filter((selectedItem) => selectedItem !== item));
    } else {
      setChooseUser([...chooseUsers, item]);
    }
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if(file){
      setSelectedImage(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
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

        <div className="w-100 mb-1 mt-3  d-flex justify-content-center  align-items-center">
            <div className='rounded-circle'>

              <input
                type="file"
                id='custom-file-input'
                style={{ display: 'none', visibility: 'none' }}
                onChange={handleImageChange}
              />
              <label id="custom-file-input" htmlFor="custom-file-input" className='mb-2'>
                {
                  previewImage
                  ?
                  <Image src={previewImage} width={50} height={50} roundedCircle className="text-center" />
                  :
                  <Image src={UploadingImage} width={50} roundedCircle className="bg-primary-gray border-primary-main p-2" />
                }
              </label>

          </div>
          <Form.Control
            required
            value={groupName}
            name='groupName'
            onChange={(e) => setName(e.target.value)}
            placeholder='Group Chat`s Name...'
            className='rounded-pill ms-3 border-dark p-2'
          />
        </div>
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
