exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    next();
};



exports.checkCsrfError = (err, req, res, next) => {
    if(err){
        res.render("error404");
    }

    next();
}; 

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); //Cria um token para toda requisição
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.flash("errors", ["Você precisa fazer o login."]);
        req.session.save(() => {res.redirect("/")});
        return;
    }

    next();
};

