// client/router/router.js
// =======================

module.exports = Promise.resolve().then(async function(){


    const Url = require('@lib/url.js');
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
        function resolvePath(path) {//{{{
            let view = views.plain.get(path)
                , params = []
            ;
            if (! view) view = views.regex.find(function(v) {
                const m = path.match(v.path);
                if (! m) return false;
                params = m.slice(1);
                return true;
            }).view;
            return {view, params};
        };//}}}
        function updateView(path, search, hash) {//{{{
            const {view, params} = resolvePath(path);
            const prm = {
                path,
                view,
                params,
                search,
                hash,
            }
            currentView && currentView.onExit();
            currentView = view;
            currentView.onEnter(prm);
        };//}}}

        await Promise.all(
            routes.map(r=>loadRoute(...r))
        );

        function go(url) {
            const {pathname, search, hash} = Url.parse(url);
            updateView(
                pathname
                , Url.parseSearchStr(search)
                , hash
            );
        };

        return {
            go,
        };

    };

});
