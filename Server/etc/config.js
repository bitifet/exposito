// etc/preferences.js
// ==================
const model = require("@models/app.js");
const {loadConf, envApply} = require("./config.lib");

// ---------------------------------------------------------------------
if (require.main === module) {
    // Show configuration file template
    console.log(require('./config.sample.js'));
    process.exit();
};
// ---------------------------------------------------------------------


try { // Configuration files loading:
    const configData = envApply(
        loadConf(model)
        , model.environment
    );
    module.exports = configData;
} catch (err)  {
    console.log(err);
    var emsg = "CONFIG ERROR: Unable to read config file: "+model.cfgFile+"."
    if (err.code != 'EACCES') emsg +="\nTry 'node "
        + __filename
        + " | sudo tee " + model.cfgFile
        + "' to generate new one from template."
    ;
    throw emsg;
};

