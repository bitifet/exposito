
Making Off
==========

Índex
-----

<!-- vim-markdown-toc GitLab -->

* [Express Setup](#express-setup)
* [Webpack installation](#webpack-installation)
* [Plugins installation](#plugins-installation)
* [Loaders (and dependencies) installation](#loaders-and-dependencies-installation)
    * [To render (s)css](#to-render-scss)
    * [To compile PUG templates](#to-compile-pug-templates)
    * [To require raw assets](#to-require-raw-assets)
    * [To pack server too](#to-pack-server-too)
    * [To Babel transpile](#to-babel-transpile)
    * [Other loaders](#other-loaders)
    * [Misc libraries](#misc-libraries)
* [NOTES](#notes)
    * [Server Caveats](#server-caveats)
        * [Shebang not supported](#shebang-not-supported)
        * [Path issues](#path-issues)
            * [Workarround](#workarround)

<!-- vim-markdown-toc -->


Express Setup
-------------

```sh
    express --pug
    npm install
```


Webpack installation
--------------------

```sh
    npm install --save-dev webpack webpack-cli
```


Plugins installation
--------------------

```sh
    npm install --save-dev \
        html-webpack-plugin \
        clean-webpack-plugin \
    ;
```


Loaders (and dependencies) installation
---------------------------------------


### To render (s)css

```sh
    npm install --save-dev \
        style-loader \
        css-loader \
        sass-loader \
        node-sass \
    ;
```


### To compile PUG templates

```sh
    npm install --save-dev pug-loader;
```


### To require raw assets

```sh
    npm install --save-dev file-loader;
```


### To pack server too

```sh
    npm install --save-dev webpack-node-externals;
```

  * This will avoid to pack node_modules.


### To Babel transpile

```sh
npm install --save-dev \
    @babel/core \
    babel-loader \
    @babel/preset-env \
    @babel/polyfill \
;
```

### Other loaders

```sh
    npm install --save-dev null-loader;
```


### Misc libraries

```sh
    npm install --save-dev jquery
```


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

```javascript
    const path = require("path");
    const basePath = path.dirname(process.argv[1]));
```

