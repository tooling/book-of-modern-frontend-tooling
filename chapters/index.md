# Book of Modern Front-end Tooling

> This is a free, work-in-progress open-source book introducing you to the world of tooling for modern web applications.

Over the past few years, there has been a new wave of highly compelling and immersive web applications. Some of them replacing native applications as they are on par (if not better) in terms of usability and features. To build and maintain such complex applications in a collaborative environment, it is important to use the right tools. Unfortunately, there is no single place which documents available frontend tooling and provides an opinion for a developer. 

The goal of this book is to walk developers through the application development lifecycle; help discover new concepts and introduce tooling that simplify building modern web applications.

For context, lets look at a modern web application's development lifecycle:

![Image](/book-of-modern-frontend-tooling/assets/imgs/dev-workflow.svg)

**Scaffolding**: This involves creating an application structure and adding boiler-plate code to get started. Often, developers find this step painful as they are not aware of the best practices. Section two of this book introduces scaffolding tools that gives developers a simple way to generate scaffold code as per their application needs.

**Dependency management**: Once the structure is in place, application dependencies (such as 3rd party libraries and frameworks) need to be added. Developers often have to source the dependency, download the right version and add it to the application manually. Sometimes, these libraries/frameworks themselves have other dependencies and the developer has to keep track of this. This process is quite painful if you work collaboratively on a large application that has a lot of dependencies. Section three of this book discusses tools that make it simple for developers to discover packages (from a repository) and manage dependencies.

**Build systems**: Build systems (or task runners) are used to automate pieces of the development workflow (refer red blocks in above figure). Remember, automation is key to developer productivity. Section four discusses various build systems that can be used to simplify your development workflow.