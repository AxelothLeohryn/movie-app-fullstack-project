require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const passport = require("./config/passport-config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const path = require('path'); 

require("./auth.js");
const port = 3000;
require("./config/mongo_atlas.js"); // Conexión a BBDD MongoDB

//docuemntación
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { swaggerDocs } = require("./routes/swagger");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MOVIES",
      version: "1.0.0",
    },
  },
  apis: ["./routes/api.routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const morgan = require("./middlewares/morgan");
const secret = process.env.secret;
app.set("trust proxy", 1);

app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public", { index: false, redirect: false }));
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
app.use(
  //fix de helmet para que se muestren las imagenes de las tarjetas
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
      "script-src": ["'self'", "https://cdn.jsdelivr.net"],
      "frame-src": ["'self'", "https://www.youtube.com"]
    },
  })
);

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
  swaggerDocs(app, port);
});
