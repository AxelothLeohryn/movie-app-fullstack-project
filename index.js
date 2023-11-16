const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views','./views');

//Rutas
app.get('/', function(req, res){
    res.render('inicio');
  });



app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  });
  