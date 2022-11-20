const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());
const argon2 = require('argon2');

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
require("dotenv").config(); //MUST HAVE to run Dev : COMMENT OUT for Heroku

app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({ credentials: true }));
app.use(express.json());


const jwtAccessKey = process.env.REACT_APP_JWTSECRET;
const jwtRefreshKey = process.env.REACT_APP_REFRESH_TOKEN_SECRET;
const mySQLUser = process.env.REACT_APP_MYSQL_USER;
const mySQLHost = process.env.REACT_APP_MYSQL_HOST;
const mySQLPwd = process.env.REACT_APP_MYSQL_PWD;
const mySQLDatabase = process.env.REACT_APP_MYSQL_DATABASE;

// =======================================
const mysql = require('mysql');
const db = mysql.createConnection({
    user: mySQLUser,
    host: mySQLHost,
    password: mySQLPwd,
    database: mySQLDatabase,
});

// ==========================================

app.use(function (req, res, next) {
    // res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header('Cross-Origin-Embedder-Policy: unsafe-none || require-corp');
    // res.header("Cross-Origin-Opener-Policy", "same-origin");
    res.header(
        'Cross-Origin-Opener-Policy',
        'same-origin-allow-popups' || 'same-origin'
    );
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.resolve(__dirname, '/public')));

app.get('/working', (req, res) => {
    res.json({ message: 'WORKING' });
});

// ========================================
const { hashPassword } = require('./Argon2');

app.post('/addPassword', async (req, res) => {
    const { pwd, user } = req.body;
    const hashedPassword = await hashPassword(pwd);
    try {
        const querySelect = 'SELECT user FROM passwords WHERE user = ? ';
        db.query(querySelect, user, async function (error, results) {
            if (error) throw error;
            // If an account exists
            if (results.length > 0) {
                // parses result and store in useable variable 'storedUser':
                const storedUser = JSON.parse(JSON.stringify(results[0].user));
                if (storedUser == user) {
                    res.status(409);
                    res.send('Username Already Exists');
                }
            } else {
                const queryInsert =
                    'INSERT INTO passwords (arg2pw, user) VALUES (?,?)';
                db.query( queryInsert,[hashedPassword.password, user], (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            const accessToken = jwt.sign(
                                { user: user },
                                jwtAccessKey,
                                { expiresIn: '5m' }
                            );
                            const refreshToken = jwt.sign(
                                { user: user },
                                jwtRefreshKey,
                                { expiresIn: '90d' }
                            );
    
                            refreshTokens.push(refreshToken);
                            // console.log("/login accessToken:", accessToken)
                            // console.log("/login refreshToken:", refreshToken)
                            // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });
                            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
                        }
                    }
                );
            }
        });
    } catch (err) {
        console.log('ErRor' + err);
    }
});

// ========================================
let refreshTokens = []

app.post('/login', async (req, res) => {
    const { pwd, user } = req.body;
    try {
        const query = 'SELECT arg2pw FROM passwords WHERE user = ? ';
        db.query(query, user, async function (error, results) {
            if (error) throw error;
            // If an account exists
            if (results.length > 0) {
                // parses result and stores in useable variable 'storedHash':
                const storedHash = JSON.parse(JSON.stringify(results[0].arg2pw));
                // argon2 verification method
                if (await argon2.verify(storedHash, pwd)) {
                        const accessToken = jwt.sign(
                            { user: user },
                            jwtAccessKey,
                            { expiresIn: '5m' }
                        );
                        const refreshToken = jwt.sign(
                            { user: user },
                            jwtRefreshKey,
                            { expiresIn: '90d' }
                        );

                        refreshTokens.push(refreshToken);
                        // console.log("/login accessToken:", accessToken)
                        // console.log("/login refreshToken:", refreshToken)
                        // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });
                        return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
                } else {
                    res.status(401);
                    res.send('Incorrect Password');
                }
            } else {
                res.status(409);
                res.send('Username Not Found');
            }
        });
    } catch (err) {
        console.log('ErRor' + err);
    }
})

// creates JWT access/refresh tokens for user signing in with Google accounts
app.post('/googlelogin', async (req, res) => {
    const { pwd, user } = req.body;
    try {
        const accessToken = jwt.sign(
            { user: user },
            jwtAccessKey,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { user: user },
            jwtRefreshKey,
            { expiresIn: '90d' }
        );
        refreshTokens.push(refreshToken);
        // console.log("/googlelogin accessToken:", accessToken)
        // console.log("/googlelogin refreshToken:", refreshToken)
        return res.json({accessToken: accessToken, refreshToken: refreshToken})
    } catch (err) {
    console.log('ErRor' + err);
    }
})

app.post("/refresh", (req, res, next) => {
    const refreshToken = req.body.token;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.json({ message: "Refresh token not found, login again" });
    }

    // If the refresh token is valid, create a new accessToken and return it.
    jwt.verify(refreshToken, jwtRefreshKey, (err, decoded) => {
        if (!err) {
            const accessToken = jwt.sign({ user: decoded.user }, jwtRefreshKey, {
                expiresIn: "5m"
            });
            return res.json({ success: true, accessToken });
        } else {
            return res.json({
                success: false,
                message: "Invalid refresh token"
            });
        }
    });
});

// Middleware to authenticate user by verifying his/her jwt-token.
async function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('/protected(auth): Unauthorized request');
      }
    let token = req.headers["authorization"];
    token = token.split(" ")[1]; // Get access token
    // console.log('BearerToken:', token);

    jwt.verify(token, jwtAccessKey, async (err, user) => {
        if (user) {
            req.user = user;
            // console.log('BearerToken:', token);
            next();
        } else if (err.message === "jwt expired" || "invalid signature") {
            return res.json({
                success: false,
                message: "Access token expired"
            });
        } else {
            // console.log(err);
            return res
                .status(403)
                .json({ err, message: "(auth): User not authenticated" });
        }
    });
}

// Checks for access/refresh tokens, then allows access to protected routes
app.post("/protected", auth, (req, res) => {
    return res.json({ message: "Protected content: Accessed" });
});


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));

// This route serves the React app
app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
);
// }

app.listen(port, () => console.log(`Server listening on port ${port}`));
