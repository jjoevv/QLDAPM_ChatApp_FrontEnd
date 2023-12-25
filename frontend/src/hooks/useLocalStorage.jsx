// localStorageUtils.js
import { useAppContext } from "../context/authContext";
import { loginRequest, loginSuccess, saveStorage } from "../actions/actions";

export const useLocalStorage = () => {
  const {state, dispatch } = useAppContext();

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
    console.log(getFromLocalStorage(key))
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
    console.log(getFromLocalStorage('accessToken'))
    dispatch(loginSuccess(getFromLocalStorage('accessToken')))
    console.log('after refresh state', state)
  }

  return {
    saveToLocalStorage,
    getFromLocalStorage,
    checkLocalStorageAndDispatch,
    refreshLogin
  };
};
