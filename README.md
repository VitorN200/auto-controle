# Auto Controle

Sistema web de **controle financeiro pessoal**: cadastro de contas, registro e filtro de transações entre contas e gerenciamento de usuários, com API própria e banco de dados MySQL.

🔗 **Demonstração online:** _https://auto-controle-production.up.railway.app/_

**Conta de teste:** `admin@auto.controle` / `admin123`

## Contexto

Projeto da faculdade (Análise e Desenvolvimento de Sistemas, FATEC-SP), feito **em dupla** em abril e maio de 2025. Este repositório é um fork do [repositório do grupo](https://github.com/danilodasilvafeitosa/auto-controle), mantido aqui com o histórico de commits e a autoria originais. O trabalho de preparação para a hospedagem (Dockerfile e ajustes de configuração) foi feito depois, em 2026.

## Funcionalidades

- Login e controle de acesso por usuário.
- **Contas:** criação, edição, listagem com filtros e status (ativa, inativa, suspensa); tipos interna e externa.
- **Transações:** registro entre duas contas (origem e destino), valor, data, descrição e status, com listagem e filtros.
- **Usuários:** cadastro, edição, status e registro de quem criou e alterou cada item.
- Containerização com Docker Compose (banco, API e front-end).

## Minha contribuição

Trabalho em dupla (cerca de 94 commits, dos quais 24 são meus). Pelo histórico:

- **Front-end (principal):** telas de contas, transações e usuários (criação, edição e listagem com filtros e tabelas), menu de navegação e ajustes de layout, além da integração das telas com a API.
- Correções de comportamento, como a atualização dos dados do próprio usuário logado na sessão e as validações de formulário.
- **Deploy (2026):** adaptação para publicar em um único serviço no Railway (ver abaixo).

A parte principal da API (modelos, serviços e regras de negócio) foi desenvolvida pelo meu colega de dupla.

## Tecnologias

- **Front-end:** React 19, React Router, Axios, Vite
- **Back-end:** Node.js, Express 5, Sequelize
- **Banco de dados:** MySQL
- **Infraestrutura:** Docker, Docker Compose, Railway

## Como executar localmente (Docker)

1. Instale o [Git](https://git-scm.com/) e o [Docker](https://www.docker.com/).
2. Clone o repositório e entre na pasta.
3. Copie `.env.example` para `.env` e ajuste as variáveis (senha do banco etc.).
4. Rode `docker-compose up`.
5. Acesse http://localhost:5173. Para encerrar, `Ctrl + C` e `docker-compose down`.

Na primeira execução as tabelas são criadas e um administrador inicial (`admin@auto.controle` / `admin123`) é cadastrado.

## Deploy no Railway

O `Dockerfile` da raiz compila o front-end e a API o entrega junto (um serviço só, mais o MySQL). O `docker-compose.yml` continua sendo usado apenas no desenvolvimento local.

Variáveis do serviço da aplicação (o banco usa as variáveis `MYSQL*` do MySQL do Railway, por referência):

| Variável | Valor |
|---|---|
| `MYSQLHOST` | `${{MySQL.MYSQLHOST}}` |
| `MYSQLPORT` | `${{MySQL.MYSQLPORT}}` |
| `MYSQLUSER` | `${{MySQL.MYSQLUSER}}` |
| `MYSQLPASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |
| `MYSQLDATABASE` | `${{MySQL.MYSQLDATABASE}}` |

## Limitações conhecidas

Por ser um projeto acadêmico, ele tem pontos que não seguem boas práticas de produção e que eu corrigiria hoje:

- As senhas são armazenadas e comparadas em **texto puro** (o ideal seria hash com bcrypt/argon2).
- A autenticação das rotas é feita pelo `userID` enviado no corpo da requisição, **sem token** (o ideal seria JWT ou sessão assinada).
- Use apenas dados de teste na demonstração online.

## Reconhecimento

Projeto desenvolvido em dupla. A autoria de cada commit está preservada no histórico.
