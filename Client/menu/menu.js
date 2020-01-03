// Client/menu/menu.js
// ===================

module.exports = Promise.resolve().then(async function(){

    const $ = require('jquery');
    const menuTpl = require("./menu.pug");
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
        console.log({buttons});

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

        function onPageChange(evt) {//{{{
            const options = $(".menuOption", menuContainer);
                // Not catched in order to allow dynamically adding options.
            options.removeClass("current");

            const selector = `[href="${evt.path}"]`;
            const current = options.filter(selector);

            updateStatus(false);
            current.addClass("current");

            // console.log("--- pageChange ---");
            // console.log(evt.path);
            // console.log({selector, current, options});
            // console.log("--- ---------- ---");

        };//}}}

        updateStatus(false);
        buttons.on("click", updateStatus);

        menuContainer.addClass("mainMenu");
        menuContainer.removeClass("disabled");

        if (options.eventsTarget) options.eventsTarget.on("pageChange", onPageChange);

        return menuContainer;
    };

});
