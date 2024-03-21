<h1 align="center"> Projeto Agenda - Back-end</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/juniorvilas/nlw-setup?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/heitorviana-dev/projetoagenda?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/heitorviana-dev/projetoagenda?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/heitorviana-dev/projetoagenda?color=56BEB8">

  <img alt="Github issues" src="https://img.shields.io/github/issues/heitorviana-dev/projetoagenda?color=56BEB8" />

  <img alt="Github forks" src="https://img.shields.io/github/forks/heitorviana-dev/projetoagenda?color=56BEB8" />

  <img alt="Github stars" src="https://img.shields.io/github/stars/heitorviana-dev/projetoagenda?color=56BEB8" />
</p>

<hr>

<p align="center">
  <a href="#sobre">Sobre</a> &#xa0; | &#xa0;
  <a href="#telas-da-aplicação">Telas</a> &#xa0; | &#xa0;
  <a href="#tecnologias-utilizadas">tecnologias</a> &#xa0; | &#xa0;
  <a href="#instruções-para-inicializar-o-projeto:">Iniciando</a> &#xa0; | &#xa0;
  <a href="https://github.com/heitorviana-dev" target="_blank">Autor</a>
</p>

##  Sobre ##

Bem-vindo à nossa Agenda Digital:grinning:! Este projeto foi criado com o objetivo de testar meus conhecimentos sobre autenticação e sessões, usando tecnologias de criptografia e hash alternado, com o objetivo de garantir a segurança do usuário aos seus contatos, o front-end teve o intuito de facilitar a organização de contatos. Com uma interface intuitiva e fácil de usar, você pode criar, editar e excluir compromissos com apenas alguns cliques.

## Tecnologias Utilizadas

Usei uma combinação de tecnologias modernas para garantir que a Agenda Digital seja rápida, segura e fácil de usar. Aqui estão algumas das principais tecnologias que fiz uso:

  - **Node.js**: O coração do nosso projeto, que nos permite executar JavaScript no servidor.
  - **Express.js**: Um framework web que facilita a criação de aplicações web e APIs.
  - **EJS**: Um mecanismo de template que nos permite gerar HTML dinâmico com JavaScript.
  - **Webpack**: Ferramenta que nos ajuda a empacotar e otimizar nossos arquivos JavaScript e CSS.
  - **MongoDB**: Nosso banco de dados, que armazena todos os seus compromissos de forma segura e eficiente.
  - **Nodemon**: Ferramenta que reinicia automaticamente o servidor sempre que detecta uma alteração no código, facilitando o desenvolvimento.
  - **Bcryptjs**: Ferramenta utilizada para criar hash de senhas, fornencendo uma maneira segura de armazenar senhas em banco de dados.
  - **Csurf**: Ferramenta utilizada para proteger contra ataques CSRF (Cross-Site-Request-Forgery).
  - **Helmet**: Ferramenta usada para proteger aplicativos Express.js de várias vulnerabilidades da web, configurando de forma automática cabeçalhos HTTP relacionados à segurança.

 
## Telas da aplicação

### Cadastro & Login ###
<img src="./.github/Pagina de Login.png" alt="Imagem da tela Login" />

### Criar Contatos ###
<img src="./.github/Pagina de contato.png" alt="Imagem da tela criar contatos" />

### Login OK, redirecionamento  ###
<img src="./.github/Pagina já logada.png" alt="Imagem da tela de redirecionamento" />

### Home Agenda ###
<img src="./.github/Página inicial.png" alt="Imagem da tela Home agenda" />

## :checkered_flag:  Instruções para inicializar o projeto:

- Após copiar o projeto, execute o seguinte comando no terminal para baixar os módulos node necessários para a execução:

  ```sh
  npm i
  ```

- Feito isso abra dois terminais, um para executar o servidor e outro para executar o webpack:

- Servidor:

   ```sh
    npm start
    ```

- Webpack:

  ```sh
  npm run dev
  ```
