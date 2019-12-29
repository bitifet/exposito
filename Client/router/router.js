// client/router/router.js
// =======================

module.exports = Promise.resolve().then(async function(){

    const Url = require('@lib/url.js');
    const $ = require('jquery');

    const viewClass = "view";

    return async function routerBuilder(
        routes
        , w = window
        , container = $(w.document.body)
    ) {

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
        async function updateView(args) {//{{{
            if (typeof args == "string") { // Url
                args = Url.parse(args);
                args.search = Url.parseSearchStr(search);
            };
            const {path, search, hash} = args;
            const {view, params} = resolvePath(path);
            const prm = {
                path,
                view,
                params,
                search,
                hash,
            }
            currentView && await currentView.onExit();
            currentView = view;
            await currentView.onEnter(prm);
            return prm;
        };//}}}
        async function go(url) {//{{{
            switch (typeof url) {
                case "undefined":
                case "number":
                    return w.history.go(url);
                default:
                    const prm = await updateView(url);
                    w.history.pushState(
                        null,
                        "",
                        Url.format(
                            prm.path
                            , prm.search
                            , prm.hash
                        )
                    );
                    return prm;
            };
        };//}}}
        function attach(target) {//{{{
            target.on("click", "a[href]", function(ev) {
                const url = $(this).attr("href");
                if (Url.parse(url).host) return; // Respect external links
                ev.preventDefault();
                go(url);
            });
        };//}}}

        // Load all routes:
        await Promise.all(
            routes.map(r=>loadRoute(...r))
        );

        // Handle browser's back and forward buttons
        w.onpopstate = function(...args) {
            updateView(w.location.href);
        };

        // Navigate to initial url location:
        go(w.location.toString());

        // Attach internal links to this router.
        attach(container);

        return {
            go,
            back: w.history.back.bind(w.history),
            forward: w.history.back.bind(w.history),
            length: ()=>history.length,
            attach,
        };

    };

});
