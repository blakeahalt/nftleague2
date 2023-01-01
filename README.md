# NFT Sales Tracking Tool
#### Video Demo:  <URL HERE>


## About
Sign-in with your Google account or register an account to follow the top 100 NFT Collections and Individual NFT Sales sorted by day/week/month. All data is tracked using APIs from CryptoSlam, NFT Stats, and OpenSea.

Implementing Google OAuth2.0 allows users to easily sign in with their Google accounts or new users can register an account with a username and password. Registered passwords are encrypted with Argon2 and stored in a MySQL database. Users are given access to protected routes by assigning access/refresh JSON Web Tokens at login.

## Challenges
The original goal of this project was intended to be a fantasy league for NFT assets. Since I was unable to obtain an OpenSea API key to track specific sales data, the project's goal changed to providing concise data related to NFT assets and collections sales.

One challenge occured when the CryptoSlam API data changed during the development of the project which caused some useful data to be lost. For example, a convenient 'last sold' string was replaced with ISO 8601 time-related data.  However, I was able to create a feature that replicated the original data. Here's an example of the feature converting the ISO 8601 data to a readable string:
```
"saleAt": "2022-12-31T19:18:35Z"
"saleAt": "3 hours ago"
```

I was forced to make design adjustments for the NFT Stats API data because it was causing loading errors. I implelemented a 'View Collection' button as well as pagination to try and mitigate the loading crashes. I was able to address the crashing issues, but the solution is not optimal and doesn't always immediately load. While I don't completely understand the nature of the cause, I suspect it has something to do with the cache.

Another challenge was implementing JSON Web Tokens in order to provide users access to protected routes. This was a giant leap in terms of complexity since it involved verifying Argon2 encrypted passwords that were stored in a MySQL database, correctly assigning the JSON Web Tokens to the user, and implementing a new feature that accounted for protected routes. In addition, there needed to be a feature that assigned JSON Web Tokens to the Google account users. Even though Google OAuth comes with their own access/refresh tokens, they were not compatible with my project's verification system. In the end, the project successfully implements JSON Web Tokens to all users while protecting specific routes from non-users.

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

Once running, Sign in with Google hits a cors error (blank pop-up). Navigating to 'http://localhost:3000' or 'http://localhost:3001'  will prevent this error and allow you to sign in with your Google account.

To run production mode: ./server/server.js "require("dotenv").config();" on line 12 must be commented out and the `.env` variables above must be set in whatever platform you're trying to deploy to.
  
## Installing
"node": "v16.15.1",
"npm": "7.24.2"

see package.json for dependencies
