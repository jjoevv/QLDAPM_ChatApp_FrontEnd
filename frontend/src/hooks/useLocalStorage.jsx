// localStorageUtils.js
import { useAppContext } from "../context/authContext";
import { loginRequest, loginSuccess, saveStorage } from "../actions/actions";

export const useLocalStorage = () => {
  const {state, dispatch } = useAppContext();

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
    
  };

  const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const checkLocalStorageAndDispatch = () => {
    const userFromLocalStorage = getFromLocalStorage('accessToken');

    if (userFromLocalStorage) {
      dispatch({ type: 'SAVE_TO_LOCAL_STORAGE', payload: userFromLocalStorage });
    }
  };

  const refreshLogin = () => {
    
    dispatch(loginSuccess(getFromLocalStorage('accessToken')))
    
  }

  return {
    saveToLocalStorage,
    getFromLocalStorage,
    checkLocalStorageAndDispatch,
    refreshLogin
  };
};
