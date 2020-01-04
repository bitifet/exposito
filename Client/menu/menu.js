// Client/menu/menu.js
// ===================

module.exports = Promise.resolve().then(async function(){

    const $ = require('jquery');
    const menuTpl = require("./menu.pug");
    const routerIntegration = require("./routerIntegration");
    require("./menu.scss");
    const fakeButton = ()=>$("<span></span>");


    return function (
        data
        , menuContainer
        , buttons = fakeButton()
        , options = {}
    ) {
        if (buttons instanceof Array) { // Accept an array with multiple buttons.
            buttons = buttons.reduce($.merge)
        };

        menuContainer.html(
            menuTpl()
        );

        let isOpened = false;

        function updateStatus(newStatus) {//{{{
            isOpened = (
                typeof newStatus == "boolean" ? !! newStatus
                : ! isOpened
            );
            if (isOpened) {
                menuContainer.addClass("visible");
                buttons.addClass("set");
            } else {
                menuContainer.removeClass("visible");
                buttons.removeClass("set");
            };
        };//}}}

        updateStatus(false);
        buttons.on("click", updateStatus);

        menuContainer.addClass("mainMenu");
        menuContainer.removeClass("disabled");

        // Router integration:
        if (options.router) routerIntegration(options.router, menuContainer, updateStatus);

        return menuContainer;
    };

});
