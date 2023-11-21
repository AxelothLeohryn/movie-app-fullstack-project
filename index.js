require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const passport = require("./config/passport-config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("./auth.js");
const port = 3000;
require("./config/mongo_atlas.js"); // Conexión a BBDD MongoDB

const morgan = require("./middlewares/morgan");
const secret = process.env.secret;
app.set("trust proxy", 1);


app.use(express.json());
app.use(cookieParser());
app.use(express.static('public', { index: false, redirect: false }))
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());


// Logger
app.use(morgan(":method :host :status :url :response-time ms :body"));

const viewsRoutes = require("./routes/views.routes");
const apiRoutes = require("./routes/api.routes");


//Configuracion de Pug
app.set("view engine", "pug");
app.set("views", "./views");

//Rutas
app.use("/", viewsRoutes);
app.use("/api", apiRoutes);

// Para rutas no existentes
app.use("*", (req, res) => {
  res.status(404).json({
    message: "route not found",
  });
});

app.listen(port, () => {
  console.log(`Movie app listening on port http://localhost:${port}`);
});
