const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MOVIES",
      version: "1.0.0",
    },
    components: {
      schemas: {
        MovieDetails: {
          type: "object",
          properties: {
            title: { type: "string" },
            director: { type: "string" },
            year: { type: "integer" },
            length: { type: "string" },
            image: { type: "string" },
            genres: {
              type: "array",
              items: { type: "string" },
            },
            actors: {
              type: "array",
              items: { type: "string" },
            },
            trailer: { type: "string" },
            overview: { type: "string" },
          },
          required: [
            "title",
            "director",
            "year",
            "length",
            "image",
            "genres",
            "actors",
            "trailer",
            "overview",
          ],
        },
      },
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
