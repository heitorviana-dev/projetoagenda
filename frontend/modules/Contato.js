import validator from "validator";

export default class Contato{
    constructor(formClass){
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
        const el = e.target;
        const nomeInput = el.querySelector("input[name='nome']");
        const telefoneInput = el.querySelector("input[name='telefone']");
        const emailInput = el.querySelector("input[name='email']");
        const divErrorName = el.querySelector("#nameError");
        const divErrorContato = el.querySelector("#contatoError");
        const divErrorEmail = el.querySelector("#emailError");
        let error = false;

        divErrorName.innerText = "";
        divErrorContato.innerText = "";
        divErrorEmail.innerText = "";
        divErrorName.setAttribute("hidden", "");
        divErrorContato.setAttribute("hidden", "");
        divErrorEmail.setAttribute("hidden", "");

        //Validação e verificação do email
        if(emailInput.value && !validator.isEmail(emailInput.value)){
            divErrorEmail.removeAttribute("hidden");
            divErrorEmail.innerText = "Email inválido.";
            error = true;
        }

        //Verificação do nome
        if(!nomeInput.value){
            divErrorName.removeAttribute("hidden");
            divErrorName.innerText = "O nome precisa ser inserido.";
            error = true;
        }

        //Verificação de contato
        if(!emailInput.value && !telefoneInput.value){
            divErrorContato.removeAttribute("hidden");
            divErrorContato.innerText = "Pelo menos uma forma de contato deve ser inserido.";
            error = true;
        }

        if(!error) el.submit();

    }
}