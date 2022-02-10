const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const app = express();
const port = 8080;



app.use(require("sanitize").middleware);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());


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
    const dbData = require('./databaseFunctions/getUser.js');
    console.log(dbData.getUserData());
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
