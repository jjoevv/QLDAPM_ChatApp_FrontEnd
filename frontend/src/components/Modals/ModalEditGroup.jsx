import React, { useState } from 'react'
import { Modal, Form, Stack, Image, Button } from 'react-bootstrap'

import uploadIcon from '../../assets/images/uploadimage.png'
import backIcon from '../../assets/images/back.png'
import useAuth from '../../hooks/useAuth'
import useChatroom from '../../hooks/useChatroom'
import { isImageFileNameValid } from '../../hooks/useCheck'

const ModalEditGroup = ({ handleToggle, show }) => {
    const { user } = useAuth()
    const { group_room, update_Chat_room } = useChatroom()
    const user_in_room = group_room.filter(item => item.user_id !== user.user_id);
    const [isUpdate, setIsUpdate] = useState(false)

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setimageURL] = useState(group_room.avatar);
    const [updateInput, setUpdateInput] = useState({
        room_id: group_room.room_id,
        name: group_room.room_name,
        avatar: group_room.avatar
    })

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('image', selectedImage);
        console.log(imageURL)
        update_Chat_room(group_room.room_id, updateInput.name, imageURL)

        handleToggle()
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedImage(file);

            // Đọc dữ liệu của ảnh và hiển thị trước
            const reader = new FileReader();
            reader.onloadend = () => {
                setimageURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
        else { alert("File too large") }
    }

    const handleInputChange = (event) => {
        const value = { ...updateInput, [event.target.name]: event.target.value }
        setUpdateInput(value)
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
            size='sm'
            scrollable={true}
            style={{ maxHeight: '800px', overflowX: 'none' }}
        >
            <Modal.Header className=' h1 d-flex flex-column text-center my-2 py-2' style={{ color: "#1687A7" }}>

                <Stack direction='horizontal' className='d-flex justify-content-center align-items-center mb-2'>

                    <Modal.Title className='mx-auto'>Update Group</Modal.Title>

                </Stack>
                <div className='position-relative rounded-circle bg-primary-gray border-primary-main border-3'>
                    {
                        selectedImage ?
                            <Image width={100} height={100} roundedCircle src={imageURL} />
                            :
                            <>
                                {
                                    isImageFileNameValid(group_room.avatar)
                                        ?
                                        <Image width={100} height={100} roundedCircle className='bg-secondary' src={group_room.avatar} />
                                        :
                                        <Image width={40} height={100} roundedCircle className='bg-secondary ' src={uploadIcon} />
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
                    <Form.Label className='fw-bold '>Group's name</Form.Label>

                    <Form.Control
                        placeholder={updateInput.name}
                        value={updateInput.name}
                        name='name'
                        onChange={handleInputChange}
                        className='text-black'
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
        </Modal>
    )
}

export default ModalEditGroup