const Express = require('express');
const Router = Express.Router();
const Fs = require('fs');
const Path = require('path');
const basePath = Path.dirname(Path.dirname(process.argv[1]))+"/";


const allowedPaths = require('@client/routes.js')
    .map(r=>r[0])
;
const match = (txt, p)=>(
    typeof p == "string" ? txt==p
    : txt.match(p)
)

// No longer used:
// #<{(| GET home page. |)}>#
// Router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

Router.use(function(req, res, next) {
    if (allowedPaths.find(
        expr=>match(req.path, expr)
    ) === undefined) return next();
    res.setHeader("content-type", "text/html");
    Fs.createReadStream(basePath+"client/index.html").pipe(res);
});


module.exports = Router;
