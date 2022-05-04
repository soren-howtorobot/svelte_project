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

const mons = require("./routes/pokemons");
app.use("/pokemons", mons);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
