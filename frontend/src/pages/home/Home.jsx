import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; // Add this

import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';



const Home = () => {
  const {socket, isLogin, room, join_room} = useAuth()
  const [username, setInput] = useState("")
  const navigate = useNavigate(); // Add this
  if (isLogin === false || isLogin === null){
    navigate('/login')
  }
  const [isJoined, setJoined] = useState(false)
  /*const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }
    setJoined(!isJoined)
    // Redirect to /chat
    navigate('/chat', { replace: true });
    
  };*/

  return (
    <>
    Home</>
  );
};

export default Home;
