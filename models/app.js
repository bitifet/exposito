// models/app.js
// =============
const Path = require("path");
const Fs = require("fs");

// ---------------------------------------------------
const {name, version} = require("../package.json");
const longName = "EXPress Own Setup I Take Over";
const brand = 'Bitifet';
// ---------------------------------------------------

const environment = process.env.NODE_ENV || "development";
const cfgFile = Path.join(
    '/etc'
    , brand.toLowerCase()
    , name
    , name+'.yaml'
);
const cfgPath = Path.dirname(cfgFile);

const clientPath = Path.join(
    Path.dirname(Path.dirname(process.argv[1]))
    , 'Client'
);

const serviceWorkerPath = ( // FIXME: There should be a better way to get it.
    module.webpackPolyfill ? '/' + Fs.readdirSync(clientPath)
        .find(f=>f.match(/^serviceWorker\.[^.]+\.js$/))
    : null
);

module.exports = {
    name,
    longName,
    version,
    brand,
    environment,
    cfgFile,
    cfgPath,
    serviceWorkerPath,
};
