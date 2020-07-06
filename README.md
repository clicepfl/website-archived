# CLIC website software

Welcome to the repository of the CLIC website software! It contains code for the web server behind [clic.epfl.ch](https://clic.epfl.ch).

All decisions, features, bugs, enhancements and discussions for this repo take place in the [Github issues](https://github.com/clicepfl/clic-website/issues), please have a look and exchange ideas there.

If you're contributing to this repo, you're probably either a:

- Content editor (news, sponsors, committee, ...): refer to the [editor guides section](#editor-guides) to read instructions on how to modify your corresponding component
- IT tasked with deployment: you may want to read the [technology stack](#technology-stack) and [how to build locally](#building-and-testing-locally). However we have an actual deployment repository with scripts to automate installation and updates at [clic-website-production](https://github.com/clicepfl/clic-website-production).
- Web developer: you probably want to get familiar with the complete codebase, so keep reading :stuck_out_tongue: Please make sure that you are at ease with the [workflow](#workflow) before committing new code.

---

## Editor guides

Step-by-step instructions on how to modify the content of the website for non-developer content editors:

- [Modifying the news](src/components/news/)
- [Modifying the committee list](src/components/committee)
- [Modifying the sponsors list](src/components/sponsors)
- [Modifying the gallery](src/components/gallery)

---

## Technology stack

This software stack uses the following technologies:

- [NodeJS](https://nodejs.org/), a Javascript runtime environment to execute machine-level, out-of-browser programs
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

This is a list of issues that you may encounter when installing or starting the server. Feel free to add your own problems and solutions, otherwise head over to the [Github issues](https://github.com/clicepfl/clic-website/issues).

- If you have previously installed an older version of Typescript globally, you may encounter an error such as `ts5023: unknown compiler option 'resolveJsonModule'`. Uninstall your global version of Typescript or update it to the latest (`npm remove -g typescript` or `npm install -g typescript@latest`).

- When running `npm start`, the message `Error: listen EADDRINUSE: address already in use :::8000` may appear in a long stacktrace. This means that your local port `8000` is already used by another process, you will need to stop it before trying again. You may want to search how to list all programs that are using ports for your operating system, such as `netstat -plnt` on Linux.

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

- `README.md` : this file

- `tsconfig.json` : the Typescript compiler configuration. See the [official docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

---

## Workflow

Features and modifications, including bug fixes, are proposed using branches and forks. **The master branch of this repository is locked**, meaning that each feature must be merged through a Pull Request reviewed by at least one member of the developement team. The workflow to add, modify or remove features is as follows:

1. Announce the modification by filing a new issue in the [Github issues](https://github.com/clicepfl/clic-website/issues). Describe the modification as precisely as possible. The language used in all repositories is English.

2. Developers create a new branch for the described modification. The branch must be named `{N}-hyphenized-title` where `{N}` is the issue number attributed by Github. For instance, the issue [#52 Create events page](https://github.com/clicepfl/clic-website/issues/52) should have a branch named `52-events-page`. Content editors do not need to create a new branch, they fork the repository and proceed with the instructions.

3. Modifications are written to the new branch (resp. fork), tested and reviewed by its author. Also, do not forget to modify the corresponding documentation according to your changes, if applicable.

4. Once all changes for this feature are finished, make sure that your branch (resp. fork) is up-to-date with the current version on master (`git merge origin/master your-branch` on your branch). Then, create a new [pull request](https://github.com/clicepfl/clic-website/pulls) that compares your branch (resp. fork) against the master. Mention in the body of the pull request the associated issue number (you can type `#` and auto-complete). Assign another developer from the team to review your changes.

5. The reviewer(s) carefully read the proposed modifications, test them locally and verify that they are sane. They can either accept the pull request or reject it with detailed comments by citing code and explain why the pull request is rejected. **Branches cannot be merged back to master without reviews, as specified in the repository settings**. This code review ensures that at least two people must read the code before deploying.

6. Once the pull request is accepted, the original author merges the branch back to master (it may be useful to squash the commits of the branch when using the additional features of the pull request merge button). Then the author also **deletes the merged branch from the [branches on Github](https://github.com/clicepfl/clic-website/branches)** (or respectively deletes its copy of its fork). Finally, the author also closes the corresponding issue if no more work needs to be done for it.

7. The live version must be updated by deploying after every merge on master by a developer. See the [clic-website-production](https://github.com/clicepfl/clic-website-production) for instructions on how to deploy an update.

---

## Authors and license

- Author: Alexandre CHAU ([dialexo](https://github.com/dialexo))
- Co-author: Loïc DROZ ([Scrashdown](https://github.com/Scrashdown))
- IT manager: Jonathan SCANZI ([jonscanzi](https://github.com/jonscanzi))

```
CLIC website software - web server of clic.epfl.ch
Copyright (C) 2020 Alexandre CHAU, Loïc DROZ, Jonathan SCANZI

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
