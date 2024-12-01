const Vagas = require("../models/vagas");

async function create({
  descricao,
  titulo,
  dataCadastro,
  telefone,
  empresa,
  stats,
}) {
  const vaga = await Vagas.create({
    descricao,
    titulo,
    dataCadastro,
    telefone,
    empresa,
    stats,
  });
  return vaga;
}

async function remove(id) {
  const vaga = await Vagas.findByPk(id);
  if (!vaga) {
    return false;
  }
  await vaga.destroy();
  return true;
}

async function update(
  id,
  { descricao, titulo, dataCadastro, telefone, empresa }
) {
  const vaga = await Vagas.findByPk(id);
  if (!vaga) {
    return null;
  }
  vaga.descricao = descricao;
  vaga.titulo = titulo;
  vaga.dataCadastro = dataCadastro;
  vaga.telefone = telefone;
  vaga.empresa = empresa;
  await vaga.save();
  return vaga;
}

async function deletVagas(id) {
  const vaga = await Vagas.findByPk(id);
  if (!vaga) {
    return false;
  }
  await vaga.destroy();
  return true;
}

async function findAll() {
  const vagas = await Vagas.findAll();
  return vagas;
}

async function toggleStats(data) {
  const vaga = await Vagas.findByPk(data.id);
  if (!vaga) {
    return null;
  }
  vaga.stats = !vaga.stats;
  await vaga.save();
  return vaga;
}

async function updateVaga(id, data) {
  const vaga = await Vagas.findByPk(id);
  if (!vaga) {
    return null;
  }
  vaga.descricao = data.descricao;
  vaga.titulo = data.titulo;
  vaga.dataCadastro = data.dataCadastro;
  vaga.telefone = data.telefone;
  vaga.empresa = data.empresa;
  await vaga.save();
  return vaga;
}
module.exports = {
  create,
  remove,
  update,
  findAll,
  toggleStats,
  updateVaga,
};
