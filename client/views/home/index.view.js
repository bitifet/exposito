// client/views/home/index.view.js
// ===============================

import view_base from '@client/interfaces/view.interface.js';
import mainTpl from './home.pug';
import {getJson} from '@lib/net';

export default Promise.resolve().then(async function() {

    const model = (await getJson('/models.json')).views_home;

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

