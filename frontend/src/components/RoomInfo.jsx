import React, { useEffect, useState } from 'react'
import { ButtonGroup, Image, Button, Stack } from 'react-bootstrap'
import useAuth from '../hooks/useAuth'
import useChatroom from '../hooks/useChatroom'
import ModalAddMember from '../components/Modals/ModalAddMember'
import { isImageFileNameValid, userExistInList } from '../hooks/useCheck'
import ModalReport from './Modals/ModalReport'
import useFriends from '../hooks/useFriends'

import ModalEditGroup from './Modals/ModalEditGroup'

import avatarIcon from '../assets/images/profile.png'
import editIcon from '../assets/images/edit.png'
import acceptedFriend from '../assets/images/friendAccepted.png'
import addFriendIcon from '../assets/images/add_white.png'
import deleteIcon from '../assets/images/deny.png'

import ModalConfirmDelete from './Modals/ModalLeaveRoom'

const RoomInfo = ({room}) => {
  const { user } = useAuth()
  const { group_room, fetch_Member_In_Room, } = useChatroom()
  const { listFriends, listSends, sendRequest, unFriend } = useFriends()

  const user_in_room = group_room.find(item => item.user_id !== user.user_id);

  const [isSend, setSend] = useState(false)
  const handleSendRequest = (id) => {
    sendRequest(id)
    setSend(!isSend)
  }

  const [isOpenAddFriend, setOpenAddfriend] = useState(false);
  const toggleOpenAddfriend = () => setOpenAddfriend(!isOpenAddFriend)

  const [showReport, setShowReport] = useState(false)
  const toggleOpenReport = () => setShowReport(!showReport)

  const [showEditGroup, setShowEditGroup] = useState(false)
  const toggleOpenEdit = () => setShowEditGroup(!showEditGroup)

  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteID, setDeleteID] = useState(null)
  const handleChooseDelete = (id) => {
    setShowConfirm(true)
    setDeleteID(id)
  }
  useEffect(() => {
    fetch_Member_In_Room(room.room_id)
  }, [])
  return (
    <div className='h-100 w-100 d-flex flex-column my-5 pt-5 align-items-center'>
      {
        group_room.length === 2
          ?
          <>
            <div className='d-flex flex-column align-items-center mb-0 h-25 w-100 mt-5'>
              {
                isImageFileNameValid(group_room.avatar)
                  ?
                  <Image width={30} height={30} roundedCircle src={user_in_room.avatar} />
                  :
                  <Image width={100} height={100} roundedCircle src={avatarIcon} />
              }
              <div className='d-flex align-items-center my-3 color-blue-dark fs-5 fw-bold'>
                {user_in_room.username}
                {
                  userExistInList(user_in_room.user_id, listFriends)
                    &&
                    <Image width={20} height={20} className='ms-1' src={acceptedFriend} />
                }

              </div>
              <div className='mb-3'>
                {
                  userExistInList(user_in_room.user_id, listFriends)
                    ?
                    <ButtonGroup className=' w-100  pb-2'>
                      <Button className='w-50 me-3 rounded-pill py-2 px-3 bg-primary-dark border-0'>Mute</Button>
                      <Button
                        onClick={() => unFriend(user_in_room.user_id)}
                        className='w-50  rounded-pill py-2 px-3 bg-blue-light color-primary-main border-0'>Unfriend</Button>
                    </ButtonGroup>
                    :
                    <>
                    {
                      userExistInList(user_in_room.user_id, listSends)
                        ?
                        <span>Request send</span>
                        :
                        <Button className='bg-primary-dark border-0 ' onClick={() => sendRequest(user_in_room.user_id)}>
                          <Image width={20} height={20} className='ms-1 px-5 bg-transparent' src={addFriendIcon} />
                        </Button>
                    }
                    </>
                }
              </div>
            </div>

            <div className='mt-5 p-4 w-100 border-top '>
              <Stack className='w-100' gap={2}>
                <h6 className='fw-bold text-center'>Personal information:</h6>
                <div className='d-flex justify-content-between'>
                  <label className='fw-bold' style={{ fontSize: "14px" }}>Email: </label>
                  <span style={{ fontSize: "14px" }}>{user_in_room.email}</span>
                </div>

                <Button className='bg-danger text-white border-0 w-50 mx-auto rounded-pill' onClick={toggleOpenReport}>
                  Block
                </Button>
              </Stack>

            </div>
            {showReport && <ModalReport handleToggle={toggleOpenReport} show={showReport} />}
          </>
          :
          <>
            <div className='w-100 d-flex flex-column  align-items-center border-bottom border-2 pb-3'>
              <Image width={100} height={100} className='bg-black' roundedCircle />
              <div className='d-flex align-items-center my-3 color-blue-dark fs-5 fw-bold'>
                {room.room_name}

                <Button className='bg-transparent border-0' onClick={toggleOpenEdit}>
                  <Image width={20} height={20} className='ms-1' src={editIcon} />
                </Button>
              </div>
              <ButtonGroup className='w-75'>
                <Button onClick={toggleOpenAddfriend} className='w-75 me-3 rounded-pill p-1 bg-primary-dark border-0'>Add Member</Button>
                <Button onClick={() => handleChooseDelete(user.user_id)} className='w-75  rounded-pill p-1 bg-blue-light color-primary-main border-0'>Leave</Button>
              </ButtonGroup>
            </div>
            {group_room.map((member, index) => (
              <div className='bg-white' key={index}>
                <div className='d-flex border-0 rounded-3 bg-white py-3 m-0 room' style={{ maxWidth: "280px", minWidth: "270px" }}>
                  <Stack direction='horizontal' className='w-100'>
                    <Image src='' width={50} height={50} roundedCircle className='bg-black me-3' />
                    <div className='color-primary-main fw-bold' style={{ fontSize: "15px" }}>
                      {member.username}
                    </div>

                    <Button onClick={() => handleChooseDelete(member.user_id)}
                      className='bg-transparent border-danger rounded-circle ms-auto '>
                      <Image roundedCircle width={14} src={deleteIcon} className='' />
                    </Button>
                  </Stack>
                </div>
              </div>
            ))}
          </>
      }
      {showConfirm && <ModalConfirmDelete handleToggle={() => setShowConfirm(!showConfirm)} show={showConfirm} id={deleteID} />}
      {showEditGroup && <ModalEditGroup handleToggle={toggleOpenEdit} show={showEditGroup} />}
      {isOpenAddFriend && <ModalAddMember handleToggle={toggleOpenAddfriend} show={isOpenAddFriend} />}
    </div>
  )
}

export default RoomInfo