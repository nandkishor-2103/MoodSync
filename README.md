# MoodSync - Mood Based Music Player

MoodSync is a full-stack music web app that recommends songs based on the user's facial expression. The idea is simple: the user opens the camera, the app detects their mood, and then shows songs that match that mood.

**Live Project:** https://mood-sync-nu.vercel.app/login

## What This Project Does

MoodSync helps users discover music based on how they feel. Instead of searching for songs manually, users can use their webcam to detect their current mood, such as happy, sad, or surprised. Based on that mood, the app shows matching songs and lets the user play them inside the app.

The project also includes user login, profile management, song upload, mood-wise song filtering, a custom audio player, and recently played history.

## Why I Built This Project

I built MoodSync to practice and demonstrate a complete full-stack MERN application with real-world features. This project connects frontend design, backend APIs, authentication, database management, file upload, cloud storage, and face expression detection in one working application.

It shows that I can build more than simple static pages. I can create a complete product-like application where users can sign up, log in, upload data, interact with the system, and get personalized results.

## Key Features

- User registration and login
- Protected pages for logged-in users
- Profile update functionality
- Webcam-based facial expression detection
- Mood-based song recommendation
- Song upload with mood selection
- MP3 file upload support
- Automatic song title and cover image extraction from audio metadata
- Cloud storage for songs and poster images
- Custom music player with play, pause, seek, volume, mute, and playback speed controls
- Recently played song history
- Responsive user interface for different screen sizes

## How It Works

1. The user creates an account or logs in.
2. The user allows camera access.
3. The app detects the user's facial expression using MediaPipe.
4. The detected expression is converted into a mood like happy, sad, or surprised.
5. The app sends that mood to the backend.
6. The backend searches MongoDB for songs with the same mood.
7. The frontend shows the matching songs.
8. When the user plays a song, it is saved in their recently played history.

## My Responsibilities

I fully developed this project by myself from start to finish. I handled the frontend, backend, database structure, authentication, APIs, cloud file upload, mood detection flow, music player, and deployment setup.

## What I Developed Personally

- Built the complete React frontend using Vite
- Created login, register, profile, home, and upload pages
- Added protected routing so only logged-in users can access private pages
- Built the webcam mood detection feature using MediaPipe
- Created the mood-based song listing feature
- Built a custom audio player with useful controls
- Created the recently played history section
- Built the backend using Node.js and Express.js
- Designed MongoDB models for users, songs, history, and blacklisted tokens
- Implemented JWT-based authentication
- Used cookies to manage user sessions
- Added Redis-based token blacklist for logout handling
- Created APIs for authentication, songs, uploads, and history
- Integrated ImageKit for storing uploaded songs and poster images
- Used ID3 metadata to extract song titles and cover images from MP3 files
- Connected the frontend and backend using Axios APIs

## Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- SCSS
- React Router
- Axios
- React Hot Toast
- MediaPipe

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Redis
- Multer
- ImageKit
- Node ID3

### Tools and Deployment

- Git
- GitHub
- Vercel
- Environment variables

## Project Structure

```text
MoodSync
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   └── services
│   └── server.js
│
└── frontend
    ├── src
    │   ├── assets
    │   ├── features
    │   │   ├── auth
    │   │   ├── expression
    │   │   ├── home
    │   │   ├── shared
    │   │   └── upload
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

## Main Pages

### Login and Register

Users can create an account and log in securely. Passwords are hashed before storing them in the database.

### Home Page

The home page contains the mood detection feature, recommended song list, recently played songs, and the music player.

### Upload Page

Users can upload MP3 songs and select the mood category for each song. The uploaded files are stored in ImageKit.

### Profile Page

Users can update their account details such as username, email, and password.

## Backend API Overview

The backend provides APIs for:

- Registering users
- Logging in users
- Checking the current user session
- Updating profile details
- Uploading songs
- Fetching songs by mood
- Adding songs to history
- Fetching recently played history

## What I Learned

While building MoodSync, I improved my understanding of full-stack development and learned how to connect different parts of a real application. I worked with authentication, protected routes, database models, file upload, cloud storage, API integration, and browser camera access.

This project also helped me understand how to structure a MERN project in a clean way and how to build features that feel useful for real users.

## Future Improvements

- Add more mood categories
- Improve mood detection accuracy
- Add playlist support
- Add search and filter options
- Add admin controls for managing songs
- Add better analytics for listening history

## Short Summary

MoodSync is a complete MERN stack project that uses facial expression detection to recommend music based on the user's mood. I fully developed the project myself, including the frontend, backend, authentication, database, APIs, file upload system, music player, and deployment setup.
