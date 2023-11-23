const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MOVIES",
      version: "1.0.0",
    },
  },
  apis: ["./routes/api.routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`http://localhost:${port}/api/api-docs`);
};

module.exports = { swaggerDocs };
