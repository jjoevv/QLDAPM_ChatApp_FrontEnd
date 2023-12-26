import { baseURL } from "./API";

export const userExistInList = (user_id, list) => {
  return list.some((user) => user.user_id === user_id);
}

export const getNotUsername = (list, id) => {
  const user = list.find(item => item.user_id !== id)
  return user.username
}


export const getNotAvatarUser = (list, id) => {
  const user = list.find(item => item.user_id !== id)
  return user.avatar
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

export const isSupportedFormat = (text) => {
  const supportedFormats = /\.(txt|doc|excel|pdf)$/i;
  return supportedFormats.test(text);
};

export const getFilename = (link) => {
  return link.split('-').pop();
}

export function downloadFileFromUrl(fileUrl, fileName) {
  fetch(fileUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'downloaded-file'; // Nếu không có tên file, sẽ đặt tên là 'downloaded-file'
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error downloading file:', error));
}