// client/Views/home/index.view.js
// ===============================

import view_base from '@client/Interfaces/view.interface.js';
import mainTpl from './home.pug';
import {cachedGetJson} from '@lib/net';

export default Promise.resolve().then(async function() {

    const model = (await cachedGetJson('/models.json')).views_home;
    ///console.log(model);

    class homeView extends view_base {
        render(target) {
            target.html(
                mainTpl(model)
            )
        };
        // onEnter(args={}) {
        //     console.log({args});
        //     return super.onEnter(args);
        // };
    };
    return homeView;
});

