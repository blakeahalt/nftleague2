const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));


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

app.get("/add", (req, res) => {
  // res.send(res.data.user)
  res.json({ message: "WORKING" });
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.get("/login", (req, res) => {
  res.json({ res });
});



app.post('/register', (req, res) => {
  // console.log("user: ", req.body.user);   //prints to the terminal not console
  // console.log("pwd: ", req.body.pwd); 
  res.json({ message: 'WORKING' });
});

// app.get("/register", (req, res) => {
//   res.json({ user: {} });
// });
// app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});