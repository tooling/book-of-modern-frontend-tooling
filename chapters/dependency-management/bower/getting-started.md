# Getting started

Now that you have an idea of what Bower actually is and why you want to use it, we
should start getting our hands dirty and learn how to install it on our local
machine.

Once we have it installed, we can start exploring its commands and features that
make our lifes easier. Searching, installing, updating and deleting packages are 
the most common used tasks, so we will take a look at them first.

Excited to get into the world of milk and honey? Me too! Let's install Bower and
get started.

## Installing Bower

Installing tools like Bower on your local machine is as easy as executing
one command in your command line. Make sure you've installed [Node.js](http://nodejs.org)
and [npm](http://npmjs.org) first. When installing Node.js via the downloadable
binary, npm comes already with it. So you don't have to care about installing it
separately.

Once these are installed, run the following command in your command line to install
the Bower command line tool on your local machine:

```sh
$ npm install -g bower
```

The `-g` option tells npm to install the package globally, which makes it accessible
everywhere. This makes sure you are able to run Bower from wherever you want.

**Great, Bower is now installed on your machine!** Really, try it out yourself by
running the `bower` command like this:

```sh
$ bower
```

You should get an output like this (please not that at the time of writing this
book, we used Bower version 1.3.11; your output might look a bit different):

```sh
Usage:

    bower <command> [<args>] [<options>]
Commands:

    cache                   Manage bower cache
    help                    Display help information about Bower
    home                    Opens a package homepage into your favorite browser
    info                    Info of a particular package
    init                    Interactively create a bower.json file
    install                 Install a package locally
    link                    Symlink a package folder
    list                    List local packages - and possible updates
    lookup                  Look up a package URL by name
    prune                   Removes local extraneous packages
    register                Register a package
    search                  Search for a package by name
    update                  Update a local package
    uninstall               Remove a local package
    version                 Bump a package version
Options:

    -f, --force             Makes various commands more forceful
    -j, --json              Output consumable JSON
    -l, --log-level         What level of logs to report
    -o, --offline           Do not hit the network
    -q, --quiet             Only output important information
    -s, --silent            Do not output anything, besides errors
    -V, --verbose           Makes output more verbose
    --allow-root            Allows running commands as root
    --version               Output Bower version
See 'bower help <command>' for more information on a specific command.
```

As you can see, Bower comes with a lot of useful commands to help you out on your
journey building your next mind-blowing front-end application. It also tells you
that you can always run `bower help <command>` if you need more detailed information
about a specific command.

I don't know how **you** feel, but **I** can't wait to run one of those on my
machine! Let's discover our first packages by using Bower's search utilities.

## Discovering/Searching

Searching is a very common task for developers in general. When using Bower as package manager
for your projects, you also want to search for existing packages that you can reuse. In addition to that,
it might also be **very** useful to find and discover related packages for your use case.

Bower comes with a `search` command that let's you search the entire **registry**
for packages you might be interested in. It uses a web service that also provides a
neat web interface at [http://bower.io/search](http://bower.io/search) that you can use
to browse all registered Bower packages. Although, Bower's search is pretty straight
forward, we first take a look at what Bower's help utilities have to say about it.
Running `bower help search` gives us the following output:

```sh
Usage:

    bower search [<options>]
    bower search <name> [<options>]
Options:

    -h, --help              Show this help message
    Additionally all global options listed in 'bower help' are available

Description:

    Finds all packages or a specific package.
```

As you can see, there are two ways of using the `search` command. The first possible
way of using it, is running `bower search` with any kind of available options. 
When taking a look at the list of options that can be used with this command,
we can see that there's not really much we can chose between. The `--help` option (in 
short `-h`), gives us the same output as the one we get when running the
global help for the `search` command.

The other way of running `bower search` feels more useful. Passing an actual string
as parameter to the command, makes Bower search the entire registry for anything
that has the value of `<name>` in it.

For example running `bower search angular` returns the following result (I cut the
output for readability):

```sh
$ bower search angular
Search results:

    angular git://github.com/angular/bower-angular.git
    angular-mocks git://github.com/angular/bower-angular-mocks.git
    angular-resource git://github.com/angular/bower-angular-resource.git
    angular-sanitize git://github.com/angular/bower-angular-sanitize.git
    angular-route git://github.com/angular/bower-angular-route.git
    angular-cookies git://github.com/angular/bower-angular-cookies.git
    angular-scenario git://github.com/angular/bower-angular-scenario.git
    angular-bootstrap git://github.com/angular-ui/bootstrap-bower.git
    angular-animate git://github.com/angular/bower-angular-animate.git
    angular-ui-router git://github.com/angular-ui/ui-router
    angular-touch git://github.com/angular/bower-angular-touch.git
    angular-ui-utils git://github.com/angular-ui/ui-utils.git
    angular-translate git://github.com/PascalPrecht/bower-angular-translate.git
    angular-ui git://github.com/angular-ui/angular-ui.git
    angular-ui-select2 git://github.com/angular-ui/ui-select2.git
    restangular git://github.com/mgonto/restangular
    angular-i18n git://github.com/angular/bower-angular-i18n.git
    angular-strap git://github.com/mgcrea/angular-strap.git
```

Bower gives us even a remote endpoint where we can find the repository for
each package in the search results.

Now that we know how to search for packages, let's take a look at how we can actually
install these to get them into our projects file structure.
