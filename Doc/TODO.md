TO-DO list
==========


Index
-----


<!-- vim-markdown-toc GitLab -->

* [General TODO's](#general-todos)
    * [Implement PWA module.](#implement-pwa-module)
    * [Make models dynamic:](#make-models-dynamic)
* [Webpack](#webpack)
    * [Implement dev routes](#implement-dev-routes)
* [Layout and Styles](#layout-and-styles)
    * [Global palette](#global-palette)
* [View Controllers](#view-controllers)
    * [Generic form view](#generic-form-view)
    * [Create Client/Templates directory](#create-clienttemplates-directory)
* [Security considerations](#security-considerations)

<!-- vim-markdown-toc -->


General TODO's
--------------

### Implement PWA module.


### Make models dynamic:

  * Allow to include configuration data (that must be read at execution
    -not building- time).

  * Consider allowing dynamic reload too.
    - For example detecting if a module returns a function and executing
      it each time.

  * Consider making them async in order to allow:
    - Database queries.
    - External APIs request.
    - ...or even configuration file change watching.


Webpack
-------

### Implement dev routes

  * Configure .ifdev.js to be nulled in production builds.

  * Implement dev router (.ifdev.js) conditionally mounted.


Layout and Styles
-----------------

### Global palette

  * Implement global, hsl based CSS palette.
    - Based on a few "root" colors and applying different hues and saturations
      to obtain the others.

  * Implement ``/palette`` ([dev](#implement-dev-routes)) route.
    - Fancy "server side" (not in client router) view previewing all colors
      and, optionally allowing to edit their *roots*.


View Controllers
----------------

### Generic form view

  * Take template from router parameter.

  * Use dynamic layout ([credits](https://twitter.com/argyleink/status/1217213431947747328?s=09)):


    // (css)
    form {
      display: flex;
      flex-wrap: wrap;
      & > input {
        flex: 1 1 10ch;
        margin: .5rem;
        &[type="email"] {
          flex: 3 1 30ch;
        }
      }
    }
     

### Create Client/Templates directory

  * To store *generic templates* that can be shared by several view controllers
    (or instances).
    - For example for a [generic form view](#generic-form-view).

  * Define @templates alias in webpack config.


Security considerations
-----------------------

  * Implement access contrrol boilerplate.
    - Consider special user access levels 'admin' and 'developer'.

  * Block access to .map files in access control middleware to non
    developer-level users.

