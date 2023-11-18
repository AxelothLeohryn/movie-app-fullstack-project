require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
require('./config/mongo_atlas.js') // Conexión a BBDD MongoDB
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

// coneción a atlas (copiado de atlas)

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://elena_del_rio:20404020@movie-app.6m5tlpe.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


//Rutas
app.use("/", viewsRoutes);
// app.use("/api", apiRoutes);


app.listen(port, () => {
  console.log(`Movie app listening on port ${port}`);
});






