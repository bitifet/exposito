// Client/router/router.js
// =======================

module.exports = Promise.resolve().then(async function(){

    const Router = require("./router.class");

    return async function routerBuilder(...args) {
        return new Promise(function(resolve, reject) {
            const router = new Router(...args);
            router.on("routerReady", resolve);
        });
    };

});
