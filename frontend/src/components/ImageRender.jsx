// ImageRenderer.js
import React, { useState, useEffect } from 'react';
import { baseURL } from '../hooks/API';
import { Image } from 'react-bootstrap';
const ImageRenderer = ({ imageUrl, isSender }) => {
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [sender, setSender] =useState(isSender)
  return (
    <div className={sender ? 'text-end' : ''}>
      {imageSrc ? 
        <Image src={imageUrl} width={250} rounded style={{ maxWidth: '70%', height: 'auto' }}/>
       : (
        <div className="rounded-2 p-1 border-danger">
          
          Image Error
        </div>
      )}
    </div>
  );
};

export default ImageRenderer;
