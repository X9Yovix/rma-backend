const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Recipe Management Application API",
    version: "1.0.0",
    description: "",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./api/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
