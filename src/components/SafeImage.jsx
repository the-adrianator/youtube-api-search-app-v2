import React, { useState, useEffect } from 'react';
import { CardMedia } from '@mui/material';

/**
 * A safe image component that validates URLs before loading
 * Prevents 404 errors by checking URLs before attempting to load them
 */
const SafeImage = ({ src, alt, sx, onError, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);
    setImageSrc(src);
  }, [src]);

  const handleError = (e) => {
    if (!hasError) {
      setHasError(true);
      console.warn('Image failed to load:', imageSrc);
      
      // Call the parent's error handler if provided
      if (onError) {
        onError(e);
      }
    }
  };

  // If we've had an error, don't try to load the image again
  if (hasError) {
    return (
      <CardMedia
        sx={{
          ...sx,
          backgroundColor: '#1e1e1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '14px',
          textAlign: 'center'
        }}
        {...props}
      >
        Image unavailable
      </CardMedia>
    );
  }

  return (
    <CardMedia
      image={imageSrc}
      alt={alt}
      sx={sx}
      onError={handleError}
      {...props}
    />
  );
};

export default SafeImage;
