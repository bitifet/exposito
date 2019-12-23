// etc/config.defaults.js
// ======================
const Yaml = require("js-yaml");
const src = require("./config.sample");
module.exports = Yaml.safeLoad(src);
