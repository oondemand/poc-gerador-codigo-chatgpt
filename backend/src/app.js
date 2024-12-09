require('dotenv').config();
const express = require('express');
const cors = require('cors');
const codeRoutes = require('./routes/codeGeneratorRoutes');
const { connectDB } = require('./db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', codeRoutes);

module.exports = app;
