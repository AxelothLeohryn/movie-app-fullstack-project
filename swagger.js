const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

(swaggerDocument = require("swagger-jsdoc")),
  (swaggerUi = require("swagger-ui-express"));

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// router.get("/movies", isAuthenticated, checkToken, mongoController.getAllMovies);
// router.get("/movies/details/:id", isAuthenticated, checkToken, searchController.getDetails);
// router.get("/movies/details/:title", isAuthenticated, checkToken, searchController.getCritics);
// router.post("/createMovie", isAuthenticated, checkToken, isAdmin, mongoController.createMovie);
// router.put("/editMovie/:id", isAuthenticated, checkToken, isAdmin, mongoController.editMovie);
// router.delete("/deleteMovie/:id", isAuthenticated, checkToken, isAdmin, mongoController.deleteMovie);
