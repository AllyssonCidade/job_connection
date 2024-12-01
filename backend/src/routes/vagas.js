const express = require("express");
const router = express.Router();
const vagasRepository = require("../repositories/vagasRepository");

/**
 * @swagger
 * components:
 *   schemas:
 *     Vaga:
 *       type: object
 *       required:
 *         - descricao
 *         - titulo
 *         - dataCadastro
 *         - telefone
 *         - empresa
 *         - stats
 *       properties:
 *         id:
 *           type: string
 *           description: ID da vaga
 *         descricao:
 *           type: string
 *           description: Descrição da vaga
 *         titulo:
 *           type: string
 *           description: Título da vaga
 *         dataCadastro:
 *           type: string
 *           format: date
 *           description: Data de cadastro da vaga
 *         telefone:
 *           type: string
 *           description: Telefone de contato para a vaga
 *         empresa:
 *           type: string
 *           description: Nome da empresa
 *         stats:
 *           type: string
 *           description: Status da vaga
 */

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Retorna a lista de todas as vagas
 *     tags: [Vaga]
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaga'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", async (req, res) => {
  try {
    const vagas = await vagasRepository.findAll();
    res.json(vagas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /vagas:
 *   post:
 *     summary: Cria uma nova vaga (use o telefone no formato DDD912345678)
 *     tags: [Vaga]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaga'
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

router.post("/", async (req, res) => {
  try {
    const { descricao, titulo, dataCadastro, telefone, empresa, stats } =
      req.body;

    const telefoneRegex = /^\d{2}\d{9}$/;
    if (!telefoneRegex.test(telefone)) {
      return res
        .status(400)
        .json({ message: "Telefone inválido. Use o formato DDD9XXXXXXXXX." });
    }

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

/**
 * @swagger
 * /vagas/{id}:
 *   put:
 *     summary: Atualiza uma vaga existente
 *     tags: [Vaga]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da vaga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaga'
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, titulo, dataCadastro, telefone, empresa, stats } =
      req.body;

    const telefoneRegex = /^\d{2}\d{9}$/;
    if (!telefoneRegex.test(telefone)) {
      return res
        .status(400)
        .json({ message: "Telefone inválido. Use o formato DDD9XXXXXXXXX." });
    }
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

/**
 * @swagger
 * /vagas/{id}:
 *   delete:
 *     summary: Exclui uma vaga existente
 *     tags: [Vaga]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da vaga
 *     responses:
 *       200:
 *         description: Vaga excluída com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
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
