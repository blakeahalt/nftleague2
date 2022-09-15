const express = require("express");
// eslint-disable-next-line no-unused-vars
// const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
app.use(cors());
app.use(express.json());

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
  user: 'root' ,
  host: 'cwe1u6tjijexv3r6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	',
  password:'g9clxpcv1kdf5jqj',
  database: 'passwordManager'
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

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

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