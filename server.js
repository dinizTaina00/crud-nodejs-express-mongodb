const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

//log requests
app.use(morgan("tiny"));

connectDB();

//parse request to bodyparser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//Load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

// Load routes
app.use('/',require('./server/routes/router'));

app.listen(PORT, () => {
  console.log("server funcionando");
});
