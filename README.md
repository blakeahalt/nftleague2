# NFT Tracker
Sign in to follow the top 100 NFT collections sorted by day/week/month tracked with NFT Stats API and the top 100 NFT collections & top 100 individual NFT sales sorted by day/week/month tracked by CryptoSlam's API.

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Installing](#installing)
- [Usage](#usage)
- [Contributing](#contributing)

## About
This site allows you to track the top trending individual NFT sales and collections using real-time data from CryptoSlam and NFT Stat's APIs.  Users can easily sign in with their Google accounts using the Google OAuth2.0 API or register an account with a username and password. Registered passwords are encrypted with Argon2 and stored in a MySQL database. Users are given access to protected routes with JWT access/refresh tokens assigned to them at login.

## Getting Started
From the root: 'npm run dev' concurrently starts the client react app and node server.
To run dev the server.js must toggle "require("dotenv").config();" in order to avoid runtime errors. 
Once running, Sign in with Google hits a cors error (blank pop-up). Navigating to 'http://localhost:3000/' will prevent this cors error.
You will also need to set up your own MySQL or alternate database.

## Installing
Installation instructions.

## Usage
A step by step series of examples that tell you how to get a development env running.

## Contributing
Contributors names.