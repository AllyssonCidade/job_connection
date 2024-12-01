const express = require("express");
const router = express.Router();
const userRepository = require("../repositories/usersRepository");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await userRepository.findOne(email, password);
    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userRepository.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await userRepository.update(id, { name, email, password });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.deleteUser(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
