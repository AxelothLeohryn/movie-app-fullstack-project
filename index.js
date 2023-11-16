const express = require("express");
const app = express();
const port = 3000;

const dashboardRoutes = require('./routes/dashboard.routes')

app.use(express.json());



app.use('/dashboard', dashboardRoutes);
app.set('view engine','pug');
app.set('views','./views')


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  });
  