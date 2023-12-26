import useChatroom from '../../hooks/useChatroom'

import { Image, Button } from 'react-bootstrap';
import React, {useState } from 'react';

import EmojiPicker from 'emoji-picker-react'



import SendIcon from './../../assets/images/send.png'
import FileIcon from './../../assets/images/file.png'
import ImageIcon from './../../assets/images/loadimage.png'
import StickerIcon from './../../assets/images/sticker.png'
import EmojiIcon from './../../assets/images/emoji.png'

const SendMessage = ({ socket }) => {
  const { room } = useChatroom()
  const [previewImages, setPreviewImages] = useState([])
  const [previewFiles, setPreviewFiles] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [isEmoji, setEmoji] = useState(false)
  const [message, setMessage] = useState('')
  const [isImage, setImage] = useState(false)
  const [isFile, setFile] = useState(false)

  
  const handleImageChange = (e) => {
    setPreviewImages(e.target.files)
    setSelectedImages(e.target.files)
    setImage(true)

  }
  const handleFileChange = (e) => {
    setPreviewFiles(e.target.files)
    setSelectedImages(e.target.files)
    setFile(true)
  }
  /**Preview */
  const ShowPreviewFiles = () => {

    return [...previewFiles].map((file) => (
      <div className='d-flex flex-row overflow-x-auto'>
        <div className='p-2 rounded-3 bg-secondary mx-2'>{file.name}</div>
      </div>
    ))
  }

  const ShowpreviewImages = () => {
    return [...previewImages].map((image) => (
      <div className='d-flex flex-row overflow-x-auto'>
        <Image className='rounded-2' src={URL.createObjectURL(image)} width='60px' />
      </div>
    ))
  }

  const apiUpload = () => {
    if (selectedImages.length > 0) {
      console.log(selectedImages)
      for (const image of selectedImages) {
        if (image) {
          const formData = new FormData();
          formData.append('file', image);

          // Gọi API để tải ảnh lên và nhận URL
          let URL = 'https://qldapm-api.onrender.com/upload/file'
          if (isImage) {
            URL = 'https://qldapm-api.onrender.com/upload/image'
          }
          if (isFile) {
            URL = 'https://qldapm-api.onrender.com/upload/file'

          }
          fetch(URL, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              
              const path = `https://qldapm-api.onrender.com/${data.path}`
              
              sendMessage(path)
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            });
        }
      }
    }
    else {
      console.log('GUI MESSAGE')
      sendMessage(message)
    }
  }


  /** Emoji*/

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  /**SendMessage */
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      sendMessage(message);
    }
  }
  const sendMessage = (content) => {
    if (content !== '') {
      const msg = {
        content: content,
        room_id: room.room_id,
      }
      socket.emit('message_text', msg)

      console.log('MESSGAE', msg)
    }
    setMessage('')
    setPreviewImages([])
    setPreviewFiles([])
    setFile(false)
    setImage(false)
  }

  return (
    <div className='footer border-top w-100 border-end border-1 border-light-subtle my-1 py-2 '>

      {/**Footer */}

      
      <div className="d-flex overflow-x-auto px-3 mb-2">
        {ShowpreviewImages()}
        {ShowPreviewFiles()}
        <div style={{zIndex: '1'}} className='position-absolute'>{isEmoji && <div ><EmojiPicker height={300} onEmojiClick={handleEmojiSelect} /></div>}</div>    
      </div>

      <div className='d-flex align-items-center'>

        <div>
          <input
            type="file"
            multiple

            id="file-input"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="file-input" className="custom-file-upload">
            <Image src={FileIcon} width={40} className=" p-2" />
          </label>

        </div>
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            id="image-input"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-input" >
            <Image src={ImageIcon} width={40} className=" p-2" />
          </label>

        </div>
        <Button className="bg-transparent border-0" onClick={()=>setEmoji(!isEmoji)}>
          <Image src={EmojiIcon} width={25} />
        </Button>
        <Button className="bg-transparent border-0">
          <Image src={StickerIcon} width={24} />
        </Button>
        <input
          placeholder="Aa"
          className='rounded-pill p-2 mx-2 border-1 border-secondary w-100 form-control-sm'
          autoComplete='off'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnter}
          name="input"
          type='text'
        />

        
        <button onClick={apiUpload} className='border-0'>
          <Image src={SendIcon} width={25} />
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
