require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const session = require("express-session");
require("./auth.js");
// const mongoose = require("mongoose");
const port = 3000;

const morgan = require("./middlewares/morgan");
const secret = process.env.secret;

app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: secret,
                  resave: false, 
                  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Logger
app.use(morgan(":method :host :status - :response-time ms :body"));

const viewsRoutes = require("./routes/views.routes");
const apiRoutes = require("./routes/api.routes");


//Configuracion de Pug
app.set("view engine", "pug");
app.set("views", "./views");

//Rutas
app.use("/", viewsRoutes);
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Movie app listening on port http://localhost:${port}`);
});
