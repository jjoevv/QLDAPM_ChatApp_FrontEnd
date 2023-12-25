import React, { useState } from 'react'
import { Modal, Button, Row, Col, Form, Container, Image, Stack } from 'react-bootstrap'

import AddIcon from './../../assets/images/add.png'
import Avatar from './../../assets/images/avatar.jpg'
import useFriends from '../../hooks/useFriends'

export default function ModalAddFriend({ handleToggle, show }) {
    const { search, searchFriend, sendRequest } = useFriends()

    const [searchinput, setInput] = useState("")
    const [isRequested, setRequest] = useState(false)
    const [isSearch, setSearch] = useState(false)

    const handleSendRequest = async (e) => {
        setRequest(!isRequested)
        e.preventDefault();
        sendRequest(searchFriend.user_id)
        console.log("id", searchFriend.user_id)

    }
    const handleInputChange = (e) => {
        setInput(e.target.value)
    }
    const handleSearch = async () => {
        setSearch(true)
        search(searchinput)
        console.log(searchFriend)
    }
    return (
        <Modal show={show}
            onHide={handleToggle}
            centered
            aria-labelledby="example-custom-modal-styling-title-sm"
            dialogClassName="modal-40w"
        >

            <Modal.Header className='border-0 mx-auto h1' style={{ color: "#1687A7" }}>
                <Modal.Title>Add a New Friend</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className='px-4'>
                    <Row>
                        <Form.Label className='fw-bolder'>Enter Email or Username</Form.Label>
                        <Form.Control
                            type='text'
                            autoFocus
                            value={searchinput}
                            placeholder='example@gmail.com'
                            onChange={handleInputChange}
                            className='rounded-pill border-secondary border-1'
                        />
                    </Row>
                    <Row>
                        <Form.Label className='fw-bolder mt-3'>
                            {isSearch &&
                                <>
                                    {searchFriend !== null ?
                                        <>
                                            <span>
                                                You may know:
                                            </span>
                                        </>
                                        :
                                        <span>
                                            No result
                                        </span>
                                    }
                                </>
                            }
                        </Form.Label>
                        {
                            Object.entries(searchFriend).length !== 0 &&
                            <Stack direction='horizontal'>
                                <Stack direction='horizontal'gap={3}>
                                    <Image src={Avatar} roundedCircle style={{ width: '40px', height: '40px' }} />
                                    <div>
                                        <h5>{searchFriend.username}</h5>
                                    </div>
                                </Stack>

                                <div xs={1} className='px-0 align-self-center h6 ms-auto' >
                                    {isRequested ?
                                        <span>Requested sent</span>
                                        :
                                        <Button onClick={handleSendRequest} style={{ backgroundColor: "white", marginLeft: "-15px" }} className='border-0'>
                                            <Image src={AddIcon} style={{ width: '30px', height: '30px' }} />
                                        </Button>
                                    }

                                </div>
                            </Stack>
                        }

                    </Row>
                </Container>
            </Modal.Body>

            <Modal.Footer className='border-0 mx-auto' style={{ marginTop: "40px" }}>
                <Button variant="secondary" onClick={handleToggle} style={{ backgroundColor: "#D3E0EA", color: "#1687A7", width: "120px", }} className='rounded-pill mx-3 fw-bolder'>
                    Cancel
                </Button>
                <Button variant="secondary" onClick={handleSearch} style={{ backgroundColor: "#276678", color: "white", width: "120px" }} className='rounded-pill mx-3 fw-bolder'>
                    Search
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
