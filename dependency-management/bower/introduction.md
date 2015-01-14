# Bower

Imagine the situation, you sit at your desk at work and you have to build yet another
super fancy website for a client. You already talked about concept and design and
probably also about interaction on the page. You already know what tools and
libraries will make your life easier, when it comes to implementing the project you
are working on. Let's say you have decided to build the website with the help of
[Bootstrap](http://getbootstrap.com), so you don't have to care about the different
implementations of responsive design. You also want to use [jQuery](http://jquery.com)
for easy DOM manipulation and last but not least, you want to add some fancy special
effects by adding animations using [Effeckt.css](https://github.com/h5bp/Effeckt.css/).

So now you have three libraries you want to use and you have to somehow get the source
code into your project. Now ask yourself: how would you do that? Remember the times
where you visited the corresponding page of a library, you fiddled around a bit to find
the place where the source is linked and once you found it, you did the following:
You hit CTRL+a to mark everything, then you hit CTRL+c to copy everything and then you
open up your favorite text editor or IDE, to finally hit CTRL+v to paste the source right
into it. Then you had to do that two more times.

Think about that for a second. Seriously.

Did you notice something? You had to do several actions to just get some source code.
And not only that you had to do all these actions, you also had to jump between your
browser and your IDE or text editor! You probably had to create a file first to have
a place to paste the stuff into! And now imagine the libraries you use get updated?
**Now really, who has time for that?**

Wouldn't it be better to just have a simple command to search for a package you are
interested in, without browsing the entire web? Wouldn't it be better to just have a
simple command to get the source of that particular package, without copying and pasting
all that stuff from one application to another? Wouldn't it be better, if you don't have
to care about how the source flies from the internet down to your local machine on your 
hard drive?

Oh yes, this would be indeed better. And you know what? **[Bower](http://bower.io/)** got you covered.

## A package manager for the web

Bower is a package manager for the web. It offers a generic solution to make front-end
packages installable from the command line. So searching for a package is just one 
command away. Installing a package? Just one command away. Updating existing packages?
You get it, right?

Bower comes with a solution for a world where are no system wide dependencies, no
dependencies are shared between different apps and the dependency tree is flat.

## Wait, how does that differ to npm?

npm (Node Package Manager) is a great tool to install [Node.js](http://nodejs.org)
modules and packages. Actually, npm has been developed for exactly that. Installing
node packages. The reason for that is, that a node modules can have several dependencies,
and these dependencies can have their own dependencies and so forth. It is not 
uncommon, that some dependencies have the same dependency like other dependencies, but in
a different version. npm is the smart tool to resolve that kind of dependency tree
without getting conflicts.

However, this doesn't work for the web, or especially, front-end development. You don't
want to have different jQuery versions in your app, just because the plugins you use
depend on different versions, right? You actually have to decide which particular
version to use to avoid conflicts. And that is a big difference. The dependency tree
in front-end applications should always be flat, otherwise you would have too much
overhead. Bower takes care of that.

