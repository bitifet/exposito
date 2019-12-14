// client/Interfaces/view.interface.js
// ===================================

const requiredMethods = [
    'render',    // render(target)          - Initial rendering process
    //'onEnter', // onEnter(args, {hash})   -
    //'onExit',  // onExit()                -
];

/*abstract*/ class view_interface {
    constructor(target, options = {}) {//{{{
        const me = this;
        me.name = me.constructor.name.toUpperCase();
        me.target = target;
        me.options = options;
        if (me.constructor === view_interface) {//{{{
            throw new TypeError(
                'Abstract class "view_interface" cannot be instantiated directly.'
            );
        };//}}}
        requiredMethods.map(m=>{//{{{
            if(typeof me[m] != "function") throw new TypeError(
                `Engine ${me.name} does not implement ${m}() method.`
            );
        });//}}}
        me.render(me.target, me.options);
        me.onExit();
    };//}}}
    onEnter(args, {hash} = {}) {this.target.show()};
    onExit() {this.target.hide()};
};


module.exports = view_interface;
