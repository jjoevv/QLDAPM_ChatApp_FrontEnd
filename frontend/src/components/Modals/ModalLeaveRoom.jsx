import React, { useState } from 'react'
import { Modal, Stack, Button } from 'react-bootstrap'

import useChatroom from '../../hooks/useChatroom'
import useAuth from '../../hooks/useAuth'
const ModalLeaveRoom = ({ handleToggle, show, id }) => {
    const {user} = useAuth()
    
    const { leave_Chat_room, join_room } = useChatroom()

    const handleConfirm = () => {
        leave_Chat_room(id)
        if(id === user.user_id){
            join_room(null)
        }
        handleToggle()
    }
    return (
        <Modal show={show}
            onHide={handleToggle}
            centered
            size='sm'
            scrollable={true}
            style={{ maxHeight: '800px', overflowX: 'none' }}
        >

            <Modal.Body>
                <span className='text-danger'>
                    {
                        id !== user.user_id
                        ? <span>Are you sure want to delete this user from group?</span>
                        : <span>Are you sure wanna leave?</span>
                    }
                </span>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center">
                <Stack direction='horizontal' gap={4} className=''>
                    <Button variant="secondary" onClick={() => handleToggle()} className='rounded-pill border-0 px-3 fw-bold color-blue-dark bg-primary-gray'>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleConfirm()} className='rounded-pill px-3 text-center bg-primary-dark text-white border-0 fw-bold '>
                        Confirm
                    </Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLeaveRoom