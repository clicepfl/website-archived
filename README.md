# CLIC website software

Welcome to the repository of the CLIC website software! It contains code for the web server behind [clic.epfl.ch](https://clic.epfl.ch).

All decisions, features, bugs, enhancements and discussions for this repo take place in the [Github issues](https://github.com/clicepfl/clic-website/issues), please have a look and exchange ideas there.

If you're contributing to this repo, you're probably either a:

- Content editor (news, sponsors, committee, ...): refer to the [editor guides section](#editor-guides) to read instructions on how to modify your corresponding component
- IT tasked with deployment: you may want to read the [technology stack](#technology-stack) and [how to build locally](#building-and-testing-locally). However we have an actual deployment repository with scripts to automate installation and updates at [clic-website-production](https://github.com/clicepfl/clic-website-production).
- Web developer: you probably want to get familiar with the complete codebase, so keep reading :stuck_out_tongue: Please make sure that you are at ease with the [workflow](#workflow) before committing new code.

---

## Editor guides

---

## Technology stack

This software stack uses the following technologies:

- [NodejS](https://nodejs.org/), a Javascript runtime environment to execute machine-level, out-of-browser programs
- [Gulp](https://gulpjs.com/), a build system and task runner for JS projects
- [Typescript](https://www.typescriptlang.org/), a typed language that compiles to Javascript
- [ExpressJS](https://expressjs.com/), a web server framework
- [NunjucksJS](https://mozilla.github.io/nunjucks/), a templating engine (see more details about templating [here](src/components/))
- [Showdown](http://showdownjs.com/), a Markdown to HTML converter
- [SASS](https://sass-lang.com/), a CSS preprocessor

---

## Building and testing locally

> **Note:** these instructions are not meant for production deployment. Please refer to the [clic-website-production](https://github.com/clicepfl/clic-website-production) repository for this purpose.

You will need git, [NodeJS](https://nodejs.org/) (>= 12.13.1) installed on your operating system (Windows, Mac or Linux). Make sure that `node` and `npm` are visible on your PATH environment variable, i.e. from your command line:

```
node --version
```

should return something like `v12.13.1`.

Then, assuming you have [setup your SSH keys](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh), you can clone this repository:

```
git clone git@github.com:clicepfl/clic-website.git
```

Enter the newly created directory and run the installation script which will fetch the required dependencies and compile our source files such as Typescript and Sass:

```
cd clic-website
npm install
```

Once this is done, you can run the server locally with:

```
npm start
```

After this command, your terminal should hang with `Web server started on port 8000 in DEBUG mode`. You can then access the local server in your web browser at [http://localhost:8000/](http://localhost:8000/).

You can stop the server by entering `Ctrl+C` in the terminal (this shortcut does not mean `copy`! It sends a `SIGINT` to interrupt the running process).

### Installation troubleshooting

This is a list of issues that you may encounter when installing or starting the server. Feel free to add your own problem and solution, otherwise head over to the [Github issues](https://github.com/clicepfl/clic-website/issues).

- If you have previously installed an older version of Typescript globally, you may encounter an error such as `ts5023: unknown compiler option 'resolveJsonModule'`. Uninstall your global version of Typescript or update it to the latest (`npm remove -g typescript` or `npm install -g typescript@latest`).

- When running `npm start`, the message `Error: listen EADDRINUSE: address already in use :::8000` may appear in a long stacktrace. This means that your local port `8000` is already used by another process, you will need to stop it before trying again.

### Building during development

The `npm install` command is only required once when you first install the repository. If you then make changes to the repository, you can simply run `npx gulp` to compile your sources (it will be faster than `npm install` as it will not fetch dependencies). Then, re-start the server with `npm start`.

---

## Repository hierarchy

- `assets/` : a folder with general static assets, such as global images, downloadable files, front-end configs and search engine keys. It also contains an `untracked/` subfolder for files that are too big for git, they are thus **not tracked or saved** in this repository. Such files can be found in our cloud storage system and **must be manually copied for deployment** (if you have a better idea to expose big assets, please create a Github issue :smiley:).
    - Current list of untracked assets:
        - `rms-conference.webm`

- `dist/` : this folder is only created at build time and contains the compiled code to run the server (compiled Javascript from Typescript sources, CSS output from SASS sources, ...)

- `node_modules/` : this folder is only created once you run `npm install` at least once and contains the required dependencies fetched from the NPM package registry.

- `src/` : this folder contains all the code that we write (Typescript, SASS, templates, ...). See [src/](src/) documentation for internal structure.

- `types/` : this folder contains manually created type definitions for dependencies that are not typed and that do not include a type definition file.

- `vendor/` : this folder contains front-end distributable library sources that are  meant to be statically served for pages (for instance, a bundled jQuery version or icon fonts such as Font-Awesome).

- `.gitignore` : the list of files to ignore in this git repository

- `gulpfile.js` : the build system definition, invoked with `npm install` or `npx gulp`. It contains JS functions of the different build pipeline stages such as cleaning, compiling Typescript and SASS, ...

- `package-lock.json` : the tree of all recursive dependencies of the project. Do not touch this file, NPM does it for you.

- `package.json` : the top-level definition of the project for NodeJS and NPM. It contains metadata, the actions of `npm install`, `npm stop` and `npm test`, and the list of dependencies.

- `README.md` : this file. Recursively see [README.md](README.md).

- `tsconfig.json` : the Typescript compiler configuration. See the [official docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

---

## Workflow

---

## Authors and license

The CLIC website software was originally written by Alexandre CHAU ([dialexo](https://github.com/dialexo)) with the help of Loïc DROZ ([Scrashdown](https://github.com/Scrashdown)). Feel free to add your name below if you are a developer on this repository.

- Original IT manager: Jonathan SCANZI ([jonscanzi](https://github.com/jonscanzi))