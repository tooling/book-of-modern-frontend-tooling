# Special Scripts

###### There are a few script names that are considered special. You can run these scripts by typing `npm $SCRIPT_NAME` or `npm run $SCRIPT_NAME` where `$SCRIPT_NAME` is one of:

- [test](https://www.npmjs.org/doc/cli/npm-test.html)
- [start](https://www.npmjs.org/doc/cli/npm-start.html)
- [stop](https://www.npmjs.org/doc/cli/npm-stop.html)
- [restart](https://www.npmjs.org/doc/cli/npm-restart.html)

For example, typing `npm test` would run the defined `test` script.

    {
      "scripts": {
        "test": "node test/*.js"
      }
    }

## Automated testing with Travis CI

Automated testing service [Travis CI](http://docs.travis-ci.com/user/languages/javascript-with-nodejs) is automatically configured to invoke your `npm test` script. To get started, activate your project in Travis and add a [`.travis.yml`](http://docs.travis-ci.com/user/languages/javascript-with-nodejs/#Default-Test-Script) to your repository with the following contents:

    language: node_js
    node_js:
      - '0.10'

## npm start

Many cloud platform as a service providers support Node.js (i.e. Heroku, AWS Elastic Beanstalk) containers. These containers typically invoke `npm start` as a convention.

The `start` script, if not defined in the `package.json`, when invoked, will execute `node server.js` which is equivalent to:

    {
      "scripts": {
        "start": "node server.js"
      }
    }

The above definition is redundant as this this is the default; however, if you need something other than `node server.js`, you'll have to define the `scripts.start` property explicitly:

    {
      "scripts": {
        "start": "node --harmony server"
      }
    }

`node server` is the same as `node server.js`. `node --harmony` is available with Node.js version `0.11.x` and above.

## npm stop

The `stop` script has no default definition. It is up to you to provide a suitable command to stop your server such as:

    {
      "scripts": {
        "start": "pkill $npm_package_name"
      }
    }

You can refer to your server by name as shown above if you set `process.title = api` within your server.

## npm restart

By default, the `restart` script runs the defined `stop` script, if one was provided, and then the `start` script. You can optionally override this behavior by providing your own `scripts.restart` script definition.

## `pre*` scripts

A `pre*` script can be defined so that it is run **before** the script is invoked. For example, you might want to always run a lint checker just before running tests. This would be setup as follows:

    {
      "scripts": {
        "lint": "eslint .",
        "test": "node test/*.js",
        "pretest": "npm run lint"
      }
    }

With the above scripts defined, running `npm test` would invoke `npm run lint` before invoking `npm run test`.

