import React, { useEffect, useState } from 'react'
import { ButtonGroup, Image, Button, Stack } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'
import useChatroom from '../../hooks/useChatroom'
import ModalAddMember from '../../components/Modals/ModalAddMember'
import { isImageFileNameValid, userExistInList } from '../../hooks/useCheck'
import ModalReport from '../../components/Modals/ModalReport'
import useFriends from '../../hooks/useFriends'

import ModalEditGroup from '../../components/Modals/ModalEditGroup'

import avatarIcon from '../../assets/images/profile.png'
import editIcon from '../../assets/images/edit.png'
import acceptedFriend from '../../assets/images/friendAccepted.png'
import addFriendIcon from '../../assets/images/add_white.png'
import deleteIcon from '../../assets/images/deny.png'

import ModalConfirmDelete from '../../components/Modals/ModalLeaveRoom'

const RoomInfo = () => {
  const { user } = useAuth()
  const { room, group_room, join_room, fetch_Member_In_Room, fetchListChatrooms} = useChatroom()
  const { listFriends, listSends, sendRequest, unFriend } = useFriends()
  const user_in_room = group_room.find(item => item.user_id !== user.user_id);

  const handleBlockUser = (id) => {
    setReportID(id)
    toggleOpenReport()

  }
  const [isUnfriend, setUnfriend] = useState(false)

  const handleUnfriend = (id) => {
    unFriend(id)
    setUnfriend(!isUnfriend)
    if(group_room.length === 2){
      join_room(null)
      fetchListChatrooms()
    }
  }


  const [isOpenAddFriend, setOpenAddfriend] = useState(false);
  const toggleOpenAddfriend = () => setOpenAddfriend(!isOpenAddFriend)

  const [showReport, setShowReport] = useState(false)
  const [reportID, setReportID] = useState(null)
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
                {
                  userExistInList(user_in_room.user_id, listFriends)
                    ?
                    <ButtonGroup className='w-100 px-4'>
                      <Button className='w-100 me-3 rounded-pill py-2 px-3 bg-primary-dark border-0'>Mute</Button>
                      <Button
                        onClick={() => handleUnfriend(user_in_room.user_id)}
                        className='w-100  rounded-pill py-2 px-3 bg-blue-light color-primary-main border-0'>Unfriend</Button>
                    </ButtonGroup>
                    :
                    <>
                    {
                      userExistInList(user_in_room.user_id, listSends)
                        ?
                        <span className='fw-bold'>Request send</span>
                        :
                        <Button className='border-0 bg-primary-main px-5' onClick={() => sendRequest(user_in_room.user_id)}>
                          <Image width={30} height={30} className='' src={addFriendIcon} />
                        </Button>
                    }
                    </>
                }
              </div>
            <div className='mt-5 p-4 w-100 border-top '>
              <Stack className='w-100' gap={2}>
                <h6 className='fw-bold text-center'>Personal information:</h6>
                <div className='d-flex justify-content-between'>
                  <label className='fw-bold' style={{ fontSize: "14px" }}>Email: </label>
                  <span style={{ fontSize: "14px" }}>{user_in_room.email}</span>
                </div>

                <Button className='bg-danger text-white border-0 w-50 mx-auto rounded-pill' onClick={()=>handleBlockUser(user_in_room.user_id)}>
                  Block
                </Button>
              </Stack>

            </div>
            
          </>
          :
          <>
            <div className='d-flex flex-column align-items-center mb-0 h-25 w-100 mt-5 pb-5 mb-4 border-bottom'>
            {
                    isImageFileNameValid(room.avatar)
                      ?
                      <Image width={80} height={80} roundedCircle className='bg-black me-3' src={room.avatar} />
                      :
                      <Image width={80} height={80} roundedCircle className='bg-black me-3' src={avatarIcon} />
                  }
              
              <div className='d-flex align-items-center my-3 color-blue-dark fs-5 fw-bold'>
                {room.room_name}

                <Button className='bg-transparent border-0' onClick={toggleOpenEdit}>
                  <Image width={20} height={20} className='ms-1' src={editIcon} />
                </Button>
              </div>
              <ButtonGroup className='w-100 px-4'>
                <Button onClick={toggleOpenAddfriend} className='w-100 me-3 rounded-pill px-1 fs-6 bg-primary-dark border-0'>Add Member</Button>
                <Button onClick={() => handleChooseDelete(user.user_id)} className='w-100 fw-bold rounded-pill p-1 bg-blue-light color-primary-main border-0'>Leave</Button>
              </ButtonGroup>
            </div>
            {group_room.map((member, index) => (
              <div className='bg-white' key={index}>
                <div className='d-flex border-0 rounded-3 bg-white py-3 m-0 room' style={{ maxWidth: "280px", minWidth: "270px" }}>
                  <Stack direction='horizontal' className='w-100'>
                  {
                    isImageFileNameValid(member.avatar)
                      ?
                      <Image width={45} height={45} roundedCircle className='bg-black me-3' src={member.avatar} />
                      :
                      <Image width={45} height={45} roundedCircle className='bg-black me-3' src={avatarIcon} />
                  }
                    
                    <div className='color-primary-main fw-bold' style={{ fontSize: "15px" }}>
                      {member.username}
                    </div>

                    {
                      member.user_id === user.user_id
                      ?
                      <span className='ms-auto me-2 text-secondary'>You</span>
                      :
                      <Button onClick={() => handleChooseDelete(member.user_id)}
                      className='bg-transparent border-danger rounded-circle ms-auto '>
                      <Image roundedCircle width={10} src={deleteIcon} className='m-0 p-0' />
                    </Button>
                    }
                  </Stack>
                </div>
              </div>
            ))}
          </>
      }

      {showReport && <ModalReport handleToggle={toggleOpenReport} show={showReport} id={reportID}/>}
      {showConfirm && <ModalConfirmDelete handleToggle={() => setShowConfirm(!showConfirm)} show={showConfirm} id={deleteID} />}
      {showEditGroup && <ModalEditGroup handleToggle={toggleOpenEdit} show={showEditGroup}/>}
      {isOpenAddFriend && <ModalAddMember handleToggle={toggleOpenAddfriend} show={isOpenAddFriend} />}
    </div>
  )
}

export default RoomInfo