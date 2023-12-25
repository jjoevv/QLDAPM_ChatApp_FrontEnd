import React, { useState, useEffect } from 'react'
import { Stack, Image, Row, Col, Tab, Nav, Form, Button } from 'react-bootstrap'
import Search from '../Search'
import AllRequested from './AllRequested'
import useFriends from '../../hooks/useFriends'
import { isImageFileNameValid, isSingleRoom } from '../../hooks/useCheck'
import avatarIcon from '../../assets/images/profile.png'
import useChatroom from '../../hooks/useChatroom'

//tab2 - tất cả bạn bè và lời mời kết bạn
const AllFriend = () => {
  const { listFriends, listRequests,getListFriends } = useFriends()
  const {allchatrooms ,join_room, fetch_Member_In_Room} = useChatroom()
  
  console.log(listFriends)
  const handleJoinRoom = (id) => {
    const room = isSingleRoom(allchatrooms, id)
    join_room(room)
    
    fetch_Member_In_Room(room.room_id)
  }
  useEffect(() => {
    getListFriends(-1)
  }, [listFriends, listRequests])
  return (

    <Stack style={{ paddingTop: "60px", width: '300px', maxWidth: "280px", minWidth: "270px" }} className='h-100 border-black border-end bg-secondary-subtle'>
      <Search />

      <div title='All your chat rooms'
        className='pt-2 border-bottom fw-bold color-primary-main bg-white '>
        Active Friends
      </div>
      <div className=''
        style={listFriends.length > 1 ? { overflowY: "auto", height: '70%' } : {}}
      >
        <div variant="pills" className="bottom-top overflow-y-auto  overflow-x-none">
          {listFriends.map((user, index) => (
            <div className='bg-white' key={index}>
              <Button className='d-flex border-0 rounded-3 bg-white py-3 m-0 room' 
                onClick={()=>handleJoinRoom(user.user_id)}
              >
                <Stack direction='horizontal' className='w-100'>
                  {
                    isImageFileNameValid(user.avatar)
                      ?
                      <Image width={50} height={50} roundedCircle className='bg-black me-3' src={user.avatar} />
                      :
                      <Image width={50} height={50} roundedCircle className='bg-black me-3' src={avatarIcon} />
                  }
                  <div className='color-primary-main fw-bold' style={{ fontSize: "15px" }}>
                    {user.username}
                  </div>
                </Stack>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <AllRequested />
    </Stack>
  )
}

export default AllFriend