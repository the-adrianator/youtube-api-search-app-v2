# YouTube Clone

A responsive YouTube-like video browsing app built with React and Material UI. It features category-based feeds, keyword search, video playback, channel pages, and related videos, powered by the YouTube v3 API via RapidAPI.

## Features

- Browse curated categories on the home feed
- Search videos by keyword with instant navigation
- Watch videos with an embedded player and view counts/likes
- Explore channel pages with recent uploads
- See related videos for deeper discovery
- Modern, responsive UI using Material UI

## Tech Stack

- React 18, React Router v6
- Material UI (MUI) and Emotion
- Axios for API requests
- React Player for video playback
- Create React App tooling

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set environment variables (create a `.env` file in the project root):

   ```bash
   REACT_APP_RAPID_API_KEY=your_rapidapi_key_here
   ```

   The app uses RapidAPI's YouTube v3 endpoint (`youtube-v31.p.rapidapi.com`).

3. Start the development server:

   ```bash
   npm start
   ```

4. Build for production:

   ```bash
   npm run build
   ```

## Project Structure (key files)

- `src/App.js` — routes (`/`, `/video/:id`, `/channel/:id`, `/search/:searchTerm`)
- `src/components/` — UI components (feed, navbar, search, video/channel details)
- `src/utils/fetchFromAPI.js` — Axios client for RapidAPI requests
- `src/utils/constants.js` — categories and demo constants

## Environment

- Required: `REACT_APP_RAPID_API_KEY` (RapidAPI key for YouTube v3)

## Scripts

- `npm start` — run dev server
- `npm run build` — production build

## Notes

- The API returns up to 50 results per request as configured.
- Ensure your RapidAPI subscription is active and the key has access to `youtube-v31`.
