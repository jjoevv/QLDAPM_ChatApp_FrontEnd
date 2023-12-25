import useAuth from '../../hooks/useAuth';
import useChatroom from '../../hooks/useChatroom'

import { InputGroup, Form, Image, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import SendIcon from './../../assets/images/send.png'
import FileIcon from './../../assets/images/file.png'
import ImageIcon from './../../assets/images/loadimage.png'
import StickerIcon from './../../assets/images/sticker.png'
import EmojiIcon from './../../assets/images/emoji.png'

const SendMessage = ({socket}) => {
  const {room} = useChatroom()
  const [message, setMessage] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  const [isImage, setImage] = useState(false)
  const [isFile, setFile] = useState(false)

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFile(true)
    };
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setImage(true)
    };

    useEffect(()=>{

      const handleUploadImage = () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          
          // Gọi API để tải ảnh lên và nhận URL
          let URL = 'https://qldapm-api.onrender.com/upload/file'
          if(isImage){
            URL = 'https://qldapm-api.onrender.com/upload/image'
          }
          if(isFile){
            URL = 'https://qldapm-api.onrender.com/upload/file'
          }
          fetch(URL, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              const path = `https://qldapm-api.onrender.com/${data.path}`
              console.log(path)
              setMessage(path);
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            });
        }
        console.log(message)
        setMessage('')
      };

      
      handleUploadImage()
    }, [isImage])
  //GUI MESSAGE
  const handleEnter = (e) =>{
    if (e.key === 'Enter') {
      // Gọi hàm xử lý gửi tin nhắn ở đây (ví dụ: sendMessage())
     
      console.log('gui di', message)
      sendMessage();
      setImage(false)
    }
  }
  const sendMessage = () => {
    if (message !== '') {
      console.log('gui den:', room.room_id)
      const msg = {
        content: message,
        room_id: room.room_id
      }
      
      socket.emit('message_text', msg)
      setMessage('');
      setImage(false)
    }
  };

  return (
    <div className='footer border-top w-100 border-end border-1 border-light-subtle my-1 py-1 '>
      
    {/**Footer */}
    {
          isImage || isFile
          &&
          <div className='rounded-2'>
            <img src={imageUrl} style={{ maxWidth: '55%' }} />
          </div>
        }
      <InputGroup className="">
        <InputGroup.Text className='bg-transparent border-0'><Image src={FileIcon} sizes='sm' width={30} />
        <div>
                  <input
                    type="file"
                    id='custom-file-input'
                    style={{ display: 'none', visibility: 'none' }}
                    onChange={handleFileChange}
                  />
                  <label id="custom-file-input" htmlFor="custom-file-input">
                    <Image src={FileIcon} width={40} className=" p-2" />
                  </label>
                </div>
        </InputGroup.Text>
        <InputGroup.Text className='bg-transparent border-0'>
          <div>
                  <input
                    type="file"
                    id='custom-file-input'
                    style={{ display: 'none', visibility: 'none' }}
                    onChange={handleImageChange}
                  />
                  <label id="custom-file-input" htmlFor="custom-file-input">
                    <Image src={ImageIcon} width={40} className=" p-2" />
                  </label>
                </div>
          
        </InputGroup.Text>
        
        
       
        <Form.Control
          placeholder="Aa"
          className='rounded-pill p-2 mx-2 border-1 border-secondary'
          autoComplete='off'
          value={!isImage ? message : ''}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnter}
          name="input"
        />
        <Button onClick={sendMessage} className='bg-transparent border-0'>
          <Image src={SendIcon} sizes='sm' width={30} />
        </Button>
      </InputGroup>
    </div>
  );
};

export default SendMessage;
