Project Overview: Simplified Spotify App

Introduction:
This project presents a simplified Spotify-like application, developed as a full-stack solution using React, Flask, and PostgreSQL. The app allows users to explore music genres, artists, songs, and albums. It leverages the Spotify API to fetch data and presents it through a user-friendly interface.

Features:

Home Page:

Displays four distinct music genres.
Clicking on a genre reveals four artists from that genre.
Further clicking on an artist displays their most popular song.
Clicking on the song redirects the user to the actual song link on Spotify.
Search Bar:

Provides three search options: artist, song, and album.
Users can enter the name of an artist, song, or album.
The search result includes an image and name of the selected item.
Users can hover over and click on the result to access the Spotify page for the item.
Randomizer:

Offers a "Randomize" feature.
Clicking on the randomizer generates a page with five random songs from pre-coded artists.
Login/Register:

Users can register and log in using a username, email, and password.
User data is stored in a PostgreSQL database.
Flask handles data communication to and from the database.
Passwords are securely hashed using the werkzeug.security library for enhanced security.
Technologies Used:

Frontend: React
React is utilized to create a dynamic and responsive user interface. It allows for efficient updating of UI components without requiring full page reloads.

Backend: Flask
Flask serves as the backend framework, handling API requests and responses. It interfaces with the Spotify API to retrieve music data and delivers it to the frontend.

Database: PostgreSQL
PostgreSQL is used to store user registration information securely. It ensures reliable data storage and retrieval for the login/register feature.

API Integration: Spotify API
The Spotify API is accessed via HTTP GET requests to obtain music-related data such as genres, artists, songs, and albums.

RESTful APIs
The project adheres to RESTful principles in designing the API endpoints. This ensures a structured and consistent approach to data retrieval and manipulation.

Conclusion:
This simplified Spotify app demonstrates the integration of React, Flask, and PostgreSQL to provide users with a seamless music exploration experience. It leverages the Spotify API to gather music-related data and presents it in an organized manner through user-friendly features like genre-based artist exploration, search functionality, random song generation, and user registration/login. The project effectively showcases the synergy between frontend and backend technologies to create a cohesive and engaging application.
