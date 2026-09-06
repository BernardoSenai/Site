const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv").config();

const FRONTEND_URL = [process.env.FRONTEND_URL,
"https://bite-bun-6eje.onrender.com",
"https://site-kxis.onrender.com"]; // Substitua pela URL do seu frontend.

app.use(cors({
  origin: FRONTEND_URL
}));
app.use(express.json());

const cardapio = [
  { categoria: "pao", nome: "Frances", preco: 1.5 },
  { categoria: "pao", nome: "Integral", preco: 2.0 },
  { categoria: "pao", nome: "Ciabatta", preco: 2.5 },
  { categoria: "recheio", nome: "Frango", preco: 5.0 },
  { categoria: "recheio", nome: "Carne", preco: 6.5 },
  { categoria: "recheio", nome: "Vegetariano", preco: 4.0 },
  { categoria: "molho", nome: "Maionese", preco: 0.5 },
  { categoria: "molho", nome: "Mostarda", preco: 0.5 },
  { categoria: "molho", nome: "Especial", preco: 1.5 },
];

function buscarPreco(categoria, nome) {
  const item = cardapio.find(
    (i) => i.categoria === categoria && i.nome === nome
  );
  return item ? item.preco : 0;
}

// 01
app.get("/", (req, res) => {
  res.send("Byte e Bun API no ar!");
});

// 02
app.get("/cardapio", (req, res) => {
  res.json(cardapio);
});

// 03
app.get("/cardapio/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  const itensFiltrados = cardapio.filter((item) => item.categoria === categoria);
  res.json(itensFiltrados);
});

// 04
app.post("/pedido", (req, res) => {
  const { pao, recheio, molho } = req.body;
  if (!pao || !recheio || !molho) {
    return res.json({
      erro: "Item faltando, adicione o pão, recheio e o molho.",
    });
  }
  const precoPao = buscarPreco("pao", pao);
  const precoRecheio = buscarPreco("recheio", recheio);
  const precoMolho = buscarPreco("molho", molho);
  const total = precoPao + precoRecheio + precoMolho;
  res.json({
    itens: { pao, recheio, molho },
    total: Number(total.toFixed(2)),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
