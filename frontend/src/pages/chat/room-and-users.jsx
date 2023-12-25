import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useChatroom from '../../hooks/useChatroom';
const RoomAndUsers = ({socket}) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const {user} = useAuth()
  const {room} = useChatroom()
    const navigate = useNavigate();

  useEffect(() => {
    socket.on('getId', (data) => {
      console.log(data);
      setId(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const room_id = room.room_id
    socket.emit('leave_room', { user, room_id});
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <div className='roomAndUsersColumn ' >
      <h2 className={styles.roomTitle}>{room.room_id}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === user ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='btn btn-outline' onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;
