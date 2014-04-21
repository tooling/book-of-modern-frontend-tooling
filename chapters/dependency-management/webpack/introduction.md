# webpack

webpack is a module bundler that constructs a web application from given assets.

Web applications are made from combining many types of native assets (JavaScript, CSS, images), transposed assets (coffeescript, templates, sass) and third party assets (npm, bower, downloaded). Each of these assets are also commonly split into smaller and more manageable chunks. webpack treats all of these assets as modules and intelligently constructs those modules into a web application.

In a raw web application, a user creates HTML, JavaScript, CSS files and then includes them in their HTML via `script`, `link` and `style` tags. As the amount of files required to piece the application together increases, this practice can become quickly unwieldy. Especially as order is important when loading web assets. webpack solves this by bundling all those files into one or sometimes many files and loads them in the correct order as needed.

There is a staggering amount of open source code available but unfortunately there isn't a clear, single place to download and use third party code. Whether you're installing modules using `npm`, `bower`, `jamjs`, `component` or manually downloading and extracting files; webpack can be configured to load modules seamlessly from those sources.
