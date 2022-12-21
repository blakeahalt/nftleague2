# NFT Tracker
Sign-in with Google or register to follow the top 100 NFT Collections and Individual Sales sorted by day/week/month. All data is tracked using APIs from NFT Stats and CryptoSlam.

## About
This site allows you to track the top trending Individual NFT Sales and Collections using real-time data from CryptoSlam and NFT Stat's APIs.  Users can easily sign in with their Google accounts using the Google OAuth2.0 API or register an account with a username and password. Registered passwords are encrypted with Argon2 and stored in a MySQL database. Users are given access to protected routes by assigning them JWT access/refresh tokens at login.

## Getting Started
From the root: 'npm run dev' concurrently starts the client react app and node server.
You will need to set up your own MySQL or alternate database.
To run dev mode: server.js "require("dotenv").config();" must be togggled on to avoid runtime errors.
Once running, Sign in with Google hits a cors error (blank pop-up). Navigating to 'http://localhost:3000/' will prevent this cors error.

## Installing
"node": "v16.15.1",
"npm": "7.24.2",
see package.json for dependencies
