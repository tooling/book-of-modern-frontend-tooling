# Lineman

## What is Lineman?

[Lineman.js](http://linemanjs.com) is a command-line tool that can build a ready-to-deploy modern web application out-of-the-box.

Lineman's ready-to-deploy behavior is accomplished by way of a number of its conventions about how web applications should be structured (e.g. client-side JavaScript should be placed under "app/js", whereas third-party stylesheets should be placed under "vendor/css"). This aspect of Lineman was heavily inspired by [Ruby on Rails](http://rubyonrails.org), aiming to occupy a niche of convention-oriented workflow tools for the Node.js community.

The real value of Lineman is that it can help you get started working on a project very easily, all without enforcing any opinions about the front-end application frameworks you use.

Additionally, Lineman projects tend to be easy-to-upgrade because generated files are kept to a minimum. Literally any configuration property can be overridden dynamically, so each Lineman project only needs to declare how it's different from the norm, without any boilerplate describing how its defaults.

You can grow your project's toolset by installing Lineman plug-ins, which take the form of community-managed Lineman configurations. Like Lineman itself, the tasks and configuration included by plugins are dynamically applied and as such, won't clutter your application's repo. Also like Lineman, anything a plugin can do can be just as easily overridden when your needs differ from the norm.

## How does Lineman work, technically?

Lineman depends on Grunt and, no less importantly, the terrific Grunt community for the implementation of all the individual build tasks a web project might make use of.

You can think of Lineman as a sort of workflow-aware Grunt configuration aggregator. Lineman itself, its plugins, and users' projects each contribute to one entire grunt task configuration.

Managing Grunt's configuration is useful for providing defaults, enabling extensions, and allowing for user overrides. On its own, this has some value, as it prevent the same massive Gruntfile from being copied and pasted from project to project. Where Lineman really shines, however, is by organizing all of a project's grunt tasks into ordered task lists that describe the workflows needed by every application:

* Activities that need to happen regardless of how we build the app
* Tasks that need to run, but only when developing
* Deployment-minded tasks that only need to run when it's time to distribute the app.

From a user's perspective, these tasks are exposed through Lineman's CLI commands (`lineman run`, `lineman build`, `lineman spec`, and so on).
