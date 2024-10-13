const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerDocs = require("./config/swagger").swaggerDocs;
const swaggerUi = require("./config/swagger").swaggerUi;

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors()); // CORS habilitado para todas las rutas

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
