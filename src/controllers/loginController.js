const Login = require("../models/LoginModel");

exports.index = (req, res) => {
    if(req.session.user) return res.render("login-logado");
    return res.render("login");
};

exports.register = async function(req, res) {
    try{
        const login = new Login(req.body);
        await login.register(); 

        if(login.errors.length > 0){
            req.flash("errors", login.errors);
            req.session.save(() => {
                return res.redirect("/login/index");
            });
            return;
        }

        req.flash("success", ["Sua conta foi criada com sucesso!"]);
        req.session.save(() => {
            return res.redirect("/login/index");
        });
    } catch(e){
        console.log(e);
        return res.render("error404");
    }

};

exports.login = async function(req, res) {
    try{
        const login = new Login(req.body);
        await login.login(); 

        if(login.errors.length > 0){
            req.flash("errors", login.errors);
            req.session.save(() => {
                return res.redirect("/login/index");
            });
            return;
        }

        req.flash("success", ["Você entrou no sistema."]);
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect("/login/index");
        });
    } catch(e){
        console.log(e);
        return res.render("error404");
    }

};

exports.logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
