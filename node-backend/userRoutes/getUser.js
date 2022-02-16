const express = require("express");
const app = express();
const router = express.Router();

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
      
      res.status(200).json(data);

    });
    
    
    

    
    
  }
);

module.exports = router;
