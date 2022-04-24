const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json())
app.use(cors());

//Routers
const user = require("./routes/user");
app.use('/user',user);



app.post("/getUser", (req, res) => {
  let returnData = false;
  if(req.body.data == 'Node'){
    returnData = true;
  }
  res.send({response: returnData});
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
