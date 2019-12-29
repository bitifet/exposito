// Client/menu/menu.js
// ===================

module.exports = Promise.resolve().then(async function(){

    const menuTpl = require("./menu.pug");

    return function (data, container) {
        container.html(
            menuTpl()
        );
        return container;
    };

});
