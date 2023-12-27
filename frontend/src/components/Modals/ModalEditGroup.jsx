import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Image } from 'react-bootstrap'


import UploadingImage from './../../assets/images/uploadimage.png'
import useFriends from '../../hooks/useFriends'
import useChatroom from '../../hooks/useChatroom'

export default function ModalEditGroup({ handleToggle, show }) {
  const {room} = useChatroom()
  const { update_Chat_room } = useChatroom()

  const [groupName, setName] = useState(room.room_name)
  
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)


  const handleUpdate = async (e) => {
    e.preventDefault()
    if (selectedImage ) {
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
          update_Chat_room(room.room_id, groupName, path)
          handleToggle()
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          alert(error)
        });
    }
    else {
      alert('Try again')
    }
  }
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
      <Modal.Title>Edit Group Chat</Modal.Title>

<div className="w-100 mb-1 mt-3 text-center">
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
          <Image src={previewImage} width={100} height={100} roundedCircle className="text-center" />
          :
          <Image src={UploadingImage} width={100} roundedCircle className="bg-primary-gray border-primary-main p-2" />
        }
      </label>

  </div>
  
  <Form.Control
    required
    value={groupName}
    name='groupName'
    onChange={(e) => setName(e.target.value)}
    placeholder='Group Chat`s Name...'
    className='rounded-pill ms-3 border-dark p-2 mt-3'
  />
</div>
      </Modal.Header>

      <Modal.Footer className='mx-auto'>
            <Button variant="secondary" onClick={handleToggle} style={{ backgroundColor: '#D9D9D9', color: '#276678' }} className='rounded-pill border-0 px-4 fw-bold'>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdate} style={{ backgroundColor: '#276678', color: 'white' }} className='rounded-pill px-4 text-center border-0 fw-bold'>
              Update
            </Button>
      </Modal.Footer>
    </Modal>
  )
}
