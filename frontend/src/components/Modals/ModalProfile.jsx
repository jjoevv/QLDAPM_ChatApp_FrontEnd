import React, { useEffect, useState } from 'react'
import { Modal, Form, Stack, Image, Button } from 'react-bootstrap'

import uploadIcon from '../../assets/images/uploadimage.png'
import backIcon from '../../assets/images/back.png'
import avatarIcon from '../../assets/images/profile.png'
import useAuth from '../../hooks/useAuth'
import { isMessageasImage } from '../../hooks/useCheck'
const ModalProfile = ({ handleToggle, show }) => {

  const { user, updateProfile } = useAuth()

  const [isUpdate, setIsUpdate] = useState(false)

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [updateInput, setUpdateInput] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
  })

  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
  }
  useEffect(() => {
    console.log('Selected file:', selectedFile);
    console.log('Selected file:', imageUrl);
  }, [selectedFile, imageUrl]);

  const handleUpdate = () => {
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
            const path =`https://qldapm-api.onrender.com/${data.path}`
            alert(path)
            setImageUrl(path);
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
            alert(error)
          });
      }
    }
   updateProfile(updateInput.email, updateInput.username, updateInput.password, imageUrl)
    handleToggle()
  }

  const handleInputChange = (event) => {
    const value = { ...updateInput, [event.target.name]: event.target.value }
    setUpdateInput(value)
  }
  return (
    <Modal show={show}
      onHide={handleToggle}
      centered
      size='sm'
      scrollable={true}
      style={{ maxHeight: '800px', overflowX: 'none' }}
    >

      {
        isUpdate
          ?
          <>

            <Modal.Header className=' h1 d-flex flex-column text-center my-2 py-2' style={{ color: "#1687A7" }}>

              <Stack direction='horizontal' className='d-flex justify-content-center align-items-center mb-2'>
                <Button className='bg-transparent border-0 m-0 p-0' onClick={() => setIsUpdate(!isUpdate)}>
                  <Image src={backIcon} width={20} height={16}/>
                </Button>
                <Modal.Title className='mx-auto'>Update Profile</Modal.Title>
                <div>{' '}</div>
              </Stack>
              <div className='position-relative'>
                {
                  imageUrl ?
                    <Image width={100} height={100} roundedCircle src={imageUrl} />
                    :
                    <>
                      {
                      isMessageasImage(user.avatar)
                      ?
                      <Image width={100} height={100} roundedCircle className='bg-white' src={user.avatar}/>
                      :
                      <Image width={100} height={100} roundedCircle className='bg-white' src={avatarIcon}/>
                    }
                    </>
                }
                <div className='p-0 m-0 position-absolute' style={{ bottom: '0px', right: '5px' }}>
                  <input
                    type="file"
                    id='custom-file-input'
                    style={{ display: 'none', visibility: 'none' }}
                    onChange={handleImageChange}
                  />
                  <label id="custom-file-input" htmlFor="custom-file-input">
                    <Image src={uploadIcon} width={30} roundedCircle className="bg-primary-dark p-2" />
                  </label>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body>
              <Form className='overflow-hidden mx-2'>
                <Form.Label className='fw-bold '>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={user.username}
                  value={updateInput.username}
                  name='username'
                  onChange={handleInputChange}
                  className='mb-4 rounded-pill'
                />

                <Form.Label className='fw-bold'>Email</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={user.email}
                  name='email'
                  value={updateInput.email}
                  onChange={handleInputChange}
                  className='rounded-pill mb-4'
                />
                <Form.Label className='fw-bold'>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='*******'s
                  name='email'
                  value={updateInput.password}
                  onChange={handleInputChange}
                  className='rounded-pill'
                />
              </Form>

            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center">
              <Stack direction='horizontal' gap={4} className=''>
                <Button variant="secondary" onClick={() => handleToggle()} className='rounded-pill border-0 px-3 fw-bold color-blue-dark bg-primary-gray'>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => handleUpdate()} className='rounded-pill px-3 text-center bg-primary-dark text-white border-0 fw-bold '>
                  Update
                </Button>
              </Stack>
            </Modal.Footer>
          </>
          :
          <>

            <Modal.Header className='text-center mx-5 h1 d-flex flex-column justify-content-center align-items-center' style={{ color: "#1687A7" }}>

              <div className='position-relative'>
              {
                      isMessageasImage(user.avatar)
                      ?
                      <Image width={100} height={100} roundedCircle className='bg-white' src={user.avatar}/>
                      :
                      <Image width={100} height={100} roundedCircle className='bg-white' src={avatarIcon}/>
                    }
                <Modal.Title >{user.username}</Modal.Title>
              </div>
            </Modal.Header>

            <Modal.Body className='text-center '>
              <h5 className='fs-5 fw-bold'>Personal infomation</h5>
              <Stack gap={5} direction='horizontal' className='my-2'>
                <div className='fw-bold'>Email:</div>
                <div>{user.email}</div>
              </Stack>
              <Stack gap={5} direction='horizontal' >
                <div className='fw-bold text-end'>Password: </div>
                <div className=''>********</div>
              </Stack>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="primary" onClick={() => setIsUpdate(!isUpdate)} className='rounded-pill px-5 text-center bg-primary-dark text-white border-0 fw-bold '>
                Update
              </Button>
            </Modal.Footer>
          </>

      }
    </Modal>
  )
}

export default ModalProfile