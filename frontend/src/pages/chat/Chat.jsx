import { Stack} from 'react-bootstrap';
import RoomAndUsers from './room-and-users';
import SendMessage from './send-message';
import Messages from './messages';
import RoomInfo from '../../components/RoomInfo';
import useAuth from '../../hooks/useAuth';

import { io } from 'socket.io-client';
import useChatroom from '../../hooks/useChatroom';
import Default from './Default';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

import ImageMessageUploader from '../../components/ImageMessageUploader'
import { useState } from 'react';
let socket;
const Chat = () => {
  const { user } = useAuth()
  const {room} = useChatroom()
  
  socket = io.connect('http://localhost:3000', {
    extraHeaders: {
      'user_id': user.user_id,
    }
  })
  if (!socket) {
    return <></>
  }
  return (
    <Stack direction='horizontal' className='w-100 overflow-hidden'>
      {/*<div>
      
        <RoomAndUsers />
    </div>*/}
      {
        room !== null ?
          <>
            <div className='mt-4 d-flex flex-column h-100' style={{ width: "850px" }}>
              <Messages socket={socket} />
              
              <div>
                <SendMessage socket={socket} />
              </div>
            </div>
            <RoomInfo/>
          </>
          :
          <Default />
      }

    </Stack>
  );
};

export default Chat;
