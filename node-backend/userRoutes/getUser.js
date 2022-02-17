const express = require("express");
const session = require('express-session')
const app = express();
const router = express.Router();
app.use(session({ secret: "Soer145a-cookie", saveUninitialized: true, resave: true }));

app.use(require("sanitize").middleware);

const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

app.use(bodyParser.urlencoded({ extended: true }));

router.post(
  "/verify-login",
  body("username")
    .notEmpty()
    .matches(/^[a-z0-9]{8,30}$/i),
  body("password")
    .notEmpty()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,30}$/
    ),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }
    const util = require('../utilityFunctions/verifyUser.js');
    
    util.valid(req.body.username, req.body.password, function(data){
      if(data.length){
        session.id = data[0].id;
        session.userName = data[0].user_name;
        session.fullName = `${data[0].user_fName} ${data[0].user_lName}`
        console.log(session);
        res.status(200).json({ message: "Successfully logged in", redir: 1  });
      }else{
        console.log('Not in DB');
        res.status(400).json({ errors: [{value: 400,msg:'Not in system'}], redir: 0  })
      }
    });
  }
);

module.exports = router;
