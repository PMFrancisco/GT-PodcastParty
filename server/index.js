const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/mongodb")
const passport = require("./config/passport");
const swaggerDocs = require("./config/swagger").swaggerDocs;
const swaggerUi = require("./config/swagger").swaggerUi;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

const whitelist = process.env.CORS_WHITELIST.split(',');
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(passport.initialize());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", require("./routes"));

app.listen(PORT, '0.0.0.0', () =>  {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
