// Client/menu/menu.js
// ===================

module.exports = Promise.resolve().then(async function(){

    const menuTpl = require("./menu.pug");
    require("./menu.scss");


    function onPageChange(evt, prm) {
        console.log("--- pageChange ---");
        console.log(prm);
        console.log("--- ---------- ---");

    };


    return function (data, container, eventTarget) {
        container.html(
            menuTpl()
        );
        container.addClass("mainMenu");
        container.removeClass("disabled");

        if (eventTarget) eventTarget.on("pageChange", onPageChange);

        return container;
    };

});
