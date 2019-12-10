// client/views/home/index.view.js
// ===============================

const view_base = require ( '@client/interfaces/view.interface.js');
const mainTpl = require ( './home.pug');
const model = require ( '@models/views/home.js');

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

module.exports = homeView;

