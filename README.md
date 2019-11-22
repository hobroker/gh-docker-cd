# Babel Node Boilerplate [![Greenkeeper badge](https://badges.greenkeeper.io/hobroker/babel-node-boilerplate.svg)](https://greenkeeper.io/)

## Installation
```bash
git clone git@github.com:hobroker/babel-node-boilerplate.git
cd babel-node-boilerplate
npm install
```

## NPM Scripts
* `dev` - run the app from `/src/index.js`
* `dev:watch` - uses `nodemon` to  re-run the app every file change (check `/nodemon.json` for config) 
* `build` - compiles everything with `babel` from `/src` into `/build`
* `start` - runs the app from `/build/index.js` (assuming you compiled the app before)
* `lint` - runs lint for `/src/**/*.js`
* `test` - runs tests from `/tests`


### Babel plugins
* [@babel/plugin-proposal-export-default-from](https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from)
* [@babel/plugin-proposal-function-bind](https://babeljs.io/docs/en/babel-plugin-proposal-function-bind)
* [@babel/plugin-proposal-throw-expressions](https://babeljs.io/docs/en/babel-plugin-proposal-throw-expressions)
* [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) ([legacy](https://babeljs.io/docs/en/babel-plugin-proposal-decorators#legacy))
* [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
* [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
* [@babel/plugin-proposal-nullish-coalescing-operator](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)
