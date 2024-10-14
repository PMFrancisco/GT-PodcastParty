const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());  // CORS habilitado para todas las rutas

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
