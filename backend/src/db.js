const mongoose = require("mongoose");

const config = {
  dbServer: process.env.DB_SERVER,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbAuthSource: process.env.DB_AUTH_SOURCE,
  dbReplicaSet: process.env.DB_REPLICA_SET,
  dbTsl: process.env.DB_TSL,
};

let mongoUri = `${config.dbServer}/${config.dbName}?`;
if (config.dbAuthSource) mongoUri += `authSource=${config.dbAuthSource}&`;
if (config.dbTsl) mongoUri += `tls=true&`;
if (config.dbReplicaSet) mongoUri += `replicaSet=${config.dbReplicaSet}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      user: config.dbUser,
      pass: config.dbPassword,
    });
    console.log(`Conectado ao MongoDB`);
    console.log(` - Server: ${config.dbServer}`);
    console.log(` - User: ${config.dbUser}`);
    console.log(` - Database: ${config.dbName}`);
  } catch (err) {
    console.error(`Erro ao conectar ao MongoDB ${config.dbName}`, err);
    process.exit(1); // Encerra o processo com falha
  }
};

module.exports = { connectDB };
