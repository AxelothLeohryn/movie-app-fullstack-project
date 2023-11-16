const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

const productsRouters = require("./routes/movies.route");

app.use(express.json());

app.use("/api/movies");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
