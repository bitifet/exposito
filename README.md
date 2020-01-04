
    ░█▀▀░█░█░█▀█░█▀█░█▀▀░▀█▀░▀█▀░█▀█
    ░█▀▀░▄▀▄░█▀▀░█░█░▀▀█░░█░░░█░░█░█
    ░▀▀▀░▀░▀░▀░░░▀▀▀░▀▀▀░▀▀▀░░▀░░▀▀▀

EXPress Own Setup I Take Over
=============================

Webpack powered Express project boilerplate.

Índex
-----

<!-- vim-markdown-toc GitLab -->

* [Setup](#setup)
* [Goals](#goals)
    * [History API based routing](#history-api-based-routing)
    * [Clever, plain and manageable project structure](#clever-plain-and-manageable-project-structure)
    * [ES6+ enabled](#es6-enabled)
    * [SPA](#spa)
    * [SRP](#srp)
    * [DRY](#dry)
* [Technology](#technology)
    * [Not yet incorporated](#not-yet-incorporated)
* [TODO](#todo)
* [Bibliograpy](#bibliograpy)
* [Contributing](#contributing)

<!-- vim-markdown-toc -->


**Other documents:**

|                              |                                |
|------------------------------|--------------------------------|
| [Making Of](Doc/MakingOf.md) | [Dev Manual](Doc/DevManual.md) |


Setup
-----

1. Clone and rename the repo:

```sh
    git clone --depth=1 --branch=master https://github.com/bitifet/pasar.git myCoolProject
    rm -rf ./myCoolProject/.git
```

2. Install dependencies

```sh
    cd myCoolProject
    npm install
```

3. Customize your project

Check:

  * `package.json` (update 'name' property)
  * `models/app.js` (update 'longName' and 'brand' properties)


4. create a configuration file

```sh
sudo mkdir -p /etc/<brand>/<name>
npm start config-file-template | sudo tee /etc/<brand>/<name>/<name>.yaml
```

...where ``<brand>`` and ``<name>`` are those you've chosen in previous step.


5. Start playing...

```sh
    npm start
```

And open ``http://localhost:1080`` in your preferred browser.

> **Note:** This is the default port. Check/Modify in www configuration
> section.
>
> You can also modify your project default en `models/www.js`.


Goals
-----

### History API based routing

  * Internal links works without reloading.

  * All routes are server side directly addressable.

  * Non existing routes answer valid 404 http error from server (server knows
    whether a client side route exists or may exists¹).

> ¹) Regular expression based routes allows for things such as ``/user/john``.
> In this case, server will know that the router is valid, but not if that user
> actually exists.


### Clever, plain and manageable project structure


    $ npm run tree

    > exposito@0.0.0 tree /home/joanmi/Nextcloud/prj/ui/exposito
    > tree -d -v -I node_modules

    .
    ├── Client
    │   ├── Assets
    │   ├── Interfaces
    │   ├── Views
    │   │   ├── blank
    │   │   └── home
    │   ├── layout
    │   ├── main
    │   ├── menu
    │   └── router
    ├── Doc
    ├── Server
    │   ├── etc
    │   ├── main
    │   ├── models
    │   └── routes
    ├── Shims
    ├── dist
    │   ├── Client
    │   └── Server
    ├── lib
    └── models
        └── views


  * ``npm start`` runs built project from dist.
  * Dist contents will (but not yet --TODO--) include a production *package.json*
    file allowing to distribute just the dist directory.


### ES6+ enabled

...both client and server side through Babel and polyfills.


### SPA

*SPA* stands for [Single Page
Application](https://en.wikipedia.org/wiki/Single-page_application).


### SRP

*SRP* stands for [Single Responsibility
Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle).


### DRY

*DRY* stands for [Don't Repeat
Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

Thanks to webpack's astonishing code reusability and acording to our [plain
project structure](#clever-plain-and-manageable-project-structure):

  * All client stuff is grouped under ``/Client`` directory.
  * All server stuff is grouped under ``/Server`` directory.
  * All general purpose helpers and functions under ``/lib``.
  * All *data models* (predefined values) under /models
  * All configuration **nowhere**: Configuration intended to be used only to
    shape models.

**BUT:**

When some information or functionality from either side is needed from the
other too, implied files (or whole modules if necessary) can be directly
referenced and Webpack will natrually bundle them.

This is the case of ``Client/routes.js`` which is included from server too in
order to allow Express to propperly route them (even always to the same client
side logic) from any valid entry point.

This is why client's views entry points (in every ``Client/Views/`` subdirectory)
is named ``index.view.js`` instead of simply ``index.js``: Because client-side
webpack configuration allows for both while server-side one redirects any
``*.view.js`` file to null loader so view controllers don't get bundled server
side even required from ``Client/routes.js`` file.


Technology
----------

  * Webpack
  * Express
  * Pug
  * HTML5
    - History API
  * SaSS
  * Babel

### Not yet incorporated

  * GraphQL
  * [SQLTT](https://www.npmjs.com/package/sqltt)
  * PWA



TODO
----

  * Implement PWA module.

  * Implement access contrrol boilerplate.
    - Consider special user access levels 'admin' and 'developer'.

  * Block access to .map files in access control middleware to non
    developer-level users.

  * Make models dynamic:

    - Allow to include configuration data (that must be read at execution
      -not building- time).

    - Consider allowing dynamic reload too.
      + For example detecting if a module returns a function and executing
        it each time.

    - Consider making them async in order to allow:
      + Database queries.
      + External APIs request.
      + ...or even configuration file change watching.


Bibliograpy
-----------

  * Webpack:
    - [Use single configuration file for both client and
      server](https://medium.com/code-oil/webpack-javascript-bundling-for-both-front-end-and-back-end-b95f1b429810).
    - [Build
      automation](https://dev.to/riversun/how-to-run-webpack-dev-server-on-express-5ei9).
    - [PWA
      Integration](https://webpack.js.org/guides/progressive-web-application).


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
gepository](https://github.com/bitifet/exposito)
