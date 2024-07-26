# API Usuarios

Este projeto é uma API de gerenciamento de usuários que permite criar, ler, atualizar e excluir usuários, além de gerenciar a hierarquia entre eles. A API é protegida por autenticação JWT.

## Tecnologias utilizadas


- NestJS
- TypeScript
- SQLite
- JWT (JSON Web Tokens)
- Jest para testes


### Pré-requisitos
Certifique-se de ter o Node.js(v20.14.0) e o npm instalados. Você pode baixá-los [aqui](https://nodejs.org/).

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/cintiamasumi/api_user.git

2. Navegue até o diretório do projeto
    ```
    cd api-user
    ```
3. Instale as dependências:
    ```
    npm install
    ```

#### Configuração
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
1. Env
    ```bash
    JWT_SECRET='97daa658-01c1-47b4-a14b-fa72c3bca830'
    
    TOKEN_EXPIRIES='1'
        -Informar o tempo de expiração do token em minutos

### Inicie o Servidor
1. Rode a Migration
    ```bash
      npm migration:run
2. Inicie a aplicação
  
    ```bash
      npm run start:dev

### Swagger

  
A documentação da API está disponível via Swagger. Para acessar a documentação Swagger:
  ```bash
    http://localhost:3000/docs
  ```

## Endpoints

### Login
- `POST /auth/register`: Cria um usuário.
- `POST /auth/login`: Realiza o login e retorna o token.

#### Rota protegida
- `POST /users/logout`: Realiza o logout

### Users 
#### Rotas protegidas
- `GET /users/tree`: Recupera a hierarquia de usuários.
- `GET /users/:id`: Recupera um usuário específico pelo ID.
- `PUT /users/:id`: Atualiza um usuário específico pelo ID.
- `DELETE /users/:id`: Deleta um usuário específico pelo ID.


### Usando o Swagger

A interface do Swagger permite que você teste os endpoints da API diretamente do navegador. Aqui estão os passos básicos para usar o Swagger:

1. **Criação do usuario**:
    - `POST /auth/register`
2. **Login**:
    - `POST /auth/login`
    - forneça para rota de login os dados que foi registrado na rota anterior
    - Copie o apenas o que esta depois do access_token *(O que esta em italico)*
    - exemplo
        {
          "access_token": "*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InN0cmluZyIsImlhdCI6MTcyMTkzODAzNiwiZXhwIjoxNzIxOTQxNjM2fQ.2uFF-y75NqkLDbMosOvRw6QemABQh84HEE-6hM3wyM8*"
        }

1. **Autenticação**:
    - Clique no botão `Authorize` no canto superior direito.
    - Na janela que se abre, insira seu token JWT no campo `value` no formato `Bearer <token>` e clique em `Authorize`.
    - Feche a janela.

2. **Testando Endpoints**:
    - Expanda a seção do endpoint que você deseja testar.
    - Preencha os parâmetros necessários, se houver.
    - Clique no botão `Execute` para enviar a solicitação.
    - Veja a resposta no painel de resultados.

## Postman

  
  - [Postman Collection](./postman/api-user.postman_collection.json)

    É possivel utilizar também no Postman
    Após a importação da Colletion não há necessidade de ajustar as variáveis de ambiente , já esta configurado na propria pasta da Collection


## Testes

### Executando Testes

Para executar os testes automatizados da aplicação, use o seguinte comando:
```bash
npm run test