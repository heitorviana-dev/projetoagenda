require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");


mongoose.connect(process.env.CONNECTIONSTRING) //Conecta-se a base de dados
    .then(() => {
        app.emit("pronto"); //Emite o sinal
    })
    .catch((e) => console.log(e));

const session = require("express-session"); //Adiciona um objeto "session" à requisição("req")
const MongoStore = require("connect-mongo"); //Armazena as sessões
const flash = require("connect-flash"); //Armazena as flash messages

const routes = require("./routes");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require("./src/middlewares/middleware");


app.use(express.urlencoded({ extended: true })); //Permitir o tratamento de dados via corpo da requisição
app.use(express.json()); //Permite o tratamento de dados em formato json nas requisições http
app.use(helmet());
app.use(express.static(path.resolve(__dirname, "public"))); //Definir onde estão os arquivos estáticos

const sessionOptions = session({
    secret: "wrestrvbhjnkml()", //Opção obrigatória
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }), //É enviado o cliente de conexão, no nosso caso é o mongoose
    resave: false, //Força a sessão a ser salva novamente, mesmo se não tiver sido modificada
    saveUninitialized: false, //Útil para sessões de login
    cookie: {
        maxAge: 1000 * 60 * 60 * 12, //Tempo máximo que o cookie ficará disponível
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views")); //Definir onde está o diretório views
app.set("view engine", "ejs"); //Definir qual será a engine para renderizar os arquivos views

app.use(csrf());

// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError); //Middleware que checa se há algum erro de CSRF
app.use(csrfMiddleware); //Middleware que injeta o token nos formulários

app.use(routes); //Permitir a utilização das rotas definidas no arquivo routes.js

app.on("pronto", () => { //Captura o sinal
    app.listen(3000, () => { //Definir qual porta o servidor irá escutar as ações do cliente
        console.log("Servidor executando na porta 3000");
        console.log("Acesse http://localhost:3000");
    });
});


//Nesse arquivo nós executamos o servidor e importamos as rotas.

