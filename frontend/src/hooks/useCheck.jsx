import { baseURL } from "./API";
import useChatroom from "./useChatroom";

export const userExistInList = (user_id, list) => {
  return list.some((user) => user.user_id === user_id);
}

export const isNotUser = (list, id) => {
  return list.find(item => item.user_id !== id)
}

export const isImageFileNameValid = (fileName) => {

  // baseURL= 'https://qldapm-api.onrender.com/';
  if (fileName !== undefined) {

    return fileName.includes(baseURL) ? true : false
  }
  return false
}


export const isSingleRoom = (list, user_id) => {
  for (const chatRoom of list) {
    const userExists = chatRoom.users.find((user) => user.user_id === user_id);
    if (userExists) {
      return chatRoom;
    }
  }
  return false
}