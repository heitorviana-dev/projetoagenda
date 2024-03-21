import "core-js/stable";
import "regenerator-runtime/runtime";

import Login from "./modules/Login";
import Contato from "./modules/Contato";

//Na instanciação nós passamos a classe do formulário
const cadastro = new Login(".form-cadastro"); 
const login = new Login(".form-login");
cadastro.init();
login.init();

const cadastroContato = new Contato(".form-cadastroContato");
const editarContato = new Contato(".form-editarContato");
cadastroContato.init();
editarContato.init();

