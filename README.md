# Simple JS Setup

This is a very straight-forward setup to transpile and compress javascript files for web use using [Babel](https://babeljs.io) and [Terser](https://terser.org) respectively. There is no bundling or anything of that sort, just ensuring the code runs in the browser and minifying it if needed. It uses a fairly bare bones setup and can be extended if needed.

## Setup

### Node

Make sure you have [node](https://nodejs.org/en/download) installed on your machine. This was put together using node `v20.11.0`.

### Yarn

Ensure [yarn](https://yarnpkg.com/getting-started/install) is running and available.

## Commands

Commands are defined in `package.json` under the `scripts` property and can be run via `yarn SCRIPT_NAME`.

The structure is tightly bound to only taking the `src/js/modular-scripts.js` file. If you need to additional files or a whole directory, please refer the the [Terser CLI docs](https://terser.org/docs/cli-usage/) as well as the [Babel CLI docs](https://babeljs.io/docs/babel-cli).

### Watching

`yarn run watch`
This command will watch for changes and write a transpiled, unminified version of the file to `src/compiled`.


### Building

`yarn run build`
This command will build a transpiled and minified version of the script to `src/compiled` with the file extension `.min.js`.