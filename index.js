require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
// Express
const app = express();
const port = 8080;
// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados");
  })
  .catch((err) => {
    console.log(err);
  });
// EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvar", (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  res.send(`O título da pergunta é '${titulo}' e a descrição é '${descricao}'`);
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
