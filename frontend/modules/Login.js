import validator from "validator";

export default class Login {
    constructor(formClass){ //É passado como argumento a classe do formulário.
        this.form = document.querySelector(formClass);
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e){
        const el = e.target; //Irá armazenar o elemento alvo no evento
        const emailInput = el.querySelector("input[name='email']");
        const passwordInput = el.querySelector("input[name='password']");
        const divErrorEmail = el.querySelector("#emailError");
        const divErrorPassword = el.querySelector("#passwordError");

        //A seguinte parte do código tem como função remover o conteúdo da div caso já haja algum erro e torná-la hidden novamente, caso ela não esteja.
        divErrorEmail.innerText = "";
        divErrorPassword.innerText = "";
        divErrorEmail.setAttribute("hidden", "");
        divErrorPassword.setAttribute("hidden", "");

        //Flag para identificar se há erro ou não.
        let error = false;

        if(!validator.isEmail(emailInput.value)){
            divErrorEmail.removeAttribute("hidden");
            divErrorEmail.innerText = "O email é inválido.";
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
            divErrorPassword.removeAttribute("hidden");
            divErrorPassword.innerText = "A senha precisa conter entre 3 e 50 caracteres.";
            error = true;
        }

        if(!error) el.submit();
    }
}