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

