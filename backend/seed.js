const vagasRepository = require("./src/repositories/vagasRepository");
const sequelize = require("./src/config/database");

const seedVagas = async () => {
  await sequelize.sync({ force: true }); // Limpa e recria as tabelas

  const vagas = [
    {
      descricao: "Desenvolvimento de funcionalidades para aplicações web.",
      titulo: "Desenvolvedor Full Stack",
      dataCadastro: new Date(),
      telefone: "71997248724",
      empresa: "Tech Solutions",
      stats: true,
    },
    {
      descricao: "Responsável por gerenciar a equipe de vendas.",
      titulo: "Gerente de Vendas",
      dataCadastro: new Date(),
      telefone: "71997248724",
      empresa: "Commerce Corp",
      stats: true,
    },
    {
      descricao: "Criação de layouts e interfaces de usuário.",
      titulo: "Designer UX/UI",
      dataCadastro: new Date(),
      telefone: "71997248724",
      empresa: "Creative Agency",
      stats: false,
    },
    {
      descricao: "Suporte técnico e resolução de problemas.",
      titulo: "Suporte Técnico",
      dataCadastro: new Date(),
      telefone: "71997248724",
      empresa: "Support LLC",
      stats: false,
    },
    {
      descricao: "Coordenação de campanhas de marketing digital.",
      titulo: "Especialista em Marketing Digital",
      dataCadastro: new Date(),
      telefone: "71997248724",
      empresa: "Marketing Experts",
      stats: true,
    },
    {
      descricao: "Manutenção de infraestrutura de redes.",
      titulo: "Engenheiro de Redes",
      dataCadastro: new Date(),
      telefone: "71997248724",
      empresa: "Network Solutions",
      stats: false,
    },
    {
      descricao: "take effect.",
      titulo: "jijs",
      dataCadastro: "2024-10-17",
      telefone: "71997248724",
      empresa: "AllyssonCidade",
      stats: true,
    },
  ];

  for (const vaga of vagas) {
    await vagasRepository.create(vaga);
  }

  console.log("Seed de vagas criada com sucesso!");
};

seedVagas().catch((error) => {
  console.error("Erro ao criar seed de vagas:", error);
});
