import axios from "axios";

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromAPI = async (url) => {
  try {
    // Check if API key is available
    if (!process.env.REACT_APP_RAPID_API_KEY) {
      console.warn('RapidAPI key is not configured. Using mock data.');
      return getMockData();
    }

    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Return mock data when API fails (both development and production)
    console.warn('Using mock data due to API error');
    return getMockData();
  }
}

// Mock data function for when API fails
const getMockData = () => {
  return {
    items: [
      {
        id: { videoId: 'dQw4w9WgXcQ' },
        snippet: {
          title: 'Rick Astley - Never Gonna Give You Up (Official Video)',
          channelTitle: 'Rick Astley',
          channelId: 'UCuAXFkgsw1L7xaCfnd5JJOw',
          thumbnails: {
            high: {
              url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
            },
            medium: {
              url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg'
            },
            default: {
              url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg'
            }
          }
        }
      },
      {
        id: { videoId: 'jNQXAC9IVRw' },
        snippet: {
          title: 'Me at the zoo',
          channelTitle: 'jawed',
          channelId: 'UC4QobU6STFB0P71PMvOGN5A',
          thumbnails: {
            high: {
              url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg'
            },
            medium: {
              url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg'
            },
            default: {
              url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/default.jpg'
            }
          }
        }
      },
      {
        id: { videoId: 'kJQP7kiw5Fk' },
        snippet: {
          title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
          channelTitle: 'Luis Fonsi',
          channelId: 'UCxoq-PAQeAdk_zyx8UGDNlA',
          thumbnails: {
            high: {
              url: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg'
            },
            medium: {
              url: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg'
            },
            default: {
              url: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/default.jpg'
            }
          }
        }
      },
      {
        id: { videoId: '9bZkp7q19f0' },
        snippet: {
          title: 'PSY - GANGNAM STYLE (강남스타일) M/V',
          channelTitle: 'officialpsy',
          channelId: 'UCrA7l4T7l4T7l4T7l4T7l4T',
          thumbnails: {
            high: {
              url: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg'
            },
            medium: {
              url: 'https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg'
            },
            default: {
              url: 'https://i.ytimg.com/vi/9bZkp7q19f0/default.jpg'
            }
          }
        }
      },
      {
        id: { videoId: 'YQHsXMglC9A' },
        snippet: {
          title: 'Adele - Hello',
          channelTitle: 'Adele',
          channelId: 'UCsRM0YBdabIep8k_4Vnfp_w',
          thumbnails: {
            high: {
              url: 'https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg'
            },
            medium: {
              url: 'https://i.ytimg.com/vi/YQHsXMglC9A/mqdefault.jpg'
            },
            default: {
              url: 'https://i.ytimg.com/vi/YQHsXMglC9A/default.jpg'
            }
          }
        }
      }
    ]
  };
}