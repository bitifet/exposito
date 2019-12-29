// Client/menu/index.js
// ====================

module.exports = Promise.resolve().then(async function(){

    const menu = await require('./menu');

    return {
        menu,
    };

});
