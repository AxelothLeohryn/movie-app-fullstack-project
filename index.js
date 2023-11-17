require("dotenv").config();
const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const port = 3000;

const morgan = require("./middlewares/morgan");

app.use(express.json());
app.use(express.static("public"));

// Logger
app.use(morgan(":method :host :status - :response-time ms :body"));

const viewsRoutes = require("./routes/views.routes");
const apiRoutes = require("./routes/api.routes");
// const dashboardRoutes = require('./routes/dashboard.routes')
// const moviesRoutes = require("./routes/movies.routes");
// const searchRoutes = require("./routes/search.routes");

//Configuracion de Pug
app.set("view engine", "pug");
app.set("views", "./views");

//Rutas
app.use("/", viewsRoutes);
// app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Movie app listening on port ${port}`);
});
