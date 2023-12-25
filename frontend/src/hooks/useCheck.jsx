import { baseURL } from "./API";
import useChatroom from "./useChatroom";

export const userExistInList = (user_id, list)=> {
  return list.some((user) => user.user_id === user_id);
}

export const isNotUser = (list, id) =>{
  return list.find(item => item.user_id !== id)
}
export const userExistsInFriends = (user_id, friends) => {
    return friends.some((friend) => friend.user_id === user_id);
};

export const userExistsInSends = (user_id, friends) => {
    return friends.some((friend) => friend.user_id === user_id);
};

export const isImageFileNameValid = (fileName) => {
    
    const invalidFileNamesRegex = /^(avatar\.png|default\.png)$/i;
  
    return !invalidFileNamesRegex.test(fileName) && fileName !== '' && fileName !== null && fileName !== undefined;
  }



  export const isMessageasImage = (path) => {
    const urlString = 'https://qldapm-api.onrender.com/';
    return path.includes(baseURL) ? true : false
  }

  export const isSingleRoom = (list, user_id) => {
    for (const chatRoom of list) {
      console.log(chatRoom)
      const userExists = chatRoom.users.some((user) => user.user_id === user_id);
      if (userExists) {
        return chatRoom;
      }
    }
    return false
  }