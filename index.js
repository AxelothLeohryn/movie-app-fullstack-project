const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//Configuracion de Pug
app.set("view engine", "pug");
app.set("views", "./views");

//Importar routers
const searchRouter = require("./routes/search.routes");

//Rutas
app.use("/search", searchRouter);






app.listen(port, function () {
  console.log(`Movie app listening on port ${port}!`);
});
