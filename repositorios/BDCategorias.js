const BDCategoria = [];

const removeCategoria = (posicao) => {
  listaProdutos.splice(posicao, 1);
};

const addCategoria = (categoria) => {
  BDCategoria.push(categoria);
};

const getCategoria = () => {
  return BDCategoria;
};

exports.removeCategoria = removeCategoria;

exports.addCategoria = addCategoria;

exports.getCategoria = getCategoria;
