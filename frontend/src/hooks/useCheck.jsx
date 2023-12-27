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
export const isImageFileNameValid = (imageUrl) => {
  if(imageUrl !== undefined){
    const imageRegex = /\.(png|jpeg|jpg)$/i;
    return imageRegex.test(imageUrl)
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
  const supportedFormats = /\.(txt|doc|docx|zip|rar|ppt|pptx|csv|xlsx|xls)$/i;
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

export const isUserIdExistInChatRoom = (list, userIdToCheck) => {
  // Kiểm tra xem userIdToCheck có tồn tại trong danh sách users của mỗi phòng hay không
  const check = room.users.some(user => user.user_id === userIdToCheck);
  alert(userIdToCheck)
  alert(check)
}