require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/generate-code', require('./routes/codeGeneratorRoutes'));
app.use("/clonar-codigo", require("./routes/clonarCodigoRoutes"));
app.use("/arquivos", require("./routes/arquivoRoutes"));
app.use("/projetos", require("./routes/projetoRoutes"));



module.exports = app;
