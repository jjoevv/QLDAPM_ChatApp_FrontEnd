import React, {  useState } from 'react'
import {  Image, Button } from 'react-bootstrap'

import EmojiPicker from 'emoji-picker-react'

import FileIcon from './assets/images/file.png'
import ImageIcon from './assets/images/loadimage.png'
import EmojiIcon from './assets/images/emoji.png'
import { downloadFileFromUrl, getFilename, isSupportedFormat } from './hooks/useCheck'

const MyTest = () => {
  const [previewImages, setPreviewImages] = useState([])
  const [previewFiles, setPreviewFiles] = useState([])
  const [selectedImages, setSelectedImages] = useState([])

  const [message, setMessage] = useState('')
  const [isImage, setImage] = useState(false)
  const [isFile, setFile]= useState(false)

  const [isEmoji, setEmoji] = useState(false)

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    console.log(message)
  };


  // Hàm để thêm đường dẫn mới vào danh sách
  const addImagePath = (path) => {
    setImagePaths((prevPaths) => [...prevPaths, path]);
  };

  const handleImageChange =(e)=>{
    setPreviewImages(e.target.files)
    setSelectedImages(e.target.files)
    setImage(true)
    
  }
  const handleFileChange=(e)=>{
    setPreviewFiles(e.target.files)
    setSelectedImages(e.target.files)
    setFile(true)
  }
  const ShowPreviewFiles = () => {
    
    return [...previewFiles].map((file)=> (
      <div className='d-flex flex-row overflow-x-auto'>
        <a href="Download" download>{file.name}</a>
      </div>
    ))
  }
  
  const ShowpreviewImages = () => {
    return [...previewImages].map((image)=> (
      <div className='d-flex flex-row overflow-x-auto'>
        <Image src={URL.createObjectURL(image)} width='50px'/>
      </div>
    ))
  }

  const apiUpload = () => {
    if(selectedImages.length > 0){
      console.log(selectedImages)
    for(const image of selectedImages){
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
            console.log(path)
            sendMessage(path)
            addImagePath(path)
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      }
    }}
    else{
      console.log('GUI MESSAGE')
      sendMessage(message)
    }

    setFile(false)
    setImage(false)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      // Gọi hàm xử lý gửi tin nhắn ở đây (ví dụ: sendMessage())

      sendMessage(message);
    }
  }
  const sendMessage = (content) =>{
    if(content !== ''){
      const msg = {
        content: content,
        room_id: 1,
      }
      console.log('MESSGAE', msg)
    }
    setMessage('')
  }
  const handleDownload = (fileUrl) => {
    
    downloadFileFromUrl(fileUrl, getFilename(fileUrl))
  };
  return (
    <div className='footer fixed-bottom border-top w-100 border-end border-1 border-light-subtle my-1 py-2 '>

      {/**Footer */}
      
      <div className="d-flex overflow-x-auto">
      {ShowpreviewImages()}
      {ShowPreviewFiles()}
        {
            isEmoji && <div ><EmojiPicker emojiStyle='10px' height={300} onEmojiClick={handleEmojiSelect} /></div>
          }
          {
            isSupportedFormat('adasudhas')
            ?
            <button onClick={()=>handleDownload('https://qldapm-api.onrender.com/uploads/avatar/1703614943875-supermarket_sales.xls')}>
             {getFilename('https://qldapm-api.onrender.com/uploads/avatar/1703612952252-example.txt')}
            </button>
            :
            <div className='text-danger'>not fl</div>
          }
      </div>

<div className='d-flex'>
  
        <div>
              <input
                  type="file"
                  multiple
  
                  id="file-input"
                  onKeyDown={handleEnter}
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
                  id="file-input"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
              />
              <label htmlFor="file-input" className="custom-file-upload">
              <Image src={ImageIcon} width={40} className=" p-2" />
              </label>
  
          </div>
          
          <Button onClick={()=>setEmoji(!isEmoji)}>
            <Image src={EmojiIcon} width={25}/>
          </Button>
       
          
          
          <input
            placeholder="Aa"
            autoFocus
            className='rounded-pill p-2 mx-2 border-1 border-secondary w-100'
            autoComplete='off'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleEnter}
            name="input"
            type='text'
          />
          <button onClick={apiUpload}>upload</button>
</div>
    </div>
  )
}

export default MyTest