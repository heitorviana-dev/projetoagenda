const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({ 
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ""},
    telefone: {type: String, required: false, default: ""},
    email: {type: String, required: false, default: ""},
    criadoEm: {type: Date, default: Date.now}
}); 

const ContatoModel = mongoose.model("Contato", ContatoSchema); 

class Contato{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async register(){
        this.valida();
        //Verificando se há erros
        if(this.errors.length > 0) return;

        //Registrando o contato
        this.contato = await ContatoModel.create(this.body);
    }

    valida(){
        this.cleanUp();

        //Validação do email
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push("Email inválido");
        
        //Verificação do nome
        if(!this.body.nome) this.errors.push("Nome é um campo obrigatório.");

        //Verificação de contatos
        if(!this.body.email && !this.body.telefone){
            this.errors.push("Pelo menos um contato precisa ser enviado: email ou telefone.");
        }

        console.log(this.body);
    }

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== "string"){
                this.body[key] = "";
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            telefone: this.body.telefone,
            email: this.body.email
        };
    }

    async edit(id){
        if(typeof id !== "string") return;

        this.contato = await ContatoModel.findById(id);
        //Validando os dados
        this.valida();
        if(this.errors.length > 0) return;

        //Editando o contato
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    //Métodos estáticos

    static async buscaPorId(id){
        //Verificação de id
        if(typeof id !== "string") return;

        //Busca na bd por id
        const contato = await ContatoModel.findById(id);
        return contato;
    }

    static async buscaContatos(){
        //Busca os contatos na bd, e ordena o objeto retornado com base na chave criadoEm
        const contato = await ContatoModel.find()
            .sort({ criadoEm: -1  });
        return contato;
    }

    static async deletarContatos(id){
        if(typeof id !== "string") return;

        //Busca o contato a partir do id e deleta-o
        const contato = await ContatoModel.findByIdAndDelete(id);
        return contato;
    }
}


module.exports = Contato;

