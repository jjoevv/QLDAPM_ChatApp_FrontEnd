
import { useAppContext } from '../context/authContext';
import { loginRequest, loginSuccess, loginFailure, logoutUser, registerRequest } from '../actions/actions';

import { baseURL } from './API';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const useAuth = () => {
  const { state, dispatch } = useAppContext();
  const {saveToLocalStorage} = useLocalStorage()
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    dispatch(loginRequest());
   try {
        const response = await fetch(baseURL + 'user/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          console.log(userData.data)
          dispatch(loginSuccess(userData.data));  
          saveToLocalStorage('accessToken', JSON.stringify(userData.data))
          console.log(localStorage.getItem('accessToken'))
          navigate('/messages')
          
        } else {
          const errorData = await response.json();
          dispatch(loginFailure(errorData.message));
        }
      } catch (error) {
        dispatch(loginFailure('An error occurred during login.'));
      }
  };

  const handleRegister = async (email, username, password) => {
    dispatch(registerRequest())
    const avatar = 'avatar.png'
    try {
      const response = await fetch(baseURL + 'user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password,  avatar}),
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(loginSuccess(userData));
        setRegister(true)
      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message));
      }
    } catch (error) {
      dispatch(loginFailure('An error occurred during login.'));
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear()
    navigate('/login')
  };

  const updateProfile = async (email, username, password, avatar) => {
    console.log({
      email: email,
      username: username,
      password: password,
      avatar: avatar
    })
    try {
      const response = await fetch(`${baseURL}user/${state.user.user_id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, avatar }),
      });

      if (response.ok) {
        const userData = await response.json();
        alert('Update Success')
        dispatch(loginSuccess({email: email,
          username: username,
          password: password,
          avatar: avatar}))
      } else {
        const errorData = await response.json();
        alert(errorData.message)
        
      }
    } catch (error) {
      dispatch(loginFailure('An error occurred during update.'));
    }
  }
  
  const blockUser = async (reason) => {
    
    try {
      const response = await fetch(baseURL + `friend/${state.user.user_id}/block`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData)
      } else {
        const errorData = await response.json();
        console.log(errorData)
      }
    } catch (error) {
      console.log('An error occurred during login.');
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    socket: state.socket,
    handleLogin,
    handleRegister,
    handleLogout,
    updateProfile,
    blockUser
  };
};

export default useAuth;
