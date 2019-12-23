// Server/main/index.js
// ====================

const args = process.argv.slice(2);

if (args.find(arg=>arg=='config-file-template')) {
    console.log(require('@server/etc/config.sample'));
} else {
    require ("./www.js");
};

