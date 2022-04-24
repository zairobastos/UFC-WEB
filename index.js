const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/home", (req, res) => {
  res.render("home", { title: "Lab MPA", message: "Bem-vindo ao Lab MPA" });
});

app.get("/", (req, res) => {
  res.render("index", {});
});

const bdProdutos = require("./data/dados");
const p = bdProdutos.listaDeProdutos();

const BDCategoria = require("./repositorios/BDCategorias");
const categoria = BDCategoria.getCategoria();

app.get("/categorias", (req, res) => {
  res.render("categoria", { categoria });
});
app.get("/produto-deletar", (req, res) => {
  let posicao = parseInt(req.query.excluir);
  p.forEach(function (el, i) {
    if (el.id == posicao) {
      p.splice(i, 1);
    }
  });
  res.redirect("/produto");
});
app.get("/produto", (req, res) => {
  res.render("produtos", { p });
});

app.get("/produtos", (req, res) => {
  p.push({
    id: p.length == 0 ? 0 : p[p.length - 1].id + 1,
    categoria: req.query.categoria,
    nome: req.query.nome,
    descricao: req.query.descricao,
    preco: req.query.preco,
  });
  res.redirect("/produto");
});

app.get("/produto-editar", (req, res) => {
  res.render("produto-editar", { posicao: req.query.id, p, c: categoria });
});

app.post("/produto-editar", (req, res) => {
  let i = parseInt(req.body.pos);
  p[i].nome = req.body.nome;
  p[i].descricao = req.body.descricao;
  p[i].preco = req.body.preco;
  p[i].categoria = req.body.categoria;
  res.redirect("/produto");
});

app.get("/produto-cadastrar", (req, res) => {
  res.render("produto-cadastrar", { categoria });
});

app.post("/categoria-salvar", function (req, res, next) {
  BDCategoria.addCategoria({
    id: categoria.length == 0 ? 0 : categoria[categoria.length - 1].id + 1,
    nome: req.body.nome,
    personalizado: req.body.personalizado.split(","),
  });
  res.redirect("/categorias");
});

app.get("/categoria-deletar", (req, res) => {
  let posicao = parseInt(req.query.excluir);
  categoria.forEach(function (el, i) {
    if (el.id == posicao) {
      categoria.splice(i, 1);
    }
  });
  res.redirect("/categorias");
});
