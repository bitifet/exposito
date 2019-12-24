// client/Views/home/index.view.js
// ===============================

module.exports = Promise.resolve().then(async function() {

    const view_base = require('@client/Interfaces/view.interface.js');
    const mainTpl = require('./home.pug');
    const {cachedGetJson} = require('@lib/net');

    const model = (await cachedGetJson('/models.json')).views_home;
    ///console.log({model});

    class homeView extends view_base {
        render(target) {
            target.html(
                mainTpl(model)
            )
        };
        // onEnter(prm={}) {
        //     console.log({prm});
        //     return super.onEnter(prm);
        // };
    };
    return homeView;
});

