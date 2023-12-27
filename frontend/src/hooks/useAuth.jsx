
import { useAppContext } from '../context/authContext';
import { loginRequest, loginSuccess, loginFailure, logoutUser, registerRequest, updateProfile } from '../actions/actions';

import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { baseURL } from './API';



const useAuth = () => {
  const { state, dispatch } = useAppContext();
  const { saveToLocalStorage } = useLocalStorage()
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    if(state.user===null){
      dispatch(loginRequest());
      try {
        const response = await fetch(baseURL + '/user/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          dispatch(loginSuccess(userData.data));

          saveToLocalStorage('accessToken', JSON.stringify(userData.data))

          navigate('/messages')
  
        } else {
          const errorData = await response.json();
          dispatch(loginFailure(errorData.message));
        }
      } catch (error) {
        dispatch(loginFailure('Something failed'));
      }
    }
    else{
      navigate('/messages')}
    
  };

  const handleRegister = async (email, username, password) => {
    dispatch(registerRequest())
    const avatar = ''
    try {
      const response = await fetch(baseURL + '/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, avatar }),
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
      dispatch(loginFailure('Something failed'));
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear()
    navigate('/login')
  };

  const update_Profile = async (email, username, password, avatar) => {
    const postData = {
      email: email,
      username: username,
      password: password,
      avatar: avatar
    }
    try {
      const response = await fetch(`${baseURL}/user/${state.user.user_id}/update`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const new_info = {
          user_id: state.user.user_id,
          email: email,
          username: username,
          password: password,
          avatar: avatar
        }
        dispatch(updateProfile(new_info))

        alert('Update Success')
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
      const response = await fetch(baseURL + `/friend/${state.user.user_id}/block`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (response.ok) {
        alert('Say bye with this user')
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.log('Something failed');
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn,
    handleLogin,
    handleRegister,
    handleLogout,
    update_Profile,
    blockUser
  };
};

export default useAuth;
