require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");

// Models
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
  Pergunta.findAll({
    raw: true,
    order: [["id", "DESC"]],
  })
    .then((perguntas) => {
      res.render("index", {
        perguntas: perguntas,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvar", (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/pergunta/:id", (req, res) => {
  const id = req.params.id;

  Pergunta.findOne({
    where: { id: id },
  })
    .then((pergunta) => {
      if (pergunta != undefined) {
        Resposta.findAll({
          where: { perguntaId: pergunta.id },
          order: [["id", "DESC"]],
        }).then((respostas) => {
          res.render("pergunta", {
            pergunta: pergunta,
            respostas: respostas,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/responder", (req, res) => {
  const corpo = req.body.corpo;
  const perguntaId = req.body.perguntaId;

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  })
    .then(() => {
      res.redirect("/pergunta/" + perguntaId);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
