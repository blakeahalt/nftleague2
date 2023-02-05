# NFT Sales Tracking Tool
[Link to site](https://nftleague2.herokuapp.com/)

## About
This site allows you to track the top trending Individual NFT Sales and Collections using real-time data from CryptoSlam and NFT Stat's APIs.  Users can easily sign in with their Google accounts using the Google OAuth2.0 API or register an account with a username and password. Registered passwords are encrypted with Argon2 and stored in a MySQL database. Users are given access to protected routes by assigning them JWT access/refresh tokens at login.

## Getting Started
From the root: 'npm run dev' concurrently starts the client react app and node server.
You will need to set up your own MySQL or alternate database.
To run dev mode: server.js "require("dotenv").config();" must be togggled on to avoid runtime errors.
Once running, Sign in with Google hits a cors error (blank pop-up). Navigating to 'http://localhost:3000/' will prevent this cors error.

## Installing
"node": "v16.15.1",
"npm": "7.24.2"

see package.json for dependencies

## Getting Started
Numerous `.env` passwords are used, which you will also need to set up in your own repo. Some include creating your own mySQL database. Here is a reference guide of the .env variables I've used.
```
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_CLIENTID='string'
REACT_APP_JWTSECRET='string'
REACT_APP_REFRESH_TOKEN_SECRET='string'
REACT_APP_MYSQL_USER='string'
REACT_APP_MYSQL_HOST='string'
REACT_APP_MYSQL_PWD='string'
REACT_APP_MYSQL_DATABASE='string'
```

Unless you create these variables in your own environment, I don't believe this application will successfully start for you.

To run dev mode: ./server/server.js "require("dotenv").config();" on line 12 must not be commented out.
In the terminal `npm run dev` will concurrently run the server.js file and react-scripts.

Once running, if Google throws a cors error (blank pop-up). Navigate to [http://localhost:3000](http://localhost:3000) which should allow you to sign in with your Google account.

To run production mode: ./server/server.js "require("dotenv").config();" on line 12 must be commented out and the `.env` variables above must be set in whatever platform you're trying to deploy to.
  
## Installing
"node": "v16.15.1",
"npm": "7.24.2"

see package.json for dependencies
