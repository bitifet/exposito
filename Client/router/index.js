// Client/router/index.js
// ======================

module.exports = Promise.resolve().then(async function(){

    const router = await require('./router');

    return {
        router,
        // TODO:
        // -----
        // window_fake (TODO) will allow alternative routers detached from real window
    };

});
