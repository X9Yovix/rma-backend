const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Recipe Management Application API",
    version: "1.0.0",
    description: "API documentation",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
  tags: [
    {
      name: "Users",
      description: "Operations related to users",
    },
    {
      name: "Recipes",
      description: "Operations related to recipes",
    },
  ],
  "x-tagGroups": [
    {
      name: "User Management",
      tags: ["User"],
    },
    {
      name: "Recipe Management",
      tags: ["Recipes"],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
