import React from 'react'
import { useAppContext } from '../context/authContext'
import { fetchFriends, fetchRequests, fetchSends, searchFriend } from '../actions/actions'

import { baseURL } from './API'
import useChatroom from './useChatroom'

const useFriends = () => {
  const { state, dispatch } = useAppContext()

  //get list
  const getListFriends = async (type) => {
    try {
      const response = await fetch(`${baseURL}/friend/${state.user.user_id}/list?page=1&limit=20&type=${type}`)

      if (response.ok) {
        const userData = await response.json();
        if (type === 1) {
          dispatch(fetchRequests(userData.data.list))
        }
        else if (type === 2) {
          dispatch(fetchSends(userData.data.list))
        }
        else { dispatch(fetchFriends(userData.data.list)) }

      } else {
        const errorData = await response.json();
        
      }
    } catch (error) {
      
    }
  }

  //accept
  const acceptFriend = async (user_id_sender) => {
    const type = 1
   try {
      const response = await fetch(baseURL + `/friend/${state.user.user_id}/accept`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id_sender, type }),
      });

      if (response.ok) {
        getListFriends(-1)
        getListFriends(1)
      } else {
        const errorData = await response.json();
        
      }
    } catch (error) {
      console.log('Something failed');
    }
  }

  //unaccept
  const unAccept = async (user_id_sender) => {
    const type = 0
    try {
      const response = await fetch(baseURL + `/friend/${state.user.user_id}/accept`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id_sender, type }),
      });

      if (response.ok) {
        //const userData = await response.json();
        getListFriends(-1)
        getListFriends(1)
      } else {
        const errorData = await response.json();
        
      }
    } catch (error) {
      
    }
  }

  const unFriend = async (user_id) => {
    try {
      const response = await fetch(baseURL + `/friend/${state.user.user_id}/delete`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });

      if (response.ok) {
        fetchFriends(-1)
      } else {
        const errorData = await response.json();
        
      }
    } catch (error) {
      console.log('Something failed');
    }
  }

  //search friend
  const search = async (searchinput) => {
    let URL = ''
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(searchinput)) {
      URL = `${baseURL}/user/${state.user.user_id}/detail?email=${searchinput}`
    }
    else { URL = `${baseURL}/user/${state.user.user_id}/detail?username=${searchinput}` }

    
    try {
      const response = await fetch(URL)

      if (response.ok) {
        const userData = await response.json();
        dispatch(searchFriend(userData.data))

      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message));
      }
    } catch (error) {
      
    }
  }

  //send request
  const sendRequest = async (user_id) => {
    try {
      const response = await fetch(baseURL + `/friend/${state.user.user_id}/request`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });

      if (response.ok) {
        const userData = await response.json();
        
      } else {
        const errorData = await response.json();
        
      }
    } catch (error) {
      console.log('Something failed');
    }
  }
 
  return {
    listFriends: state.listFriends,
    listRequests: state.listRequests,
    listSends: state.listSends,
    searchFriend: state.searchFriend,
    getListFriends,
    acceptFriend,
    unAccept,
    search,
    sendRequest,
    unFriend
  }
}

export default useFriends