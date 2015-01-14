# Modules

The biggest attraction of browserify over similar tools would have to be the inclusion of node.js core modules. Modules such as `url`, `path`, `stream`, `events` and `http` have all been ported for use in the browser. We can’t do everything that node can do, but we can do everything a browser can do using node.js style code.

The most immediately obvious core modules that are useful on the client-side are querystring, `url` and `path`. By requiring these core modules, we can easily parse and resolves urls, query strings and paths in a client script. On top of that, the `process`, `Buffer`, `__dirname`, `__filename` and `global` variables are all populated with Browserify. That means we can use process.nextTick to easily invoke a function on the next event loop (with full cross-browser support). A special `process.browser` flag is also set in browserify builds, so we can do a quick check to see if the script is running in a browser environment (as opposed to node.js for all the cross-environment module developers).


## Writting Modules

....
