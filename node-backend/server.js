const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const app = express();
const port = 8080;

require('./databaseFunctions/getUser.js');

app.use(require("sanitize").middleware);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());

let db = new sqlite3.Database("forumDB.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("connected to ForumDB");
});


app.get("/getUser", (req, res) => {
  let returnData = "Hello World!";
  res.send(returnData);
});

app.post(
  "/verify-login",
  body('username').notEmpty().matches(/^[a-z0-9]{8,30}$/i),
  body('password').notEmpty().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,30}$/),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }
    
    let isinDB = db.get(`SELECT * FROM users WHERE username = ? AND password = ?`,[req.body.username,req.body.password],(err,row) =>{
      if (err) {
        return console.error(err.message);
      }
      return row ? console.log(row) : console.log('Not in db');
    });
    console.log('is in db?',isinDB);
    res.status(200).json({ response: "hi mom, we good" });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
