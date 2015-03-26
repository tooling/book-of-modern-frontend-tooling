# Task Automation

###### With `npm run $SCRIPT_NAME` you can reference programs installed into the `node_modules/.bin` directory without providing the full path since the `node_modules/.bin` path is added to the invoked script's `$PATH` environment variable automatically. Below are a few examples of how you can automate your project with run scripts.

## bundle front-end assets with duo

There are many options for bundling assets; however, `duo` is easy to get started with since it parses CSS and JavaScript dependencies out of your source and automatically downloads those dependencies from github.

###### installation

> install `duo` to your program's `node_modules/.bin` directory.

    % npm install --save-dev duo

###### configure the build script

    {
        "scripts": {
            "bundle": "duo index.{js,css}"
        }
    }

While writing just `duo` is a great convenience as depicted above, there is nothing stopping you from providing a relative path such as `node_module/.bin/duo`.

###### run the bundle script

    % npm run bundle

## lint check with eslint

ESLint is easy to get started with as it has sane default rules; however, it also allows developers to easily create and test their own rules.

###### installation

> install `eslint` to your program's `node_modules/.bin` directory.

    % npm install --save-dev eslint

###### configure the lint script

    {
        "scripts": {
            "lint": "eslint ."
        }
    }

###### run the lint script

    % npm run lint

## automated testing with tape

tape is a simple test library without a superfluous API. It allows you to run test files directly and runs in both the browser and node. It also allows writing asynchronous and synchronous tests with the same syntax. This helps mitigate subtle bugs that go easily unnoticed with other testing tools.

###### installation

> install `tape` to your program's `node_modules/.bin` directory.

    % npm install --save-dev tape

###### configure the test script

    {
        "scripts": {
            "test": "node test/*.js"
        }
    }

###### run the test script

> `test` is a special script so it can be run as `npm test`.

    % npm test

