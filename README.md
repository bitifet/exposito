ExpressPack
===========

Webpack powered Express project boilerplate


Setup Process
-------------

### Express Setup

    express --pug
    npm install


### Webpack installation

    npm install --save-dev webpack webpack-cli


### Plugins installation

    npm install --save-dev \
        html-webpack-plugin \
        clean-webpack-plugin \
    ;


### Loaders (and dependencies) installation


#### To render (s)css

    npm install --save-dev \
        style-loader \
        css-loader \
        sass-loader \
        node-sass \
    ;


#### To compile PUG templates

    npm install --save-dev pug-loader;


#### To require raw assets

    npm install --save-dev file-loader;


#### To pack server too

    npm install --save-dev webpack-node-externals;

  * This will avoid to pack node_modules.


### Misc libraries

    npm install --save-dev jquery


NOTES
-----

### Server Caveats

#### Shebang not supported

Unix* shebang is not supported so first row in 'bin/www'
(``#!/usr/bin/env node`` must be removed).


#### Path issues

When packing server:

  * Don't trust ``__dirname`` and ``__filename``
    - ``__dirname`` always resolves to "/".
    - ...so ``__filename`` is also relative to "/".

  * Keep in mind that relative paths will be based on the path from which the
    bundle got called.


##### Workarround

You can obtain bundle file path with ``process.argv[1]``.

**Example:**

    const path = require("path");
    const basePath = path.dirname(process.argv[1]));


Bibliograpy
-----------

  * https://medium.com/code-oil/webpack-javascript-bundling-for-both-front-end-and-back-end-b95f1b429810

  * https://dev.to/riversun/how-to-run-webpack-dev-server-on-express-5ei9
