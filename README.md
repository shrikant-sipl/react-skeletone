# React start template

## Requirements

For development, you will only need Node.js installed on your environement.


### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
   
## Install

    $ git clone http://10.10.1.3:2010/dayachand.patel/react-start.git
    $ cd react-start
    $ npm install
    For Linux
    $ sudo npm install --unsafe-perm
    
    For Windows 

"build": "./node_modules/webpack/bin/webpack.js -p",
        "start": "./node_modules/webpack-dev-server/bin/webpack-dev-server.js --hot --progress --colors --inline --open"

with 

 "start": "webpack-dev-server --progress --colors --hot --inline",
        "start:dev": "webpack-dev-server --config ./webpack.dev.config.js  --progress --colors",
        "build:dev": "webpack --config ./webpack.dev.config.js --progress --colors",
        "build": "webpack -p --config ./webpack.prod.config.js --progress --colors"


## Start & watch

    $ npm start

## Simple build for production

    $ npm run build
