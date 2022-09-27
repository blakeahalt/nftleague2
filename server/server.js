const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const cors = require("cors");
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
  
const {encrypt, decrypt} = require('./EncryptionHandler')
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
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.resolve(__dirname, '/public')));

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

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

app.get("/added", (req, res) => {
  res.send(res.data.user)
  res.json({ message: "WORKING" });
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.get("/login", (req, res) => {
  res.json({ res });
});



// app.post("/register", (req, res) => {
//   // console.log("user: ", req.body.user);   //prints to the terminal not console
//   // console.log("pwd: ", req.body.pwd); 
//   res.json({ message: 'WORKING' });
// });

app.post("/addPassword", (req, res) => {
  const {pwd, user} = req.body 
  const hashedPassword = encrypt(pwd)

  db.query("INSERT INTO passwords (password, user, iv) VALUES (?,?,?)", [hashedPassword.password, user, hashedPassword.iv],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Success")
    }
  })
});

  
app.get("/showPasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", 
  (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
})

// app.post("/decryptpassword", (req, res) => {
//   res.send(decrypt(req.body));
// });

app.get("/checkPassword", (req, res) => {
  // res.send(decrypt(req.body));
  // const user = req.body.user;
  // const pwd = req.body.pwd;
  // const {user, pwd} = req.body 

  const {pwd, user} = req.body 
  const decryptedPassword = decrypt(pwd)

  db.query(
      "SELECT * FROM passwords WHERE user = ? AND password = ?",
      [user, decryptedPassword.password],
      (err, result)=> {
          if (err) {
              res.send({err: err});
          } else {
            res.send("Success")
          }
        })
          // if (result.length > 0) {
          //     res.send(result);
          //     } else {
          //       res.send({message: 'Wut'});
          //     }
                // else({message: "Wrong username/password comination!"});
})

// app.get("/register", (req, res) => {
//   res.json({ user: {} });
// });
// app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
  

// This route serves the React app
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "public", "index.html")));
// }

app.listen(port, () => console.log(`Server listening on port ${port}`));