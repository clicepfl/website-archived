# `src` folder documentation

You are in folder `src/` from the root of the project. This folder contains contains all the code that we write (Typescript, SASS, templates, ...). It is structured as follows:

- `components/` folder: contains reusable components such as templates and content-editor friendly implementations. There is specific documentation for each component, see the documentation in [components/](components/) and its subfolders.

- `pages/` folder: contains implementation of page instances, which implements the concrete display template of each page and links it against its viewmodel. See the documentation in [pages/](pages/).

- `sass/` folder: SASS styling sources that are compiled to CSS. They contain style definitions applied on the whole website. The compilation task is defined in the top-level [`gulpfile.js`](../gulpfile.js).

- [`config.ts`](config.ts): global server configuration settings used in the whole codebase (such as port number, production flag, ...).

- [`logger.ts`](logger.ts): logging module to be used everywhere in the codebase to log, monitor, and print to the console. This file should implement a wrapper around a mature logging library such that all logging operations in the codebase are centralized, monitored and stored (no more `console.log`s !).

- [`router.ts`](router.ts): the top-level router of the server. It defines all URL endpoints and dispatches them to the resources of the server, such as rendering pages, serving static content, exposing APIs and route aliases.

- [`server.ts`](server.ts): the app entry point, initializes all the services.

- [`web.ts`](web.ts): the web service definition, which implements the web framework.