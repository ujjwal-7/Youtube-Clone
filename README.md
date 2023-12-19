# YouTube Clone

This project is a comprehensive video-sharing platform designed to replicate the core functionalities of YouTube while offering an intuitive and user-friendly experience.

**Live Project:** [YouTube Clone](https://youtube-clone-ujjwals-projects-256a0475.vercel.app/)


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation Steps](#installation-steps)

## Features

- **User Authentication:** Users can sign up and log in using their email and password, enjoying personalized features such as liking videos and tracking viewing history.
  
- **Video Search:** The application allows users to search for videos based on keywords, titles, or categories.

- **Category-wise Videos:** Videos are categorized to enhance the user experience and make content discovery easier.

- **Video Playback:** Users can watch videos seamlessly with the built-in video player.

- **User-specific History Tracking:** The application tracks the user's viewing history, allowing them to revisit previously watched videos.

- **Liked Videos Storage:** Users can like videos, and the application stores their liked videos using Firebase Cloud Firestore for quick access.

## Tech Stack

- **React.js:** A JavaScript library for building user interfaces, providing a fast and interactive user experience.

- **Tailwind CSS:** A utility-first CSS framework that simplifies the styling process and ensures a consistent design.

- **React Router Dom:** A library for routing in React applications, enabling navigation and URL management.

- **Firebase:** A cloud-based platform that provides services such as authentication and real-time database (Firestore), facilitating backend functionalities.

## Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/ujjwal-7/Youtube-Clone.git

2. Navigate to the project directory:

   ```bash
   cd Youtube-Clone

3. Install dependencies:

   ```bash
   npm install

4. Set up Firebase:

  - Create a Firebase project on the Firebase Console.
  - Configure authentication settings.
  - Obtain your Firebase configuration and replace the placeholders in src/firebase/config.js with your actual configuration.
  - Enable Firebase Authentication and set up the necessary providers (Email/Password).
  - Set up Firebase Cloud Firestore.

5. Start the development server:

   ```bash
   npm start

6. Open your browser and visit http://localhost:3000 to view the application.


