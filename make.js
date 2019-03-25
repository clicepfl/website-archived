/**
 * Main build script
 * CLIC website software
 *
 * This script should implement all steps (as promises) required to
 * compile a production version of the software into the {@link dist/}
 * folder. This script should be executed with node (from the root
 * folder of the project) whenever a new version of the software is
 * compiled. It should be called automatically when running
 * `npm install` as it should be registered inside {@link package.json}
 * as a "postinstall" hook.
 *
 * @file    This is the main build script for compiling the server software
 * @author  Alexandre CHAU
 */

// Dependencies
const util = require('util')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)
const sass = require('node-sass')
const del = require('del')
const ncp = require('ncp').ncp
ncp.limit = 16
Promise.sequential = require('promise-sequential')

// Build pipeline definition
clean()
    .then(setup)
    .then(copyPublic)
    .then(copyVendor)
    .then(copyStatic)
    .then(compileSass)
    .then(compileTypescript)
    .then(generateTypedoc)
    .then(done)
    .catch((err) => {
        console.log(err.message ? err.message : err)
    })


// Function definitions of each step
// Each of the functions should return a promise

/**
 * Cleans previous versions
 * @returns promise with the list of deleted paths
 */
function clean() {
    console.log("Deleting dist/ folder...")
    return del("dist/")
}

/**
 * Setup file structure (dist folder)
 * @returns empty promise
 */
function setup() {
    const paths = [
        'dist/',
        'dist/public/'
    ]
    const promises = paths.map(path => {
        // promise-sequential requires function objects returning promises
        return () => new Promise((resolve, reject) => {
            fs.mkdir(path, (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    })
    console.log(`Creating project structure... [${paths}]`)
    return Promise.sequential(promises)
}

/**
 * Helper function to recursively copy a folder
 * @returns empty promise
 */
function copyr(src, dest) {
    console.log(`Copying ${src} directory into ${dest}...`)
    return new Promise((resolve, reject) => {
        ncp(src, dest, (err) => {
            if (err) reject (err)
            else resolve()
        })
    })
}

/**
 * Copy the public assets to dist
 * @returns empty promise
 */
function copyPublic() {
    return copyr('src/public', 'dist/public')
}

/**
 * Copy the vendor folder to dist
 * @returns empty promise
 */
function copyVendor() {
    return copyr('src/vendor', 'dist/public/vendor')
}

/**
 * Copy the static html and files
 * @returns empty promise
 */
function copyStatic() {
    return copyr('src/html', 'dist/static')
}

/**
 * Compiles the main sass style into its css file
 * @returns empty promise
 */
function compileSass() {
    const src = 'src/sass/style.sass'
    const dest = 'dist/public/style.css'
    console.log(`Compiling main style sass... ${src} into ${dest}`)
    return new Promise((resolve, reject) => {
        sass.render({
            file: src,
            outputStyle: 'compressed'
        }, (err, res) => {
            if (err) reject(err)
            else {
                fs.writeFile(dest, res.css, (errw) => {
                    if (errw) reject(errw)
                    else resolve()
                })
            }
        })
    })
}

/**
 * Compiles typescript sources into JS
 * @returns empty promise
 */
function compileTypescript() {
    console.log("Compiling Typescript sources...")
    return exec("npx tsc")
}

/**
 * Generate Typedoc
 * @returns empty promise
 */
function generateTypedoc() {
    console.log("Generating Typedoc documentation...")
    return exec("npx typedoc")
}

/**
 * Done function, should be called at the end
 * @returns empty promise
 */
function done() {
    console.log(`Build finished in dist/ folder!`)
    return Promise.resolve()
}