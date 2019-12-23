// Server/etc/index.js
// ===================

let cfg = require("./config.js");

// Allow to use config.sample as defaults in development.
// To activate it, just create an empty cofig file with 'useDefaults: true'
// Then override any config parameters you want there. The rest will remain in
// sync with the sample file.
if (cfg.useDefaults) cfg = Object.assign({}
    , require("./config.defaults")
    , cfg
);

module.exports = cfg;
