// client/router/router.js
// =======================

module.exports = Promise.resolve().then(async function(){

    const $ = require('jquery');

    const viewClass = "view";

    return async function routerBuilder(container, routes) {

        const views = {
            plain: new Map(), // Can ve directly accessed.
            regex: [], // Must be checked one by one.
        };
        let currentView = null;

        function newTarget() {//{{{
            return $("<div></div>")
                .addClass(viewClass)
                .appendTo(container)
            ;
        };//}}}
        async function loadRoute(path, viewController, options = {}) {//{{{
            const view = new viewController(
                newTarget()
                , options
            );
            if (typeof path == "string") {
                views.plain.set(path, view);
            } else {
                views.regex.push({path, view});
            };
        };//}}}
        function getView(path) {//{{{
            return (
                views.plain.get(path)
                || (views.regex.find(v=>path.match(v.path)) || {}).view
            );
        };//}}}


        await Promise.all(
            routes.map(r=>loadRoute(...r))
        );


        currentView && currentView.onEnter();

        function go(path, args, hash) {
            // console.log("Going to", {
            //     path,
            //     args,
            //     hash,
            //     view: getView(path),
            // });
            currentView && currentView.onExit();
            currentView = getView(path);
            currentView.onEnter(args, hash);
        };

        return {
            go,
        };

    };

});
