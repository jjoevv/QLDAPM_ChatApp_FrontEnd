import { searchFriends } from "../actions/actions";
import { useAppContext } from "../context/authContext"


const getSearch = () => {
    const {state, dispatch} = useAppContext()
  const handleSearchFriends = async (keyword) => {
    try {
      const response = await fetch(baseURL + 'user/detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(searchFriends(keyword))
        
      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message));
      }
    } catch (error) {
      console.log('An error occurred during login.');
    }
  }
  return{
    searchFriends: state.searchFriends,
    handleSearchFriends,
  }
}

export default getSearch