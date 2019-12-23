// models/app.js
// =============
const Path = require("path");

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

module.exports = {
    name,
    longName,
    version,
    brand,
    environment,
    cfgFile,
    cfgPath,
};
