import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onImageUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreviewImage(URL.createObjectURL(file));

    // Gọi hàm callback để truyền dữ liệu hình ảnh ra bên ngoài component
    onImageUpload(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div style={uploaderStyle}>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Thả hình ảnh vào đây hoặc click để chọn.</p>
      </div>
      {previewImage && (
        <div style={{width: '80px', height: "100px"}}>
          <p>Ảnh xem trước:</p>
          <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

const uploaderStyle = {
  flex: 1,
  height:'100vh',
}

const dropzoneStyle = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImageUploader;
