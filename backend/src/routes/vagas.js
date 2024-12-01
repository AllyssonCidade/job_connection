const express = require("express");
const router = express.Router();
const vagasRepository = require("../repositories/vagasRepository");

router.get("/", async (req, res) => {
  try {
    const vagas = await vagasRepository.findAll();
    res.json(vagas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { descricao, titulo, dataCadastro, telefone, empresa, stats } =
      req.body;
    const vaga = await vagasRepository.create({
      descricao,
      titulo,
      dataCadastro,
      telefone,
      empresa,
      stats,
    });
    res.status(201).json(vaga);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, titulo, dataCadastro, telefone, empresa, stats } =
      req.body;
    const vaga = await vagasRepository.update(id, {
      descricao,
      titulo,
      dataCadastro,
      telefone,
      empresa,
      stats,
    });
    res.status(200).json(vaga);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vaga = await vagasRepository.remove(id);
    res.status(200).json(vaga);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
