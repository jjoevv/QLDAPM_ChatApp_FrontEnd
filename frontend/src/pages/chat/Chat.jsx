import { Stack} from 'react-bootstrap';
import RoomAndUsers from './room-and-users';
import SendMessage from './send-message';
import Messages from './messages';
import RoomInfo from '../../components/RoomInfo';
import useAuth from '../../hooks/useAuth';

import { io } from 'socket.io-client';
import useChatroom from '../../hooks/useChatroom';
import Default from './Default';
import { useEffect, useState } from 'react';
let socket;
const Chat = () => {
  const { user } = useAuth()
  const {room} = useChatroom()
  const host = 'https://qldapm-api.onrender.com'
  
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
