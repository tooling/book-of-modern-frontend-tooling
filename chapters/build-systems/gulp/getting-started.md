# Getting Started

## Installing gulp

First, we must install gulp globally so that any project can reference it.

```
npm install -g gulp
```

Then, let's navigate to our project directory and we will install gulp locally and add it to our list of devDependencies.

```
npm install --save-dev gulp
```

## Creating Your Gulpfile
Once gulp is installed, we need to create a file in your projects root directory and name it gulpfile.js. The gulpfile is the set of instructions that gulp will use to automate the tasks that you have set for your project. This file will contain all of the task code for your project.

## Running Gulp
Now that you have gulp installed and your gulpfile.js has been created. All that is left to do is simply run the gulp command in your command-line application. Type in the following line, and press enter.

```
gulp
```

Now, you should see a few lines of feedback from gulp notifying you of what is happening. This could be the tasks you're running or it could be an error. If you have recieved an error, just jump back into your gulpfile and make sure that you didn't make a typo somewhere.

If you are using the .watch() method in your gulpfile, then gulp will continue to run until you explicitly tell it to stop. This may be confusing to beginners, especially if you are expecting to go back to your command-line and start firing off new commands. To stop gulp at any time, simply press `CTRL+C` and it will stop the execution and your input cursor will return allowing you to begin writing new commands.

That's it! Let's start writing tasks.

