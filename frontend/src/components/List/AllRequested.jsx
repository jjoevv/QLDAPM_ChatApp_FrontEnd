import React, { useState, useEffect } from 'react'
import { Stack, Image, ButtonGroup, Button } from 'react-bootstrap'


import AcceptIcon from './../../assets/images/accept.png'
import DenyIcon from './../../assets/images/deny.png'
import useFriends from '../../hooks/useFriends'
import useChatroom from '../../hooks/useChatroom'
import useAuth from '../../hooks/useAuth'
import { isUserIdExistInChatRoom } from '../../hooks/useCheck'

//tab2 - tất cả bạn bè và lời mời kết bạn
const AllRequested = () => {
  const {user} = useAuth()
  const {listRequests,getListFriends, acceptFriend, unAccept} = useFriends()
  const {createChatroom, allchatrooms} = useChatroom()
  const handleAccept = (user_id) => {
    const users = [user_id, user.user_id]
    acceptFriend(user_id)
    if(!isUserIdExistInChatRoom(allchatrooms, user_id)){
      createChatroom(users, 'single', '')
    }
    
  }
  useEffect(()=>{
    getListFriends(1)
  }, [listRequests])
  return (

    <Stack className='h-100 mh-100 border-end'>
      <div title='All your chat rooms'
        className='fw-bold color-primary-main bg-white border-bottom-primary-main'>
        Friends Requested
      </div>
      <div variant="pills" className="bottom-top overflow-y-auto overflow-x-none">
        {listRequests.map((user, index) => (
          <div className='bg-white' key={index}>
            <Button className='d-flex border-0 rounded-3 bg-white p-3 m-0 room'

            >
              <Stack direction='horizontal' className='w-100'>
                <Image src='' width={50} height={50} roundedCircle className='bg-black me-3' />
                <div className='color-primary-main fw-bold me-5' style={{ fontSize: "15px" }}>
                  {user.username}
                </div>
                <ButtonGroup>
                  <Button onClick={()=>handleAccept(user.user_id)}
                  className='rounded-circle bg-transparent border-1 me-2 p-2 d-flex align-items-center justify-content-center' style={{width: "20px", height: "20px"}}>
                    <Image src={AcceptIcon} width={10} height={10} roundedCircle/>
                    </Button>
                    <Button onClick={()=>unAccept(user.user_id)}
                    className='rounded-circle bg-transparent border-1 border-danger  p-2 d-flex align-items-center justify-content-center' style={{width: "20px", height: "20px"}}>
                    <Image src={DenyIcon} width={10} height={10} roundedCircle/>
                    </Button>
                </ButtonGroup>
              </Stack>
            </Button>
          </div>
        ))}
      </div>

    </Stack>
  )
}

export default AllRequested