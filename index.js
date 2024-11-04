const express = require("express");
const dontenv = require("dotenv");
dontenv.config();

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger");
const dbConnection = require("./configs/db");
const recipesRoute = require("./routes/recipes");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const apiRouter = express.Router();
apiRouter.use("/recipes", recipesRoute);
app.use("/api", apiRouter);

const port = process.env.PORT || 3000;
dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
