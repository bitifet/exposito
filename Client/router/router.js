// client/router/router.js
// =======================

module.exports = Promise.resolve().then(async function(){

    const EventEmitter = require('events').EventEmitter;
    const Url = require('@lib/url.js');
    const $ = require('jquery');

    const viewClass = "view";

    // Validation tables;
    const EVENTS = {
        routerReady: "routerReady",
    };

    class Router extends EventEmitter {
        constructor(
            routes
            , w = window
            , container = $(w.document.body)
        ) { // Main constructor impmlementation{{{
            super();
            const me = this;
            me.w = w;
            me.container = container;

            me.views = {
                plain: new Map(), // Can ve directly accessed.
                regex: [], // Must be checked one by one.
            };
            me.currentView = null;

            async function onRoutesLoaded() {

                // Handle browser's back and forward buttons
                me.w.onpopstate = function(...args) {
                    me.updateView(w.location.href);
                };

                // Navigate to initial url location:
                await me.go(me.w.location.toString());

                // Attach internal links to this router.
                me.attach(container);

                me.emit(EVENTS.routerReady, me);

            };

            // Load all routes:
            Promise.all(
                routes.map(r=>me.loadRoute(...r))
            ).then(
                onRoutesLoaded
            );

        };//}}}

        newTarget() {//{{{
            const me = this;
            return $("<div></div>")
                .addClass(viewClass)
                .appendTo(me.container)
            ;
        };//}}}
        async loadRoute(path, viewController, options = {}) {//{{{
            const me = this;
            const view = new viewController(
                me.newTarget()
                , options
            );
            if (typeof path == "string") {
                me.views.plain.set(path, view);
            } else {
                me.views.regex.push({path, view});
            };
        };//}}}
        resolvePath(path) {//{{{
            const me = this;
            let view = me.views.plain.get(path)
                , params = []
            ;
            if (! view) view = me.views.regex.find(function(v) {
                const m = path.match(v.path);
                if (! m) return false;
                params = m.slice(1);
                return true;
            }).view;
            return {view, params};
        };//}}}
        async updateView(args) {//{{{
            const me = this;
            if (typeof args == "string") { // Url
                args = Url.parse(args);
                args.search = Url.parseSearchStr(search);
            };
            const {path, search, hash} = args;
            const {view, params} = me.resolvePath(path);
            const prm = {
                path,
                view,
                params,
                search,
                hash,
            }
            me.currentView && await me.currentView.onExit();
            me.currentView = view;
            await me.currentView.onEnter(prm);
            me.container.trigger("pageChange", prm);
            return prm;
        };//}}}
        async go(url) {//{{{
            const me = this;
            switch (typeof url) {
                case "undefined":
                case "number":
                    return me.w.history.go(url);
                default:
                    const prm = await me.updateView(url);
                    me.w.history.pushState(
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
        attach(target) {//{{{
            const me = this;
            target.on("click", "a[href]", function(ev) {
                const url = $(this).attr("href");
                if (Url.parse(url).host) return; // Respect external links
                ev.preventDefault();
                me.go(url);
            });
        };//}}}

    };

    return async function routerBuilder(...args) {
        return new Promise(function(resolve, reject) {
            const router = new Router(...args);
            router.on(EVENTS.routerReady, resolve);
        });
    };

    /*
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
            container.trigger("pageChange", prm);
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
    //*/

});
