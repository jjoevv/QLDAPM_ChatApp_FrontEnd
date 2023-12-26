import * as actionTypes from './actionTypes';

export const saveStorage = (user) => {
  return {
    type: actionTypes.SAVE_TO_LOCAL_STORAGE,
    payload: user
  }
}

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
};

export const loginSuccess = (userData) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailure = (error) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
};

export const registerRequest = (userData) => {
  return {
    type: actionTypes.REGISTER_REQUESTE,
  }
}
export const registerSuccess = (userData) =>{
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: userData
  }
}

export const registerFailure = (error) => {
  return {
    type: actionTypes.REGISTER_FAILURE,
    payload: error,
  };
};
export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};


export const searchFriend = (data) => {
  return {
    type: actionTypes.SEARCH_FRIEND,
    payload: data,
  }
}

export const fetchChatrooms = (list) => {
  return {
    type: actionTypes.GET_CHAT_ROOMS,
    payload: list
  }
}

export const fetchFriends = (list) => {
  return {
    type: actionTypes.GET_FRIENDS,
    payload: list
  }
}

export const fetchRequests = (list) => {
  return {
    type: actionTypes.GET_REQUESTS,
    payload: list
  }
}


export const fetchSends = (list) => {
  return {
    type: actionTypes.GET_SENDS,
    payload: list
  }
}

export const joinRoom = (room) => {
  return {
    type: actionTypes.JOIN_ROOM,
    payload: room
  }
}


export const fetchMessagesInChatRoom = (data) => {
  return {
    type: actionTypes.GET_MESSAGES,
    payload: data
  }
}

export const fetchMemberInRoom = (data) => {
  return {
    type: actionTypes.GROUP_ROOM,
    payload: data
  }
}

export const updateProfile = (data) => {
  return {
    type: actionTypes.UPDATE_PROFILE,
    payload: data
  }
}
