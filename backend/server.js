const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database");
const usuariosRoutes = require("./src/routes/users");
const vagasRoutes = require("./src/routes/vagas");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const PORT = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Job Connection API",
      version: "1.0.0",
      description: "API para gerenciar usuários e vagas do Job Connection",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Caminho para os arquivos das rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para análise do corpo da requisição
app.use(bodyParser.json());

// Conexão com o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

// Rotas
app.use("/users", usuariosRoutes);
app.use("/vagas", vagasRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
