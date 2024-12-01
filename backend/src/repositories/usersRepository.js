const Usuario = require("../models/users");

async function findOne(email, password) {
  const user = await Usuario.findOne({ where: { email } });
  if (!user) {
    return null;
  }
  const isPasswordValid = await user.authenticate(password);
  if (!isPasswordValid) {
    return null;
  }
  return user;
}
async function findAll() {
  return await Usuario.findAll();
}

async function create({ name, email, password }) {
  return await Usuario.create({ name, email, password });
}

async function deleteUser(id) {
  const user = await Usuario.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
}

async function update(id, { name, email, password }) {
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    usuario.name = name;
    usuario.email = email;
    usuario.password = password;
    await usuario.save();
    return usuario;
  }
  return null;
}

module.exports = {
  findOne,
  create,
  findAll,
  deleteUser,
  update,
};
