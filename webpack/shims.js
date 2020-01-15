// webpack/shims.js
// ================

module.exports = (function(shimPath) {
    try {
        return fs.readdirSync(shimPath)
            .filter(f=>f.match(/\.js$/))
            .map(f=>shimPath+'/'+f)
        ;
    } catch (err) {
        return [];
    };
})('../Shims');
