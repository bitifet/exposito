const Express = require('express');
const Router = Express.Router();
const Fs = require('fs');
const Path = require('path');
const basePath = Path.dirname(Path.dirname(process.argv[1]))+"/";

const {serialize} = require('@lib/json');
const modelsStr = serialize(require('@server/models'));



require('@client/routes.js').then(function(clientRoutes) {

    allowedPaths = clientRoutes.map(r=>r[0]);

    const match = (txt, p)=>(
        typeof p == "string" ? txt==p
        : txt.match(p)
    )

    Router.use(function(req, res, next) {
        if (allowedPaths.find(
            expr=>match(req.path, expr)
        ) === undefined) return next();
        res.setHeader("content-type", "text/html");
        Fs.createReadStream(basePath+"client/index.html").pipe(res);
    });

});








Router.get('/models.json' // GET models client side.
    , function(req, res, next) {
        res
            .status(200)
            .set('Content-Type', 'application/json')
            .send(modelsStr)
        ;
    }
);


module.exports = Router;
