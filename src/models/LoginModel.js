const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({ //Cria o esquema, a modulagem dos dados da Login
    email: { type: String, required: true},
    password: { type: String, required: true}
}); //Define como os dados irão chegar na DB

const LoginModel = mongoose.model("Login", LoginSchema); //Cria o model

class Login{
    constructor(body){
        this.body = body;
        this.errors = []; //Caso haja algum erro na array, então o usuário não será cadastrado.
        this.user = null;
    }

    async login(){
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email});

        if(!this.user){
            this.errors.push("Usuário não existe.");
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push("Senha inválida.");
            this.user = null;
            return;
        }
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync(); //Gera um salt aleatório
        this.body.password = bcryptjs.hashSync(this.body.password, salt); //Cria o hash da senha

        this.user = await LoginModel.create(this.body); //Iremos atribuir ao this.user o usuário criado, para caso seja necessário trabalhar com ele fora do model.
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email}); //Essa operação realiza a busca por um registro na DB com o email this.body.email, sendo que caso haja irá ser retornado o usuário, e caso não haja será retornado null.
        if(this.user) this.errors.push("Usuário já existe.");
        
    }

    valida() {
        this.cleanUp(); 
        //Validação.
        //O email precisa ser válido.
        if(!validator.isEmail(this.body.email)) this.errors.push("Email inválido.");

        //A senha precisa ter entre 3 e 50 caracteres.
        if(this.body.password.length < 3 || this.body.password.length > 50){
            this.errors.push("A senha precisa ter entre 3 e 50 caracteres.");
        }
    }

    cleanUp() { 
        for(let key in this.body){ //Verifica se tudo dentro do body é uma string
            if(typeof this.body[key] !== "string"){
                this.body[key] = "";
            }
        }

        this.body = { //Garantimos que o body terá apenas duas chaves, o email e o password
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;


