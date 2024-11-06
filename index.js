const express = require("express");
const dontenv = require("dotenv");
dontenv.config();

const cors = require("cors");
const getCorsOptions = require("./configs/cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger");
const dbConnection = require("./configs/db");
const usersRoute = require("./routes/users");
const recipesRoute = require("./routes/recipes");
const authorization = require("./middlewares/authorization");

const app = express();

app.use(cors(getCorsOptions));
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const apiRouter = express.Router();
apiRouter.use("/users", usersRoute);
apiRouter.use("/recipes", authorization, recipesRoute);
app.use("/api", apiRouter);

app.use("/uploads", express.static("uploads"));

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
