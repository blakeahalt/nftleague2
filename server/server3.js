const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const cors = require("cors");
const argon2 = require('argon2');
const crypto = require('crypto');

// app.use(cors());
app.use(cors({ credentials: true }))

app.use(express.json());

// NEW SERVER========================================
// const corsOptions = require('./config/corsOptions');
// const { logger } = require('./middleware/logEvents');
// const errorHandler = require('./middleware/errorHandler');
// const verifyJWT = require('./middleware/verifyJWT');
// const cookieParser = require('cookie-parser');
// const credentials = require('./middleware/credentials');


// // custom middleware logger
// app.use(logger);

// // Handle options credentials check - before CORS!
// // and fetch cookies credentials requirement
// app.use(credentials);

// // Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// // built-in middleware to handle urlencoded form data
// app.use(express.urlencoded({ extended: false }));

// // // built-in middleware for json 
// // app.use(express.json());

// //middleware for cookies
// app.use(cookieParser());

// // //serve static files
// // app.use('/', express.static(path.join(__dirname, '/public')));

// // routes
// app.use('/', require('./routes/root'));
// app.use('/register', require('./routes/register'));
// app.use('/auth', require('./routes/auth'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));

// app.use(verifyJWT);
// app.use('/employees', require('./routes/api/employees'));

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

// app.use(errorHandler);

// NEW SERVER ================================================
// const proxy = require('http-proxy-middleware')

// module.exports = function(app) {
  //     // add other server routes to path array
  //     app.use(proxy(['/api' ], { target: 'http://localhost:5000' }));
  // } 
  
// =======================================
// mysql that works in development
const mysql = require('mysql')
const db = mysql.createConnection({
  user: 'hu6etanlnbizgzv5' ,
  host: 'cwe1u6tjijexv3r6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  password:'g9clxpcv1kdf5jqj',
  database: 'hzgtrybfzcvlvstf'
})

// ========================================
// JawsDB with Node.js
// const JAWSDB_URL = 'mysql://hu6etanlnbizgzv5:g9clxpcv1kdf5jqj@cwe1u6tjijexv3r6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hzgtrybfzcvlvstf'
// var mysql = require('mysql');
// var connection = mysql.createConnection(JAWSDB_URL);

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();
// ==========================================

app.use(function(req, res, next) {
  // res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header('Cross-Origin-Embedder-Policy: unsafe-none || require-corp')
  // res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups" || "same-origin");
  next();
});

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.resolve(__dirname, '/public')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/test", (req, res) => {
  res.json({ message:"WORKING" });
});

app.post("/test", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/GoogleApp", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/notification", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/register", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/profile", (req, res) => {
  res.json({ message:"WORKING" });
});

app.get("/working", (req, res) => {
  res.json({ message:"WORKING" });
});

// app.get("/added", (req, res) => {
//   res.send(res.data.user)
//   res.json({ message: "WORKING" });
// });

// ========================================
const {verifyArg2pw, hashPassword } = require('./Argon2');

app.post("/addPassword", async (req, res) => {
  const {pwd, user} = req.body 
  const hashedPassword = await hashPassword(pwd)
  try {
    const querySelect = "SELECT user FROM passwords WHERE user = ? "
    db.query(querySelect,user, async function (error, results) {
        if (error) throw error;
        // If an account exists
        if (results.length > 0) {
          // parses result and stores in useable variable 'storedHash':
            const storedUser = JSON.parse(JSON.stringify(results[0].user)) 
            if (storedUser == user) {
              console.log("storedUser Already Exists:", storedUser)
              res.status(409)
              res.send('Username Already Exists')
              }
        } else { 
            const queryInsert = "INSERT INTO passwords (arg2pw, user) VALUES (?,?)"
            db.query(queryInsert, [hashedPassword.password, user], (error, result) => {
              if (error) {
                console.log(error)
              } else {
                res.send("Successful Registration")
              }
            })
        }
      })
    } catch (err) {
        console.log("ErRor" + err);
    }
  })

// ========================================

app.post("/login", async (req, res) => {
  const {pwd, user} = req.body 
  try {
    const query = "SELECT arg2pw FROM passwords WHERE user = ? "
    db.query(query,user, async function (error, results) {
        if (error) throw error;
        // If an account exists
        if (results.length > 0) {
          // parses result and stores in useable variable 'storedHash':
          const storedHash = JSON.parse(JSON.stringify(results[0].arg2pw)) 
          // argon2 verification method
          if (await argon2.verify(storedHash, pwd)){
            res.send("Successful Login")
            res.status(200)
          } else {
            res.status(401)  
            res.send("Incorrect Password")
          }
        } else {
          res.status(409)
          res.send("Username Not Found")
        }
      });
    } catch (err) {
      console.log("ErRor" + err);
    }
  })
  
// app.get("/showPasswords", (req, res) => {
//   db.query("SELECT * FROM passwords;", 
//   (err, result) => {
//     if(err) {
//       console.log(err);
//     } else {
//       res.send(result)
//     }
//   })
// })

// app.get("/getUser", (req, res) => {
//   // const {user} = req.body 
// // const user = req.params.user;
// db.query("SELECT * FROM passwords WHERE user = ?", (err, result) => {
//   if(err) {
//     console.log(err);
//   } else {
//     res.send(result)
//     // res.json(result);
//   }

// });
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
  

// This route serves the React app
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "public", "index.html")));
// }

app.listen(port, () => console.log(`Server listening on port ${port}`));