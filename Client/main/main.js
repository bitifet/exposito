// Client/main/main.js
// ===================

export default new Promise(async function(resolve, reject) {

    const router = await (
        await require('@client/router')
    );

    router.go(window.location.toString());

});

