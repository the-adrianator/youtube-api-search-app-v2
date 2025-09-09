// Utility functions for handling YouTube thumbnails

/**
 * Validates if a YouTube thumbnail URL is properly formatted
 * @param {string} url - The thumbnail URL to validate
 * @returns {boolean} - True if the URL is valid, false otherwise
 */
export const isValidYouTubeThumbnail = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // YouTube thumbnails should have the format: https://i.ytimg.com/vi/VIDEO_ID/quality.jpg
  // Also support live thumbnails with _live.jpg extension
  const youtubeThumbnailPattern = /^https:\/\/i\.ytimg\.com\/vi\/[a-zA-Z0-9_-]+\/(hqdefault|mqdefault|default|maxresdefault)(_live)?\.jpg$/;
  return youtubeThumbnailPattern.test(url);
};

/**
 * Checks if a video ID is likely to have valid thumbnails
 * @param {string} videoId - The YouTube video ID
 * @returns {boolean} - True if the video ID looks valid
 */
export const isValidVideoId = (videoId) => {
  if (!videoId || typeof videoId !== 'string') return false;
  
  // YouTube video IDs are typically 11 characters long and contain alphanumeric characters, hyphens, and underscores
  const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;
  return videoIdPattern.test(videoId);
};

/**
 * Known problematic video IDs that should use placeholders
 */
const PROBLEMATIC_VIDEO_IDS = [
  'kWGhsIu_Kn8',
  'jF1rW3CMOTQ',
  // Add more problematic IDs as they're discovered
];

/**
 * Checks if a video ID is known to be problematic
 * @param {string} videoId - The YouTube video ID
 * @returns {boolean} - True if the video ID is known to be problematic
 */
export const isProblematicVideoId = (videoId) => {
  return PROBLEMATIC_VIDEO_IDS.includes(videoId);
};

/**
 * Generates a YouTube thumbnail URL for a given video ID
 * @param {string} videoId - The YouTube video ID
 * @param {string} quality - The thumbnail quality (hqdefault, mqdefault, default, maxresdefault)
 * @returns {string} - The generated thumbnail URL
 */
export const generateYouTubeThumbnailUrl = (videoId, quality = 'hqdefault') => {
  if (!isValidVideoId(videoId)) {
    return getPlaceholderThumbnail();
  }
  
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Gets the best available thumbnail URL from a video snippet
 * @param {object} snippet - The video snippet object from YouTube API
 * @param {string} videoId - The video ID (optional, for fallback generation)
 * @returns {string} - The best available thumbnail URL or a placeholder
 */
export const getBestThumbnailUrl = (snippet, videoId = null) => {
  // Immediately return placeholder for known problematic video IDs
  if (videoId && isProblematicVideoId(videoId)) {
    console.warn('Using placeholder for known problematic video ID:', videoId);
    return getPlaceholderThumbnail(snippet?.title);
  }

  if (!snippet || !snippet.thumbnails) {
    // Try to generate a thumbnail URL if we have a video ID
    if (videoId && isValidVideoId(videoId)) {
      return generateYouTubeThumbnailUrl(videoId);
    }
    return getPlaceholderThumbnail(snippet?.title);
  }

  // Try different thumbnail qualities in order of preference
  const thumbnailOptions = [
    snippet.thumbnails.maxres?.url,
    snippet.thumbnails.high?.url,
    snippet.thumbnails.medium?.url,
    snippet.thumbnails.default?.url
  ];
  
  // Find the first valid thumbnail URL
  const validThumbnail = thumbnailOptions.find(url => {
    if (!url) return false;
    
    // Check if it's a valid YouTube thumbnail format
    const isValid = isValidYouTubeThumbnail(url);
    
    // If it's not valid, log it for debugging
    if (!isValid) {
      console.warn('Invalid thumbnail URL detected:', url, 'for video:', snippet.title);
    }
    
    return isValid;
  });
  
  // If no valid YouTube thumbnail, try to generate one if we have a video ID
  if (!validThumbnail && videoId && isValidVideoId(videoId)) {
    console.log('Generating thumbnail URL for video ID:', videoId);
    return generateYouTubeThumbnailUrl(videoId);
  }
  
  // If still no valid thumbnail, use a placeholder
  if (!validThumbnail) {
    // Log warning for debugging
    console.warn('No valid YouTube thumbnail found for video:', snippet.title, 'Available thumbnails:', thumbnailOptions);
    return getPlaceholderThumbnail(snippet.title);
  }
  
  return validThumbnail;
};

/**
 * Creates a placeholder thumbnail URL
 * @param {string} title - The video title to use in the placeholder
 * @returns {string} - A placeholder thumbnail URL
 */
export const getPlaceholderThumbnail = (title) => {
  // Use a more reliable placeholder service
  return `https://picsum.photos/480/360?random=${Math.random()}`;
};

/**
 * Gets fallback thumbnail options for error handling
 * @param {object} snippet - The video snippet object from YouTube API
 * @param {string} currentSrc - The current image source that failed
 * @param {string} videoId - The video ID (optional, for generating fallback URLs)
 * @returns {string[]} - Array of fallback thumbnail URLs
 */
export const getFallbackThumbnails = (snippet, currentSrc, videoId = null) => {
  const fallbacks = [];
  
  if (snippet?.thumbnails) {
    // Add medium quality if different from current
    if (snippet.thumbnails.medium?.url && 
        snippet.thumbnails.medium.url !== currentSrc && 
        isValidYouTubeThumbnail(snippet.thumbnails.medium.url)) {
      fallbacks.push(snippet.thumbnails.medium.url);
    }
    
    // Add default quality if different from current
    if (snippet.thumbnails.default?.url && 
        snippet.thumbnails.default.url !== currentSrc && 
        isValidYouTubeThumbnail(snippet.thumbnails.default.url)) {
      fallbacks.push(snippet.thumbnails.default.url);
    }
  }
  
  // Try to generate fallback URLs using the video ID
  if (videoId && isValidVideoId(videoId)) {
    const generatedFallbacks = [
      generateYouTubeThumbnailUrl(videoId, 'mqdefault'),
      generateYouTubeThumbnailUrl(videoId, 'default')
    ].filter(url => url !== currentSrc);
    
    fallbacks.push(...generatedFallbacks);
  }
  
  // Always add placeholder as final fallback
  fallbacks.push(getPlaceholderThumbnail(snippet?.title));
  
  return fallbacks;
};
