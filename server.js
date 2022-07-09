const express = require("express");
const morgan = require("morgan");
const color = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const debug = require("debug")("app:server");
const { db } = require("./src/db"); //import db

//import routes from src/routes/index
//const routes = require('./src/routes/index);

//check DB connection
db.authenticate()
  .then((res) => debug(color.yellow.inverse("Database is connected")))
  .catch((err) => {
    debug(
      color.red.inverse("There was an error connecting to the database"),
      err
    );
    process.exit(1); //NODE TERMINATE SERVER
  });

const app = express();

//check MODE in .env
if (process.env.MODE === "development") {
  app.use(morgan("dev"));
}

//dotenv config
dotenv.config({ path: path.join(__dirname, ".env") });
//app.use for static pages
app.use(express.static(path.join(__dirname, "src", "public")));
//app.use json
app.use(express.json()); //server can speak in json

//app.use to use routes
//app.use('/api', routes);

//const for PORT
const PORT = process.env.PORT || 8000;

//server const = app.listen to show server is up and running
const server = app.listen(PORT, () => {
  debug(color.rainbow(`Server is up and running on PORT: ${PORT}`));
});
