import { Link } from 'react-router-dom';
import { Typography, Card, CardContent } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';
import { getBestThumbnailUrl, getFallbackThumbnails, isValidVideoId, isProblematicVideoId } from '../utils/thumbnailUtils';
import SafeImage from './SafeImage';

const VideoCard = ({video: {id: {videoId}, snippet}}) => {
  // Check if the video ID is valid before proceeding
  if (!isValidVideoId(videoId)) {
    console.warn('Invalid video ID detected:', videoId, 'for video:', snippet?.title);
  }

  // Check if the video ID is known to be problematic
  if (isProblematicVideoId(videoId)) {
    console.warn('Problematic video ID detected:', videoId, 'for video:', snippet?.title);
  }

  // Function to handle image load errors with multiple fallbacks
  const handleImageError = (e) => {
    const currentSrc = e.target.src;
    
    // Log the failed URL for debugging
    console.warn('Thumbnail failed to load:', currentSrc, 'for video:', snippet?.title, 'Video ID:', videoId);
    
    // If it's already a placeholder, don't try to change it
    if (currentSrc.includes('via.placeholder.com') || currentSrc.includes('picsum.photos')) {
      return;
    }
    
    // Get fallback options using utility function
    const fallbackOptions = getFallbackThumbnails(snippet, currentSrc, videoId);
    
    // Find the next fallback that's different from current src
    const nextFallback = fallbackOptions.find(url => url !== currentSrc);
    
    if (nextFallback) {
      console.log('Trying fallback thumbnail:', nextFallback);
      e.target.src = nextFallback;
    }
  };

  return (
    <Card sx={{ width: '355px', boxShadow: 'none', borderRadius: 0 }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <SafeImage 
          src={getBestThumbnailUrl(snippet, videoId)}
          alt={snippet?.title}
          sx={{ width: 358, height: 180 }}
          onError={handleImageError}
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color='#FFF'>
            {snippet?.title?.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography variant="subtitle2" fontWeight="bold" color='gray'>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px'}} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default VideoCard