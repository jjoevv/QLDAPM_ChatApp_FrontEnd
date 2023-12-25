import React from 'react'
import { Modal } from 'react-bootstrap'

//thông báo lỗi khi đăng nhập

function AlertError({handleToggle, show, message}) {
    return (
        <Modal
            show={show}
            onHide = {handleToggle}

        >
        <Modal.Header closeButton className="px-4">
          <Modal.Title className="ms-auto" style={{color: '#1687A7'}}>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>{message}</p>
        </Modal.Body>


        </Modal>
    )
}

export default AlertError
