// Server/models/index.js
// ======================

// -------------------------------------------- //
// Autoload of models:                          //
// https://stackoverflow.com/a/59311353/4243912 //
// -------------------------------------------- //

function jsonSet(target, path, value) {//{{{
    let current = target;
    path = [...path]; // Detach
    const item = path.pop();
    path.forEach(function(key) {
        (current[key] || (current[key] = {}));
        current = current[key];
    });
    current[item] = value;
    return target;
};//}}}
function requireAll(r) {//{{{
    const gather = {};
    r.keys().forEach(function(mpath, ...args) {
        const result =  r(mpath, ...args);
        const path = mpath
            .replace(/(?:^[.\/]*\/|\.[^.]+$)/g, '') // Trim
            .split('/')
        ;
        jsonSet(gather, path, result);
    });
    return gather;
};//}}}

const models = requireAll(require.context(
    // Any kind of variables cannot be used here
    '@models'  // (Webpack based) path
    , true     // Use subdirectories
    , /\.js$/  // File name pattern
));

module.exports = models;
