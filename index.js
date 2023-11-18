require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
// require('./config/mongo_atlas.js') // Conexión a BBDD MongoDB
// require('./config/db_mongo.js') // Conexión a BBDD MongoDB

// const morgan = require("./middlewares/morgan");

app.use(express.json());
app.use(express.static("public"));

// Logger
// app.use(morgan(":method :host :status - :response-time ms :body"));

const viewsRoutes = require("./routes/views.routes");


// esquema de la base de datos mongo
const Movie = require('./models/movies.js')

// const apiRoutes = require("./routes/api.routes");
// const dashboardRoutes = require('./routes/dashboard.routes')
// const moviesRoutes = require("./routes/movies.routes");
// const searchRoutes = require("./routes/search.routes");
// const mongoRoutes = require("./routes/mongo.routes");

// const apiRoutes = require("./routes/api.routes");



async function createMovie(id,title,description,image,year) {
      const movieObject = new Movie({
          id,
          title,
          description,
          image,
          year
      });
  
      const result = await movieObject.save();
      
  }
  

// createMovie('12345750825120957358','tercera peli que debería de aparecer','probando probando a subir la peli 3','https://bestfriends.org/sites/default/files/styles/story_mobile_530_x_298/public/story_images/FirstKittensFoster1501sak_1124x554.jpg','2023')
//Configuracion de Pug
app.set("view engine", "pug");
app.set("views", "./views");


//Rutas
app.use("/", viewsRoutes);
// app.use("/api", apiRoutes);




//Para rutas no existentes
app.use("*", (req, res) => {
  res.status(404).json({
    message: "route not found"
  })
})

app.listen(port, () => {
  console.log(`Movie app listening on port ${port}`);
});






