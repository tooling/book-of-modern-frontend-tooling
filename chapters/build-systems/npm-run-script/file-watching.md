# File Watching

###### With a file watcher, you can trigger an `npm run $SCRIPT_NAME` when source files change.

## Summary

As configured below; when a JavaScript or JSON file changes, `nodemon` will invoke `npm run test`; however, since a `pre` hook is defined for `test` (`pretest`), the `lint` script will be invoked prior to `test`.

**NOTE**: While `nodemon` is the file watcher depicted in the examples below, if you prefer another file watcher, by all means, feel free to replace `nodemon` with your preferred tool.

## installation

> install `nodemon` to your program's `node_modules/.bin` directory.

    % npm install --save-dev nodemon

## configure the scripts in `package.json`

    "scripts": {
        "start:dev": "nodemon --exec 'npm run test' -e 'js json'",
        "lint": "eslint .",
        "pretest": "npm run lint",
        "test": "node test/**/*.js"
    },

## start the development file watcher

    % npm start:dev

