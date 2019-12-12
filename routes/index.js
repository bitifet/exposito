const Express = require('express');
const Router = Express.Router();
const Fs = require('fs');
const Path = require('path');
const basePath = Path.dirname(Path.dirname(process.argv[1]))+"/";

function simple_serialize(target) {//{{{
    if (typeof target != "object") return target; // Scalars.
    if (target instanceof Array) return target.map(simple_serialize);
    if (target instanceof RegExp) return target.source.replace(
        /\(\?<\w+?>/ig
        , "("
    );
    let obj = {};
    for (let k in target) obj[k] = simple_serialize(target[k]);
    return obj;
};//}}}


const allowedPaths = require('@client/routes.js')
    .map(r=>r[0])
;
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

    // Autoload of models:{{{
    // https://stackoverflow.com/a/59311353/4243912
    function requireAll(r) {
        return Object.fromEntries(
            r.keys().map(function(mpath, ...args) {
                const result =  r(mpath, ...args);
                const name = mpath
                    .replace(/(?:^[.\/]*\/|\.[^.]+$)/g, '') // Trim
                    .replace(/\//g, '_') // Relace '/'s by '_'s
                ;
                return [name, result];
            })
        );
    };
    const models = requireAll(require.context(
        // Any kind of variables cannot be used here
        '@models'  // (Webpack based) path
        , true     // Use subdirectories
        , /\.js$/  // File name pattern
    ));
    //}}}

Router.get('/models.json' // GET models client side.
    , function(req, res, next) {
        res
            .status(200)
            .set('Content-Type', 'application/json')
            .send(simple_serialize(models))
        ;
    }
);


module.exports = Router;
