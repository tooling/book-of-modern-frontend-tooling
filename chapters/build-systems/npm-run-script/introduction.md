# npm run task automation

###### Using `npm run` for task automation is a simple low-overhead compromise between the simplicity of `make` and fancier tools such as `grunt` or `gulp`.  `npm` allows [scripts](https://www.npmjs.org/doc/misc/npm-scripts.html) to be defined which can be invoked via the command `npm run $SCRIPT_NAME` where `$SCRIPT_NAME` is a key within the `scripts` object in the [package.json](https://www.npmjs.org/doc/files/package.json.html) file.

## Benefits

###### simplicity

`npm run` provides a simple way to define commands that are easy to invoke and understand. The benefit over other task automation tools is that there is little to no up-front configuration required. Many of the commands one would want to run already exist and are an `npm install` away.

###### portability

Writing tasks in JavaScript is great for portability since Node.js works across many platforms. The Node.js standard library does not provide high-level task writing utilities; however, most of the utilities you'll need already exist in the npm registry as simple single-purpose modules.

## Example

To add lint checking to a project the following is all that is necessary to get started:

###### install module

    % npm install --save-dev eslint

###### configure the lint script

    {
        "scripts": {
            "lint": "eslint ."
        }
    }

###### run the lint script

    $ npm run lint

