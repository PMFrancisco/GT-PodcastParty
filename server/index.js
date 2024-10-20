const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/mongodb")
const swaggerDocs = require("./config/swagger").swaggerDocs;
const swaggerUi = require("./config/swagger").swaggerUi;

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); // CORS habilitado para todas las rutas

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", require("./routes"));

app.listen(PORT, '0.0.0.0', () =>  {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
