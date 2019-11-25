// client/main/clientRouter.js
// ===========================
"use strict";
import $ from 'jquery';


function router(target, main) {

    const routes = [];


    function goTo() {

    };

    function load(name, html) {
        const container = $("<div></div>")
            .addClass("route")
            .addClass("route_"+name)
            .appendTo(target)
            .html(html)
        ;
        return container;
    };

    return {
        load,
    };

};


export default router;

