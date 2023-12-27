import React, { useState, useEffect } from 'react'
import { Stack, Image, Button } from 'react-bootstrap'
import Search from '../Search'
import useChatroom from '../../hooks/useChatroom'
import useAuth from '../../hooks/useAuth'
import avatarIcon from '../../assets/images/uploadimage.png'
import roomIcon from '../../assets/images/profile.png'
import { parse, differenceInMinutes, differenceInHours } from 'date-fns'
import { getNotAvatarUser, getNotUsername, isImageFileNameValid } from '../../hooks/useCheck'
//tab1 - tất cả tin nhắn

function formatDateTime(timestamp){
  const dateObject = parse(timestamp, 'dd/MM/yyyy HH:mm:ss', new Date());

    // Calculate the time difference in minutes and hours
    const minutesDifference = differenceInMinutes(new Date(), dateObject);
    const hoursDifference = differenceInHours(new Date(), dateObject);

    if(minutesDifference >= 60) {
      return `${hoursDifference}h`
    }
    // Set the time difference state
    return (`${minutesDifference}m`);
}


const AllRooms = () => {
  const { user } = useAuth()
  const { join_room, allchatrooms, fetchListChatrooms, fetch_Member_In_Room} = useChatroom()
  const [tempRoom, setRoom] = useState(0)
  const handleJoinRoom = (joinroom) => {
    const room_info = {
      room_id: joinroom.room_id,
      room_name: joinroom.room_name,
      avatar: joinroom.avatar
    }
    join_room(room_info)
    fetch_Member_In_Room(joinroom.room_id)
    setRoom(joinroom.room_id)
  }

  useEffect(()=>{
    fetchListChatrooms()
  }, [allchatrooms])
  return (

    <Stack className='h-100 border-secondary overflow-hidden border-end bg-secondary-subtle' style={{ maxWidth:"280px", minWidth: "270px"}}>
      <div className='pt-5'>
        <Search />
      </div>
      <div title='All your chat rooms'
       className='fw-bold color-primary-main bg-white border-bottom-primary-main'>
        All messages
       </div>
      <div variant="pills" className="bottom-top overflow-y-auto">
        {allchatrooms.length > 0 ?
        <>
        {allchatrooms.map((r, index) => (
          <div className='bg-white' key={index}>
            <Button 
            key={index}
            className={r.room_id === tempRoom? 'w-100 d-flex border-0 rounded-3 bg-blue-light p-3 m-0 room' : 'd-flex border-0 rounded-3 bg-white p-3 m-0 room'}
               
              onClick={() => handleJoinRoom( r)}
            >
              <Stack direction='horizontal' className='w-100'>
                {
                  r.users.length === 2
                  ?
                  <>
                  <Image width={40} height={40} roundedCircle className='bg-black me-3' src={getNotAvatarUser(r.users, user.user_id)} />
                  </>
                  :
                  <>
                  {
                    isImageFileNameValid(r.avatar)
                      ?
                      <Image width={40} height={40} roundedCircle className='bg-black me-3' src={r.avatar} />
                      :
                      <Image width={40} height={40} roundedCircle className='bg-black me-3' src={roomIcon} />
                  }
                  </>
                }
                 
                <Stack className='text-start' >
                  <div className='color-primary-main fw-bold' style={{ fontSize: "15px" }}>
                  {
                  r.users.length === 2
                  ?
                  <>
                   {
                    getNotUsername(r.users, user.user_id)
                   }
                  </>
                  :
                  <>
                  <span>{r.room_name}</span>
                  </>
                }
                    
                  </div>
                  <div className='d-flex text-secondary' style={{fontSize: "14px",}}>
                    {
                      r.last_message.user.user_id === user.user_id ?
                      <>You: {" "}
                      <div className=" text-truncate text-center" style={{ maxWidth: "100px"}}>
                        {"   "}
                        {
                          isImageFileNameValid(r.last_message.content)
                          ?
                          <span className='fw-bold'> image</span>
                          :
                          <>{r.last_message.content}</>
                        }
                      </div> 
                      </>
                      :
                      <span className=" text-truncate text-center" style={{ maxWidth: "100px"}}>{r.last_message.content}</span>
                    }
            
                    {
                      r.last_message.content !== '' 
                      ?
                      <div className='ms-2'>
                      {'   '} . {' '}{formatDateTime(r.last_message.timestamp)}</div>
                      :
                      <div>Start chat with you friend</div>
                    }
                  </div>
                </Stack>
              </Stack>
            </Button>
          </div>
        ))}
        </>
        : 
        <>
        <div className="py-3 bg-white"></div>
        </>
        }
      </div>

    </Stack>
  )
}

export default AllRooms