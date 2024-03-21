const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({ //Cria o esquema, a modulagem dos dados da home
    titulo: {type: String, required: true}, //O título precisa ser do tipo string e deve ser enviado
    descricao: String
}); //Define como os dados irão chegar na DB

const HomeModel = mongoose.model("Home", HomeSchema); //Cria o model


