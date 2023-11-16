const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;


const dashboardRoutes = require('./routes/dashboard.routes')


const moviesRouters = require("./routes/movies.route");

app.use(express.json());



//Rutas
app.get('/', function(req, res){
    res.render('inicio');
  });
app.use("/api/movies", moviesRouters);


app.use('/dashboard', dashboardRoutes);
app.set('view engine','pug');
app.set('views','./views')





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
