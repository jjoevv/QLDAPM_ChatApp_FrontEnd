import { Stack} from 'react-bootstrap';
import SendMessage from './send-message';
import Messages from './messages';
import RoomInfo from './RoomInfo';
import useAuth from '../../hooks/useAuth';

import { io } from 'socket.io-client';
import useChatroom from '../../hooks/useChatroom';
import Default from './Default';
import { useEffect, useState } from 'react';

const host = import.meta.env.VITE_API_BASE_URL
let socket;
const Chat = () => {
  const { user } = useAuth()
  const {room, group_room, fetch_Member_In_Room, fetch_Messages_In_Room} = useChatroom()
  
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Kết nối với máy chủ socket
    const newSocket = io(host, {
      extraHeaders: {
        'user_id': user.user_id,
      }
    });

    // Lắng nghe sự kiện connect
    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    // Lưu trữ đối tượng socket trong state
    setSocket(newSocket);

    // Cleanup khi component unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(()=>{
    if(room !== null){
      fetch_Messages_In_Room(room.room_id)
    fetch_Member_In_Room(room.room_id)
    }
  }, [room])
  return (
    <Stack direction='horizontal' className='w-100 overflow-hidden'>
      {
        room !== null ?
          <>
            <div className='mt-4 d-flex flex-column h-100' style={{ width: "850px" }}>
              <Messages socket={socket} />
              
              <div>
                <SendMessage socket={socket} />
              </div>
            </div>
            <RoomInfo />
          </>
          :
          <Default />
      }

    </Stack>
  );
};

export default Chat;
