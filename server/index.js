const express = require('express');
const morgan = require('morgan')

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


app.use(morgan("dev"));
app.use("/", require("./routes"));
