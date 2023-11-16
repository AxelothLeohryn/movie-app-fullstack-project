const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;


const moviesRouters = require("./routes/movies.route");
app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views','./views');

//Rutas
app.get('/', function(req, res){
    res.render('inicio');
  });
app.use("/api/movies", moviesRouters);






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
