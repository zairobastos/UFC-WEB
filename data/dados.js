const listaProdutos = [];

const addProduto = (p) => {
  listaProdutos.push(p);
};

const removeProduto = (posicao) => {
  listaProdutos.splice(posicao, 1);
};

const listaDeProdutos = () => {
  return listaProdutos;
};

exports.removeProduto = removeProduto;

exports.listaDeProdutos = listaDeProdutos;

exports.addProduto = addProduto;
