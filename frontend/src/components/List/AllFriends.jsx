import React, { useEffect, useState } from 'react'
import { Stack, Image, Button } from 'react-bootstrap'
import Search from '../Search'
import AllRequested from './AllRequested'
import useFriends from '../../hooks/useFriends'
import { isImageFileNameValid, isSingleRoom } from '../../hooks/useCheck'
import avatarIcon from '../../assets/images/profile.png'
import useChatroom from '../../hooks/useChatroom'

//tab2 - tất cả bạn bè và lời mời kết bạn
const AllFriend = () => {
  const { listFriends, listRequests,getListFriends } = useFriends()
  const {allchatrooms ,join_room, fetch_Member_In_Room, fetchListChatrooms} = useChatroom()
  const [isChoose, setChoose] = useState(null)
  const handleJoinRoom = (id) => {
    const room = isSingleRoom(allchatrooms, id)

    if(room){
      
    join_room(room)
    setChoose(id)
    
    fetch_Member_In_Room(room.room_id)
    }

    
  }
  useEffect(() => {
    getListFriends(-1)
    fetchListChatrooms()
  }, [listFriends, listRequests, allchatrooms])
  return (

    <Stack style={{ paddingTop: "60px", width: '300px', maxWidth: "280px", minWidth: "270px" }} className='h-100 border-black border-end '>
      <Search />

      <div title='All your friends'
        className='fw-bold color-primary-main bg-white border-bottom-primary-main'>
        Active Friends
      </div>
      <div className='bg-secondary-subtle'
        style={listFriends.length > 1 ? { overflowY: "auto", height: '70%' } : {}}
      >
        <div variant="pills" className="bottom-top overflow-y-auto  overflow-x-none">
          {listFriends.map((friend, index) => (
            <div className='bg-white w-100' key={index}>
              <Button className={isChoose === friend.user_id ? 'd-flex border-0 bg-blue-light py-3 m-0  w-100' : 'd-flex border-0 bg-white py-3 m-0 ' }
                onClick={()=>handleJoinRoom(friend.user_id)}
              >
                <Stack direction='horizontal' className='w-100'>
                  {
                    isImageFileNameValid(friend.avatar)
                      ?
                      <Image width={50} height={50} roundedCircle className='bg-black me-3' src={friend.avatar} />
                      :
                      <Image width={50} height={50} roundedCircle className='bg-black me-3' src={avatarIcon} />
                  }
                  <div className='color-primary-main fw-bold' style={{ fontSize: "15px" }}>
                    {friend.username}
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