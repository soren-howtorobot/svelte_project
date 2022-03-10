const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json())
app.use(cors());
const userRoutes = require('./userRoutes/getUser.js')
app.use('/user',userRoutes);

app.get("/getUser", (req, res) => {
  let returnData = "Hello World!";
  res.send(returnData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
