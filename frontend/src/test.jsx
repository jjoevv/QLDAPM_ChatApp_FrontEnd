import React, { useState } from 'react'

const TaoTest = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
  
    const handleUpload = () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        // Gọi API để tải ảnh lên và nhận URL
        fetch('https://qldapm-api.onrender.com/upload/image', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
              const path =`https://qldapm-api.onrender.com/${data.path}`
            setImageUrl(path);
            console.log(imageUrl)
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      }
    };
  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <img src={imageUrl}/>
    </div>
  )
}

export default TaoTest