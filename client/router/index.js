// client/router/index.js
// ======================
import $ from 'jquery';
import {app} from '@client/main/layout';
import routes from '@client/routes';

const viewClass = "view";

const views = {
    plain: new Map(), // Can ve directly accessed.
    regex: [], // Must be checked one by one.
};
let currentView = null;

function newTarget() {//{{{
    return $("<div></div>")
        .addClass(viewClass)
        .appendTo(app)
    ;
};//}}}
function loadRoute(path, viewController, options = {}) {//{{{
    const view = new viewController(
        newTarget()
        , options
    );
    if (! currentView) currentView = view;
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


routes.forEach(r=>loadRoute(...r));
currentView && currentView.onEnter();


export function go(path, args, hash) {
    console.log({
        path,
        args,
        hash,
        view: getView(path),
    });
    currentView && currentView.onExit();
    currentView = getView(path);
    currentView.onEnter(args, hash);
};

export default null;
