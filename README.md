# JobConnection

Um aplicativo moderno de conexão de vagas de emprego, desenvolvido com React Native, Node.js e Expo , utilizando Expo-SQLite e AsyncStorage para armazenamento local.

## Instalação

1.  **Clone o repositório:**  
    \_git clone https://github.com/AllyssonCidade/job_connection.git

        O projeto está separado em duas pastas, backend e mobile. Após fazer o git clone, abra um novo terminal e navegue até a pasta backend para instalar as dependências (npm install) e iniciar o servidor (npm start). Em seguida, vá no outro terminal e navegue até a pasta mobile para instalar as dependências (npm install) e iniciar o aplicativo móvel (npx expo start).

2.  **Instale as dependências tanto no backend quanto no frontend e inicie**  
     abra um terminal novo:
    _cd mobile_

    _npm install_

    _npm expo start_

    navegue até oo outro terminal:

    _cd backend_

    _npm install_

    _npm start_

## POPULANDO O BANCO DE DADOS COM VAGAS.
    Voce pode cadastrar suas vagas pela api usando postman, a docs do swagger ou qualquer outra forma que achar melhor, mas deixamos preparado um pequeno seed para facilitar esta parte.
    Navegue até o backend 
    _cd backend_
    e use o comando 
    _npm run seed_

    com isso seu app já estará com algumas vagas para que possa fazer os testes.

## CONFIGURANDO O .ENV

    Configuração do arquivo .env: No arquivo .env localizado na pasta backend, altere o número do IP para que o app encontre a API. Caso use um emulador, pode colocar como localhost. O arquivo .env foi deixado ali propositalmente para facilitar para o tutor ao testar o app.

## Uso

    Para usar o aplicativo, siga os passos abaixo:

    Cadastrar-se: Abra o aplicativo e clique em "Cadastrar". Preencha os campos necessários e conclua o cadastro.

    Login: Na tela inicial, insira seu e-mail e senha para fazer login.

    Buscar Vagas: Todas as vagas cadastradas já estarão na sua pagina inicial, caso adicione novas vagas enquanto usa o app pode utilizar o botão de refresh presente na página principal para atualizar o banco de dados, também é possível fazer uma busca simples pele nome da vaga.

    Entrar em Contato: Clique na vaga desejada e utilize o botão "Entrar em Contato" para falar diretamente com o recrutador via WhatsApp.

Nota: É necessário criar uma conta para usar o aplicativo.

## Adicionando Vagas

    Para adicionar vagas, você pode utilizar o Swagger ou o Postman. A documentação da API estará disponível via Swagger, o que permite a adição e manipulação das vagas de emprego.
        
    Para o Swagger você pode entrar neste link:
    http://localhost:3000/api-docs/Vaga
    
    Temos aqui um modelo de cadastro de vaga.
    _{
    "descricao": "Escreva aqui a descrição da vaga para que seja vista pelo usuário.",
    "titulo": "Minha vaga legal",
    "dataCadastro": "2024-10-17",
    "telefone": "71997248724",
    "empresa": "AllyssonCidade",
    "stats": true
    }_

## Referência

[Documentação do React-Native](https://reactnative.dev/)

[Documentação do Expo](https://docs.expo.dev/)

[Documentação Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)

[Documentação do Node.js](https://nodejs.org/en/docs/)

[Documentação do Swagger](https://swagger.io/docs/)

[Documentação do Sequelize](https://sequelize.org/master/)

[Documentação do AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/install/)

[Documentação do Axios](https://axios-http.com/docs/intro)

## Documentação da API

O aplicativo utiliza uma API de vagas de emprego desenvolvida com base no conteúdo aprendido no curso. A API fornece as vagas disponíveis em tempo real, permitindo busca e filtros personalizados.

## Autores

- [Alan Leandro](https://www.github.com/alanleandro23)
- [Allyson Cidade](https://www.github.com/AllyssonCidade)
- [Levy Carlo](https://www.github.com/levyycarlo)
- [Matheus Quevedo](https://www.github.com/matheusquevedodev)
- [Yan Dart](https://www.github.com/YLeall)

## Etiquetas

- React Native
- Expo
- SQLite
- Empregos
- Gestão de Vagas

## Documentação de cores

Aqui está a tabela atualizada com as cores que você forneceu:

| Cor                      | Hexadecimal                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| Cor Background           | ![#f5f5f5](https://via.placeholder.com/10/f5f5f5?text=+) #f5f5f5 |
| Cor Botão Tarefa         | ![#004cbf](https://via.placeholder.com/10/004cbf?text=+) #004cbf |
| Cor Botão Excluir        | ![#e02f23](https://via.placeholder.com/10/e02f23?text=+) #e02f23 |
| Cor Botões Configurações | ![#004cbf](https://via.placeholder.com/10/004cbf?text=+) #004cbf |
| Cor Fonte 1              | ![#262e2d](https://via.placeholder.com/10/262e2d?text=+) #262e2d |
| Cor Fonte 2              | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |

## Documentação

Aqui estão os links para a documentação das principais bibliotecas e tecnologias usadas:

- [Documentação do React-Native](https://reactnative.dev/)
- [Documentação do Expo](https://docs.expo.dev/)

## Variáveis de Ambiente

Este projeto não utiliza variáveis de ambiente específicas.

## FAQ

1.  Como faço para criar uma conta?
    Na página de login clique em cadastrar e em seguida preencha com os dados que serão pedidos e clique no botão de "CADASTRAR". Pronto, já pode voltar para tela de login e prosseguir.

2.  Como faço login no aplicativo?
    Insira seu e-mail e senha cadastrados na tela inicial de login. Caso não tenha uma conta, clique em "Criar Conta".

3.  Posso editar meu perfil?
    Sim, vá até a seção "Perfil" e clique no botão de edição para alterar suas informações pessoais.

4.  Como entrar em contato com a empresa da vaga?
    Clique em uma vaga aberta e use o botão "Entrar em Contato" para ser redirecionado ao WhatsApp da empresa.
    Algumas vagas também tem disponível um email ou link para página da empresa onde você pode enviar seu currículo ou utilizar o site para se candidatar.

5.  Como excluir minha conta?
    Na seção "Configurações", você pode encontrar a opção "Excluir Conta". Após confirmar, seus dados serão removidos.

6.  Como posso ajustar as configurações do aplicativo?
    Vá até o menu de configurações clicando no ícone de engrenagem no canto superior direito e personalize as preferências do aplicativo conforme necessário.

## Funcionalidades

- Listagem de vagas de emprego com busca e filtros.
- Contato direto com recrutadores via WhatsApp.
- Cadastro, login e gerenciamento de perfil do usuário.
- Armazenamento local de dados com SQLite.
- Tela de configurações para personalização e exclusão de conta.

## Melhorias

- Adicionar suporte a múltiplos idiomas
- Adicionar modo noturno para maior conforto visual.
- Adicionar Scrapper para manter as vagas sempre atualizadas e melhorar a experiência do usuário.

## Stack utilizada

**Front-end:** React Native, Expo

**Banco de dados:** SQLite

**Backend:** Node.js, Express, JWT
