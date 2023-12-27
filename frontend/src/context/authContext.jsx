import { useReducer, useContext, createContext, useEffect } from "react"
import appReducer from "../reducers/reducer"
import { initialState } from "../reducers/initState"
import { io } from "socket.io-client"

const AppContext = createContext()
const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState)
    /*useEffect(() => {
      const storedIsLoggedIn = localStorage.getItem('accessToken') === 'true';
      console.log(storedIsLoggedIn)
      dispatch({ type: 'SET_LOGGED_IN', payload: storedIsLoggedIn });
    }, []);*/
    return (
        <AppContext.Provider value = {{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}

export { AppContextProvider, useAppContext };