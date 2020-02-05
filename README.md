
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
    * [Enable SSL](#enable-ssl)
* [Goals](#goals)
    * [History API based routing](#history-api-based-routing)
    * [Clever, plain and manageable project structure](#clever-plain-and-manageable-project-structure)
    * [ES6+ enabled](#es6-enabled)
    * [SPA](#spa)
    * [SRP](#srp)
    * [DRY](#dry)
* [Technology](#technology)
    * [Fully or partially integrated](#fully-or-partially-integrated)
    * [Not yet incorporated](#not-yet-incorporated)
* [Bibliograpy](#bibliograpy)
* [Contributing](#contributing)

<!-- vim-markdown-toc -->


**Other documents:**

|                              |                                |                           |
|------------------------------|--------------------------------|---------------------------|
| [Making Of](Doc/MakingOf.md) | [Dev Manual](Doc/DevManual.md) | [TO-DO list](Doc/TODO.md) |


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

This will create a full configuration file with some default values.

Edit it and adjust as you need.

> 📌 **Handling configuration tip**
> 
> At the top of that file you will find the *useDefaults* set to `false`.
> 
> I recommend you to switch it to `true` and comment out all sections that you
> don't need to change.
> 
> Previous `npm start config-file-template` command uses
> *Server/etc/config.sample.js* to generate its output.
> 
> As project grows and you need to add more configuration options/sections, best
> practice is to add its default values to that file so all instances of your
> project having *useDefaults* set to `true`, will automatically load that
> default values unless explicitly overridden.


5. Start playing...

```sh
    npm start
```

And open ``http://localhost:1080`` in your preferred browser.

> **Note:** This is the default port. Check/Modify in www configuration
> section.
>
> You can also modify your project default en `models/www.js`.


### Enable SSL

In order to enable SSL (https protocol) you will need a valid SSL certificate.

Meanwhile you can create a self-signed one with the following command.

    openssl req -nodes -new -x509 -keyout private.key -out public.cert

Next, edit your configuration file and uncomment the `www -> files` section.

> 📌 In case of not having one, run `npm start config-file-template` and copy
> it from its output.

You can change paths if you prefer. Either case you will net to place required
files in order to SSL work.

Finally, in the section `www -> protocols`, uncomment the row corresponding to
'h2' (or 'http2': both are synonyms) protocol to enable it.

> 📌 Only in case you really need it, enable 'https' instead: http2 works
> always over ssl and is supposed to be backward compatible with https for all
> browsers not supporting it.

You will need to restart the server after those changes.


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

### Fully or partially integrated

  * Webpack
  * Express
  * Pug
  * HTML5
  * SPA (Single Page Application)
    - Random entry poing (external links work to everywhere).
    - History API and link enhancement (internal local links doesn't reload the
      pagepage).
  * SaSS
  * Babel
  * HTTP / HTTPS / HTTP2
    - Default HTTP2 (SSL)
    - Recommendation: Use [RedBird inverse
      proxy](https://stackoverflow.com/a/59734623/4243912) to redirect http to
      https (http2) and get free certificates automatically from
      [LetsEncrypt](https://letsencrypt.org/).

### Not yet incorporated

  * WebSocket
  * GraphQL (with subscriptions over WebSocket)
  * [SQLTT](https://www.npmjs.com/package/sqltt)
  * [PWA](https://en.wikipedia.org/wiki/Progressive_web_application)
  * [Bunyan logs](https://github.com/trentm/node-bunyan)

> 📌 See also [TO-DO list](Doc/TODO.md)


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
