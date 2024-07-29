const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
const AuthRoute = require("./Routes/Auth.route");
require("./Helpers/init_mongodb");
const { verifyAccessToken } = require("./Helpers/jwt_helper");
const EmployeeRoute = require("./Routes/Employee.route");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", verifyAccessToken, async (req, res, next) => {
  // console.log(req.headers["authorization"]);
  res.send("Hello from express");
});

app.use("/auth", AuthRoute);
app.use("/employee", EmployeeRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
