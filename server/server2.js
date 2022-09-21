const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3001;


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
// app.use(cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);


app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
       user: "root",
       host: "localhost",
       password: "password",
       database: "LoginSystem",
     });
// const db = mysql.createConnection({
//   user: 'hu6etanlnbizgzv5',
//   host: 'cwe1u6tjijexv3r6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   password: 'g9clxpcv1kdf5jqj',
//   database: 'hzgtrybfzcvlvstf'
// })

// ================================================================================================


app.get("/test", (req, res) => {
  res.json({ message: "WORKING" });
});

app.post("/test", (req, res) => {
  res.json({ message: "WORKING" });
});

app.get("/GoogleApp", (req, res) => {
  res.json({ message: "WORKING" });
});

app.get("/notification", (req, res) => {
  res.json({ message: "WORKING" });
});

app.get("/register", (req, res) => {
  res.json({ message: "WORKING" });
});

app.get("/profile", (req, res) => {
  res.json({ message: "WORKING" });
});

app.get("/working", (req, res) => {
  res.json({ message: "WORKING" });
});

app.get("/added", (req, res) => {
  res.send(res.data.user)
  res.json({ message: "WORKING" });
});

// ================================================================================================
// const {encrypt, decrypt} = require('./EncryptionHandler')

// app.post("/addPassword", (req, res) => {
//        const {pwd, user} = req.body 
//        const hashedPassword = encrypt(pwd)

//        db.query("INSERT INTO passwords (password, user, iv) VALUES (?,?,?)", [hashedPassword.password, user, hashedPassword.iv],
//        (err, result) => {
//          if (err) {
//            console.log(err);
//          } else {
//            res.send("Success")
//          }
//        })
//      });

// ================================================================================================

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM passwords WHERE user = ?;", username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.username = result;
            console.log(req.username);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});



app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "public", "index.html")));
// }

app.listen(3001, () => {
  console.log("running server");
});
// app.listen(port, () => console.log(`Server listening on port ${port}`));