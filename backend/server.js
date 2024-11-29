const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database");
const usuariosRoutes = require("./src/routes/users");
const vagasRoutes = require("./src/routes/vagas");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

sequelize
  .sync()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

app.use("/users", usuariosRoutes);
app.use("/vagas", vagasRoutes);

app.listen(PORT, () => {});
