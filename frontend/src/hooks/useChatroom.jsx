import React from 'react'
import { useAppContext } from '../context/authContext'
import { baseURL } from './API'
import { fetchChatrooms, joinRoom, fetchMessagesInChatRoom, fetchMemberInRoom } from '../actions/actions'
import useAuth from './useAuth'

const useChatroom = () => {
    const {state, dispatch} = useAppContext()
    const {user} = useAuth()
    
    const fetchListChatrooms = async () =>{
      try {
        const response = await fetch(baseURL + `/chat-room/${user.user_id}/list`); // Thay đổi URL thành API bạn đang sử dụng
        const result = await response.json();
        if(result.data.list.length > 0)
        {
          dispatch(fetchChatrooms(result.data.list))
        }
        else dispatch(fetchChatrooms([]))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const createChatroom = async (user_id, name, avatar) => {
      try {
        const response = await fetch(baseURL + `/chat-room/${state.user.user_id}/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id, name, avatar }),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          fetchListChatrooms()
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        
      }
    }
    const join_room = async (room) => {
     if(room){
      try {
        const response = await fetch(baseURL + `/message/${state.user.user_id}/list?page=1&limit=20&room_id=${room.room_id}`); // Thay đổi URL thành API bạn đang sử dụng
        const result = await response.json();

        if(result.data.list.length > 0)
        {
          dispatch(fetchMessagesInChatRoom(result.data.list))
          
        }
        else {
          dispatch(fetchChatrooms([]))
          dispatch(fetchMessagesInChatRoom([]))
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
     }
      
     dispatch(joinRoom(room))
    }

    const add_member = async (room_id, user_id_add) => {
      try {
        const response = await fetch(baseURL + `/chat-room/${state.user.user_id}/add_member`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ room_id, user_id_add }),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        
      }
    }

    const fetch_Messages_In_Room = async (room) =>{
      
      try {
        const response = await fetch(baseURL + `/message/${state.user.user_id}/list?page=1&limit=20&room_id=${room}`); // Thay đổi URL thành API bạn đang sử dụng
        const result = await response.json();
        
        if(result.data.list.length > 0)
        {
          dispatch(fetchMessagesInChatRoom(result.data.list))
        }
        else {
          dispatch(fetchChatrooms([]))
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const fetch_Member_In_Room = async (room) => {
      try {
        const response = await fetch(baseURL + `/chat-room/${state.user.user_id}/list-member?page=1&limit=20&room_id=${room}`); 
        
        if (response.ok) {
          const result = await response.json();
          dispatch(fetchMemberInRoom(result.data.list))
          
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
      }
      
    }
    const update_Chat_room = async (room_id, name, avatar) => {
      
      try {
        const response = await fetch(baseURL + `/chat-room/${state.user.user_id}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ room_id, name, avatar }),
    
        });
  
        if (response.ok) {
          fetchListChatrooms()
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        
      }
    }
    const leave_Chat_room = async (id) => {
      const room_id = state.room.room_id
      try {
        const response = await fetch(baseURL + `/chat-room/${id}/leave_room`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ room_id}),
        });
  
        if (response.ok) {
          fetch_Member_In_Room(state.room.room_id)
          
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        alert(error)
      }
    }
    
    
  return {
    room: state.room,
    allchatrooms: state.listChatrooms,
    listMessages: state.listMessages,
    group_room: state.group_room,
    fetchListChatrooms,
    join_room,
    add_member,
    createChatroom,
    fetch_Messages_In_Room,
    fetch_Member_In_Room,
    update_Chat_room,
    leave_Chat_room
  }
}

export default useChatroom