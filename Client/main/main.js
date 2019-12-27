// Client/main/main.js
// ===================

module.exports = new Promise(async function(resolve, reject) {

    const router = await (
        await require('@client/router')
    );

    router.go(window.location.toString());

    require('@client/pwa');

});

