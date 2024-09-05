import React from 'react';
import { IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ThumbnailButton = ({ onChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        id="thumbnail-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="thumbnail-upload">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
};

export default ThumbnailButton;
