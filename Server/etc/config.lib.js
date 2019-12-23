// etc/preferences.lib.js
// ======================
const Fs = require("fs");
const Path = require("path");
const Yaml = require("js-yaml");
const isYaml = f=>f.match(/\.yaml$/);
const yamlSuffix = ".yaml";

function loadConf(m) {//{{{

    let Cfg;
    const extraSections = {};
    const mainFile = Path.basename(m.cfgFile);

    function loadFile(fName) {//{{{
        const fPath = Path.join(m.cfgPath, fName);
        const contents = Yaml.safeLoad(Fs.readFileSync(fPath, 'utf8'));
        if (fName == mainFile) return Cfg = contents;
        extraSections[Path.basename(fName, yamlSuffix)] = contents;
    };//}}}

    if (! isYaml(m.cfgFile)) throw new Error("Wrong config file path or file name");
    if (! Fs.existsSync(m.cfgFile)) throw new Error (
        "Configuration file not found: "+m.cfgFile+".\n"
            + "Try 'node "
            + __filename
            + " > " + m.cfgFile
            + "' to generate new one from template."
    );


    // Load all config files
    Fs.readdirSync(m.cfgPath)
        .filter(isYaml)
        .map(loadFile)
    ;

    for (let sectionName in extraSections) {

        if (Cfg[sectionName] !== undefined) throw new Error(
            "Section defined both in " + m.file + " and as separate file: " + sectionName + yamlSuffix
        );
        if (extraSections[sectionName]) {
            Cfg[sectionName] = extraSections[sectionName]; // Load (if not empty)
        };
    };

    return Cfg;

};//}}}

function envApply(cfg, env) {//{{{
    function cfgMerge(target, patch = {}) {//{{{
        const merged = Object.assign({}, target);
        for (let key in patch) {
            let pv = patch[key];
            if (typeof pv == "object") {
                if (pv === null) {
                    delete merged[key];
                } else if (pv instanceof Array) {
                    merged[key] = pv; // Replace whole array.
                } else {
                    merged[key] = cfgMerge(merged[key], pv)
                };
            } else {
                if (pv === undefined) continue; // Use null to reset anything
                merged[key] = pv;
            };
        };
        return merged;
    };//}}}
    return cfgMerge(
        cfg
        , (cfg.env || {})[env] || {}
    );
};//}}}

module.exports = {
    loadConf,
    envApply,
};
