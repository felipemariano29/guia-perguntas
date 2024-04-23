const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
