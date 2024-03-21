const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
    res.render("contato", {
        contato: {}
    });
};

exports.register = async function(req, res){
    const contato = new Contato(req.body);
    try{
        await contato.register();

        if(contato.errors.length > 0){
            req.flash("errors", contato.errors);
            req.session.save(() => {res.redirect("/contato/index")});
            return;
        }

        req.flash("success", ["Contato registrado com sucesso."]);
        req.session.save(() => {res.redirect(`/contato/index/${contato.contato._id}`)});
        return;

    } catch(e){
        console.log(e);
        res.status(500).send("Erro interno do servidor");
    }
};

exports.editIndex = async function(req, res){
    if(!req.params.id) return res.render("error404");
    try{
        const contato = await Contato.buscaPorId(req.params.id);

        if(!contato) return res.render("error404");
    
        res.render("contato", { contato });
    } catch(e){
        console.log(e);
        res.status(500).send("Erro interno do servidor");
    }
};

exports.edit = async function(req, res){
    if(!req.params.id) return res.render("error404");
    const contato = new Contato(req.body);
    try{
        await contato.edit(req.params.id);

        if(contato.errors.length > 0){
            req.flash("errors", contato.errors);
            req.session.save(() => {res.redirect(`/contato/index/${contato.contato._id}`)});
            return;
        }

        req.flash("success", ["O contato foi editado com sucesso."]);
        req.session.save(() => {res.redirect(`/contato/index/${contato.contato._id}`)});
        return;

    } catch(e){
        console.log(e);
        res.status(500).send("Erro interno do servidor");
    }
};

exports.delete = async(req, res) => {
    if(!req.params.id) return res.render("error404");
    try{
        const contato = await Contato.deletarContatos(req.params.id);

        if(!contato){
            req.flash("errors", ["Nenhum contato foi encontrado com este id."]);
            req.session.save(() => {
                res.redirect("/");
            });
        }

        req.flash("success", ["O contato foi excluído com sucesso."]);
        req.session.save(() => {
            res.redirect("/");
        });
    }catch(e){
        console.log(e);
        res.status(500).send("Erro interno no servidor.");
    }
};

