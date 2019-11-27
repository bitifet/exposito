
░█▀▀░█░█░█▀█░█▀█░█▀▀░▀█▀░▀█▀░█▀█
░█▀▀░▄▀▄░█▀▀░█░█░▀▀█░░█░░░█░░█░█
░▀▀▀░▀░▀░▀░░░▀▀▀░▀▀▀░▀▀▀░░▀░░▀▀▀

EXPress Own Setup I Take Over
-----------------------------

Webpack powered Express project boilerplate.


Technology
----------

  * Webpack
  * Express
  * Pug
  * HTML5
    - History API (TODO)
  * SaSS
  * Babel (TODO)
  * GraphQL (TODO)


Setup
-----

1. Clone and rename the repo:

    git clone --depth=1 --branch=master https://github.com/bitifet/pasar.git myCoolProject
    rm -rf ./myCoolProject/.git

2. Install dependencies

    cd myCoolProject
    npm install

3. Start playing...

    npm start

And open http://localhost:3000 in your preferred browser.


Making Off
----------

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


TODO
----

  * Implement access contrrol boilerplate.
    - Consider special user access levels 'admin' and 'developer'.

  * Block access to .map files in access control middleware to non
    developer-level users.


Bibliograpy
-----------

  * https://medium.com/code-oil/webpack-javascript-bundling-for-both-front-end-and-back-end-b95f1b429810

  * https://dev.to/riversun/how-to-run-webpack-dev-server-on-express-5ei9


Contributing
------------

If you are interested in contributing with this project, you can do it in many
ways:

  * Creating and/or mantainig documentation.

  * Implementing new features or improving code implementation.

  * Reporting bugs and/or fixing it.

  * Sending me any other feedback.

  * Whatever you like...

Please, contact-me, open issues or send pull-requests thought [this project GIT
repository](https://github.com/bitifet/exposito)
