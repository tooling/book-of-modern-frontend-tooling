# The Little Book Of Modern Front-end Tooling

A free open-source book introducing you to the world of tooling for modern web applications. Currently a WIP.

## Chapters

* Introduction
  * Why automate?
  * Command-line
  * Node and npm
* Build systems
  * [Introduction](https://github.com/tooling/book-of-modern-frontend-tooling/issues/19)
  * [Grunt](https://github.com/tooling/book-of-modern-frontend-tooling/issues/2)
  * [Brunch](https://github.com/tooling/book-of-modern-frontend-tooling/issues/5)
  * [Gulp](https://github.com/tooling/book-of-modern-frontend-tooling/issues/3)
  * Automation with [npm run](https://github.com/tooling/book-of-modern-frontend-tooling/issues/22)
* Scaffolding
  * [Yeoman](https://github.com/tooling/book-of-modern-frontend-tooling/issues/4)
  * [Lineman](https://github.com/tooling/book-of-modern-frontend-tooling/issues/27)
  * Loom
* Dependency Management
  * [Bower](https://github.com/tooling/book-of-modern-frontend-tooling/issues/6)
  * [npm + Browserify](https://github.com/tooling/book-of-modern-frontend-tooling/issues/7)
  * [ComponentJS](https://github.com/tooling/book-of-modern-frontend-tooling/issues/11)
  * [webpack](https://github.com/tooling/book-of-modern-frontend-tooling/issues/20)

## Status

This book is currently in progress. The idea is to capture enough useful content on each topic that a beginner could get started with a specific tool in a short space of time.

We will aim to present all tools in a balanced light, providing the user with enough information to make up their minds on what makes sense for them to use.

The book will be kept up to date by the authors and pull requests from the community will be happily accepted as with any OSS project.

## Getting involved

We are currently looking for:

* Authors interested in contributing new content on one of the topics above
* Authors who have previously written detailed posts about one of the suggested topics that could be refreshed and integrated
* Devs interested in helping us improve the current build setup

New issues will be created for each corresponding section so commenting on the appropriate thread would be the best way to let us know you're interested.

## Why a book vs. blog posts?

Blog posts are an excellent way to spread knowledge, but they are typically ephemeral. This is particularly challenging in the fast-paced world of tooling. By harnessing the collaborative power of the front-end community, we feel we can create a reliable, succinct resource that is kept up to date in the open. Anyone can get access to it. Anyone can improve it.

## Generating the book

### Dependencies

At the moment, the following dependencies are required to export the book to EPUB file format.

* [TeX Live](http://www.tug.org/texlive/acquire-netinstall.html). If you are using OSX, use [MacTex](http://tug.org/mactex/downloading.html).
* [Pandoc](http://johnmacfarlane.net/pandoc/)

## Developing the site template

The HTML site design exists in the `template` folder. We use `jade` for HTML and `SCSS` for CSS.

### Building

Make sure you are running Node > 0.10.0 and run `npm install` to install the development dependencies. This project uses GulpJS tasks to build the book from markdown files (as listed on the table of contents - `chapters/toc.md`) to various file formats.

* `gulp generate:pdf`: Generate a PDF version of the book.
* `gulp generate:site`: Generate a HTML version of the book.
* `gulp generate:epub`: Generate a EPUB version of the book.


### Output

The output from the build phase will be available in the `dist` folder.

## Licensing

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
